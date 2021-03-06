const userAuth = require('./utils/config-wrapper').userAuth;
const secretKey = require('./utils/config-wrapper').secretKey;
const list_routes = require('./utils/config-wrapper').list_routes;
const normal_routes = require('./utils/config-wrapper').normal_routes;
const app_routes = require('./utils/config-wrapper').app_routes;
const list_methods = require('./utils/config-wrapper').list_methods;
const normal_methods = require('./utils/config-wrapper').normal_methods;
const route_methods = require('./utils/config-wrapper').route_methods;

const objOmit = require('./utils/data-api-functions').objOmit;
const schemaAsync = require('./utils/data-api-functions').schemaAsync;
const updateQuery = require('./utils/data-api-functions').updateQuery;
const responseFormat = require('./utils/data-api-functions').responseFormat;
const incorrectSecretKey = require('./utils/data-api-functions').incorrectSecretKey;
const incorrectUserOrPass = require('./utils/data-api-functions').incorrectUserOrPass;
const userNotFound = require('./utils/data-api-functions').userNotFound;
const noCurrentPass = require('./utils/data-api-functions').noCurrentPass;
const allowedPassword = require('./utils/data-api-functions').allowedPassword;
const signToken = require('./utils/data-api-functions').signToken;
const verifyToken = require('./utils/data-api-functions').verifyToken;


//// ROUTES ////

// ALL ROUTES //

app.all(`/:path(${Object.keys(app_routes).join('|')})/:method(${normal_methods.join('|')})`,
    verifyToken, async(req, res) => {

        var model = app_routes[req.params.path].model;
        var primary_key = app_routes[req.params.path].primary_key;

        // Insert

        if (req.params.method == 'insert') {
            await responseFormat(model.create.bind(model), [req.query], req, res);
        }

        // Update
        else if (req.params.method == 'update') {
            await responseFormat(model.updateOne.bind(model), [{
                    [primary_key]: req.query[primary_key]
                },
                updateQuery(req, primary_key)
            ], req, res);
        }

        // Delete
        else if (req.params.method == 'delete') {
            await responseFormat(model.deleteOne.bind(model), [{
                [primary_key]: req.query[primary_key]
            }], req, res);
        }

        // Delete All
        else if (req.params.method == 'delete_all') {
            await responseFormat(model.deleteMany.bind(model), [{}], req, res);
        }

        // Get
        else if (req.params.method == 'get') {
            await responseFormat(model.find.bind(model), [{
                [primary_key]: req.query[primary_key]
            }], req, res);
        }

        // Get All
        else if (req.params.method == 'get_all') {
            await responseFormat(model.find.bind(model), [{}], req, res);
        }

        // Get Schema Info
        else if (req.params.method == 'schema') {
            await responseFormat(schemaAsync, [model, primary_key], req, res)
        }

        // Sterilize
        else if (req.params.method == 'sterilize') {
            var unset_dict = {}
            var fields = req.query.fields.split(',');
            for (var i = 0; i < fields.length; i++) {
                unset_dict[fields[i]] = 1;
            }
            await responseFormat(model.updateMany.bind(model), [{},
                    { $unset: unset_dict },
                    { multi: true, strict: false }
                ],
                req, res);
        }

    })

// LIST ROUTES //

app.all(`/:path(${Object.keys(list_routes).join('|')})/:method(${list_methods.join('|')})`,
    verifyToken, async(req, res) => {

        var model = app_routes[req.params.path].model;
        var primary_key = app_routes[req.params.path].primary_key;

        // Push

        if (req.params.method == 'push') {
            var push_dict = {};
            for (const key of Object.keys(req.query)) {
                if (![primary_key, 'auth_token', 'refresh_token'].includes(key)) {
                    push_dict[key] = { $each: req.query[key].split(',') };
                }
            }
            await responseFormat(model.updateOne.bind(model), [{
                    [primary_key]: req.query[primary_key]
                },
                { $push: push_dict }
            ], req, res);
        }

        // Push Unique

        if (req.params.method == 'push_unique') {
            var push_dict = {};
            for (const key of Object.keys(req.query)) {
                if (![primary_key, 'auth_token', 'refresh_token'].includes(key)) {
                    push_dict[key] = { $each: req.query[key].split(',') };
                }
            }
            await responseFormat(model.updateOne.bind(model), [{
                    [primary_key]: req.query[primary_key]
                },
                { $addToSet: push_dict }
            ], req, res);
        }

        // Set
        else if (req.params.method == 'set') {
            var set_dict = {};
            for (const key of Object.keys(req.query)) {
                if (![primary_key, 'auth_token', 'refresh_token'].includes(key)) {
                    set_dict[key] = req.query[key].split(',');
                }
            }
            await responseFormat(model.updateOne.bind(model), [{
                    [primary_key]: req.query[primary_key]
                },
                { $set: set_dict }
            ], req, res);
        }

    })

// Login

app.all('/login', async(req, res) => {

    try {

        const user = await userAuth.findOne({ username: req.query.username });

        if (user) {
            const pass_match = await bcrypt.compare(req.query.password, user.password);
            if (!pass_match) {
                return incorrectUserOrPass(res);
            } else {
                const token = signToken(user);
                return res.json({ status: 'ok', response: token });
            }
        } else {
            return userNotFound(res);
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', response: error });
    }
})

// Sign Up

app.all('/:path(signup)', verifyToken, async(req, res) => {

    try {

        if (req.query.secret_key != null) {

            const key = await secretKey.find({});

            if (key.length > 0) {
                const key_match = await bcrypt.compare(req.query.secret_key, key[key.length - 1].key);
                if (!key_match) {
                    return incorrectSecretKey(res);
                }
            }

            allowedPassword(req, res);

            const response = await userAuth.create(req.query);
            if (req.query.username == response.username) {
                const token = signToken(response);
                return res.json({ status: 'ok', response: token });
            } else {
                return res.status(401).json({ status: 'error', response: response });
            }

        } else {
            return res.status(401).json({ status: 'error', response: { message: 'Not Authorized.' } });
        }

    } catch (error) {
        return res.status(500).json({ status: 'error', response: error });
    }

})

// Update Password

app.all('/update_password', async(req, res) => {

    try {

        const user = await userAuth.findOne({ username: req.query.username });

        if (user && req.query.current_password != null) {
            const pass_match = await bcrypt.compare(req.query.current_password, user.password);
            if (!pass_match) {
                return incorrectUserOrPass(res);
            }
        } else if (!user) {
            return userNotFound(res);
        } else if (req.query.current_password == null) {
            return noCurrentPass(res);
        }

        allowedPassword(req, res);

        const pass_update = await userAuth.updateOne({ username: req.query.username },
            objOmit(req.query, ['username']));
        if (pass_update.nModified == 1) {
            return res.json({ status: 'ok', response: { message: 'Password updated.' } });
        } else {
            return res.status(401).json({ status: 'error', response: pass_update });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', response: error });
    }

});

// Verify Token

app.all('/verify_token', verifyToken, async(req, res) => {
    if (res.locals.refresh_token != null) {
        return res.json({
            status: 'ok',
            response: { message: 'Token verified.' },
            refresh_token: res.locals.refresh_token
        });
    } else {
        return res.json({ status: 'ok', response: { message: 'Token verified.' } });
    }
})

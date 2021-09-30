// import package
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import syncEach from "sync-each";
import TronWeb from "tronweb";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// import modal
import Token from "../iswapmodels/token";
import AdminDB from "../iswapmodels/admin-model";
import pairlistDB from "../iswapmodels/pairlist";
import settingsDB from "../iswapmodels/settings";
import comingpairDB from "../iswapmodels/comingpair";

import keys from "../config/config";

var tronWeb = new TronWeb({
    fullHost: keys.fullHost,
});
var ownerAddress = keys.owneraddress;

/**
 * User Login
 * URL : /api/login
 * METHOD: POST
 * BODY : email, phoneNo, phoneCode, loginType (1-mobile, 2-email), password
 */
export const login = async(req, res) => {
    try {
        console.log("eee");

        var email = req.body.email;
        var pwd = req.body.password;
        var check = await AdminDB.findOne({ email: email });

        if (check) {
            bcrypt.compare(pwd, check.password).then((isMatch) => {
                if (isMatch) {
                    const payload = {
                        id: check._id,
                        email: check.email,
                    };
                    jwt.sign(
                        payload,
                        keys.secretOrKey, {
                            expiresIn: 31556926, // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                            });
                        }
                    );
                } else {
                    return res
                        .status(400)
                        .json({ success: false, errors: { password: "Invalid Password" } });
                }
            });
        } else {
            return res
                .status(400)
                .json({ success: false, errors: { email: "Invalid email" } });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getContract = async(req, res) => {
    try {
        let settingsDetails = await settingsDB.findOne({});

        return res.status(200).json({
            success: true,
            message: "Load successfully",
            result: settingsDetails,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const updateSettings = async(req, res) => {
    try {
        var data = {
            router: req.body.router,
            factory: req.body.factory,
            rewardtoken: req.body.rewardtoken,
            wtrx: req.body.wtrx,
        };

        await settingsDB.findOneAndUpdate({}, { $set: data }, { new: true });

        return res
            .status(200)
            .json({ success: true, message: "Updated successfully" });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getStaking = async(req, res) => {
    try {
        await tronWeb.setAddress(ownerAddress);
        var data = await pairlistDB.find({ stakeaddress: { $ne: "" } });
        var stakeDetais = [];
        syncEach(
            data,
            async function(items, next) {
                var contractAddress = await toHex(items.stakeaddress);
                var contract = await tronWeb.contract().at(contractAddress);
                var getList = await contract
                    .depositFee("T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb")
                    .call();
                var amount = (await tronWeb.toDecimal(getList._hex)) / 100000000;
                stakeDetais.push({
                    from: items.from,
                    to: items.to,
                    createdAt: items.createdAt,
                    stakeaddress: items.stakeaddress,
                    amount: amount,
                });
                process.nextTick(next);
            },
            function(err, transformedItems) {
                return res.status(200).json({
                    success: true,
                    message: "Load successfully",
                    result: stakeDetais,
                });
            }
        );
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getSoonvalue = async(req, res) => {
    try {
        console.log("saran");
        var id = new mongoose.Types.ObjectId(req.body.id);
        var result = await comingpairDB.findOne({ _id: id });
        if (!result) {
            return res
                .status(400)
                .json({ success: false, errors: { message: "Reords Not Found" } });
        }

        return res
            .status(200)
            .json({ success: true, message: "Load successfully", result });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getPairlist = async(req, res) => {
    try {
        console.log("saran");
        var result = await pairlistDB.find({
            symbol: { $ne: "IOTU" },
            pairtype: "pair",
        });
        var result1 = await comingpairDB.find({});
        if (!result) {
            return res
                .status(400)
                .json({ success: false, errors: { message: "Reords Not Found" } });
        }

        return res
            .status(200)
            .json({ success: true, message: "Load successfully", result, result1 });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getSololist = async(req, res) => {
    try {
        console.log("saran");
        var result = await pairlistDB.find({
            symbol: { $ne: "IOTU" },
            pairtype: "single",
        });
        var result1 = await comingpairDB.find({});
        if (!result) {
            return res
                .status(400)
                .json({ success: false, errors: { message: "Reords Not Found" } });
        }

        return res
            .status(200)
            .json({ success: true, message: "Load successfully", result, result1 });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getPairvalue = async(req, res) => {
    try {
        console.log("saran");
        var id = new mongoose.Types.ObjectId(req.body.id);
        var result = await pairlistDB.findOne({ _id: id });
        if (!result) {
            return res
                .status(400)
                .json({ success: false, errors: { message: "Reords Not Found" } });
        }

        return res
            .status(200)
            .json({ success: true, message: "Load successfully", result });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const addPairtoken = async(req, res) => {
    try {
        var reqBody = req.body;
        console.log(reqBody, "reqBodyreqBodyreqBodyreqBody@@@@@@");
        let checkUser = await Token.findOne({ from: reqBody.from, to: reqBody.to });

        var settings = await settingsDB.findOne({});
        console.log(reqBody, "reqBody", settings.router);
        await tronWeb.setAddress(keys.owneraddress);
        var contract = await tronWeb.contract().at(settings.router);

        var fromval = reqBody.from;
        var toval = reqBody.to;

        var getPairname = await contract
            .getPair(req.body.address, fromval, toval)
            .call();
        console.log(getPairname, "getPairnamegetPairname");
        var Pairname = await fromHex(getPairname.pair);
        var reserveA = await tronWeb.toDecimal(getPairname.reserveA._hex);
        var reserveB = await tronWeb.toDecimal(getPairname.reserveB._hex);
        var totalSupply = await tronWeb.toDecimal(getPairname.totalSupply._hex);
        console.log(Pairname, "PairnamePairnamePairname");

        if (checkUser) {
            return res.status(200).json({
                success: false,
                errors: { question: "Address already exists" },
            });
        }
        if (!checkUser) {
            let newUserData = new Token({
                symbol: reqBody.fromsymbol,
                decimals: reqBody.decimals,
                address: reqBody.from,
                from: reqBody.from,
                to: reqBody.to,
                fromsymbol: reqBody.fromsymbol,
                tosymbol: reqBody.tosymbol,
                frombalance: reqBody.frombalance,
                tobalance: reqBody.tobalance,
                balance: reqBody.balance,
                symbol: reqBody.symbol,
                fromdecimal: reqBody.fromdecimal,
                todecimal: reqBody.todecimal,
                pairaddress: Pairname,
            });

            let newDoc = await newUserData.save();
        }

        var exits = await pairlistDB.findOne({ address: Pairname });

        if (!exits) {
            var saveData = {
                from: reqBody.fromsymbol,
                to: reqBody.tosymbol,
                fromaddress: reqBody.from,
                toaddress: reqBody.to,
                address: Pairname,
                reserveA: reserveA,
                reserveB: reserveB,
                supply: 0,
                totalsupply: totalSupply,
                price_from: 0.12174936015372763,
                price_to: 8.164387876411901,
                status: "confirmed",
                fromdecimal: reqBody.fromdecimal,
                todecimal: reqBody.todecimal,
            };
            let newData = new pairlistDB(saveData);
            let newDoc = await newData.save();
        }
        return res
            .status(200)
            .json({ success: true, message: "Address Updated Successfully" });
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

var storage_doc = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../public/tokens/");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
});

var uploadLogo1 = multer({ storage: storage_doc }).fields([
    { name: "tokenalogo", maxCount: 2 },
    { name: "tokenblogo", maxCount: 2 },
]);

export const updatePool = async(req, res) => {
    try {
        uploadLogo1(req, res, async function(err) {
            var stakeaddress = req.body.stakingaddress;

            var id = req.body.id;
            var updid = new mongoose.Types.ObjectId(id);

            var data = {};

            if (stakeaddress != "") {
                data.stakeaddress = stakeaddress;
            }

            data.precision = req.body.precision ? req.body.precision : 0;
            data.tokenInfo = req.body.tokenInfo ? req.body.tokenInfo : 0;
            data.projectSite = req.body.projectSite ? req.body.projectSite : 0;
            data.contract = req.body.contract ? req.body.contract : 0;
            data.stakingFees = req.body.stakingFees ? req.body.stakingFees : 0;
            data.ReferalPyments = req.body.ReferalPyments ?
                req.body.ReferalPyments :
                0;

            var logo = "no";
            var update = {};
            if (
                req.files &&
                req.files.tokenalogo &&
                req.files.tokenalogo[0] &&
                req.files.tokenalogo[0].filename
            ) {
                data.fromlogo = req.files.tokenalogo[0].filename;
                logo = "yes";
                update.fromlogo = req.files.tokenalogo[0].filename;
            }
            if (
                req.files &&
                req.files.tokenblogo &&
                req.files.tokenblogo[0] &&
                req.files.tokenblogo[0].filename
            ) {
                data.tologo = req.files.tokenblogo[0].filename;
                update.tologo = req.files.tokenblogo[0].filename;
                logo = "yes";
            }

            if (logo == "yes" || stakeaddress != "") {
                await pairlistDB.findOneAndUpdate({ _id: updid }, { $set: data }, { new: true });
            }

            return res
                .status(200)
                .json({ success: true, message: "Load successfully", result: "" });
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const updatePair = async(req, res) => {
    try {
        uploadLogo1(req, res, async function(err) {
            var stakeaddress = req.body.stakingaddress;

            var id = req.body.id;
            var updid = new mongoose.Types.ObjectId(id);

            await tronWeb.setAddress(ownerAddress);
            var contractAddress = await toHex(stakeaddress);

            var data = {};

            if (stakeaddress != "") {
                var contract = await tronWeb.contract().at(contractAddress);

                var oneday = 86400;
                var Duration = await contract.rewardsDuration().call();
                var val = await tronWeb.toDecimal(Duration._hex);
                var days = val / oneday;

                var period = await contract.periodFinish().call();
                var val1 = await tronWeb.toDecimal(period._hex);
                var secondto = val1 * 1000;
                var endDate = new Date(secondto);
                var startDate = new Date(secondto);
                startDate.setDate(startDate.getDate() - days);
                data.stakeaddress = stakeaddress;
                data.stakestart = startDate;
                data.stakeend = endDate;
            }

            var logo = "no";
            var update = {};
            if (
                req.files &&
                req.files.tokenalogo &&
                req.files.tokenalogo[0] &&
                req.files.tokenalogo[0].filename
            ) {
                data.fromlogo = req.files.tokenalogo[0].filename;
                logo = "yes";
                update.fromlogo = req.files.tokenalogo[0].filename;
            }
            if (
                req.files &&
                req.files.tokenblogo &&
                req.files.tokenblogo[0] &&
                req.files.tokenblogo[0].filename
            ) {
                data.tologo = req.files.tokenblogo[0].filename;
                update.tologo = req.files.tokenblogo[0].filename;
                logo = "yes";
            }
            if (logo == "yes") {
                var result = await pairlistDB.findOne({ _id: updid });
                console.log("result", result);
                await Token.findOneAndUpdate({ pairaddress: result.address }, { $set: update }, { new: true });
            }

            if (logo == "yes" || stakeaddress != "") {
                await pairlistDB.findOneAndUpdate({ _id: updid }, { $set: data }, { new: true });
            }

            return res
                .status(200)
                .json({ success: true, message: "Load successfully", result: "" });
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

var uploadLogo = multer({ storage: storage_doc }).fields([
    { name: "tokenalogo", maxCount: 2 },
    { name: "tokenblogo", maxCount: 2 },
]);

export const CommingPair = async(req, res) => {
    try {
        uploadLogo(req, res, async function(err) {
            var fromlogo;
            var tologo;

            if (
                req.files.tokenalogo &&
                req.files.tokenalogo[0] &&
                req.files.tokenalogo[0].filename
            ) {
                fromlogo = req.files.tokenalogo[0].filename;
            }
            if (
                req.files.tokenblogo &&
                req.files.tokenblogo[0] &&
                req.files.tokenblogo[0].filename
            ) {
                tologo = req.files.tokenblogo[0].filename;
            }

            var data = {
                fromsymbol: req.body.fromsym,
                tosymbol: req.body.tosym,
                fromlogo: fromlogo,
                tologo: tologo,
                startdate: new Date(req.body.start),
                enddate: new Date(req.body.end),
            };
            let newData = new comingpairDB(data);

            let newDoc = await newData.save();

            return res
                .status(200)
                .json({ success: true, message: "Load successfully" });
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const UpdateComming = async(req, res) => {
    try {
        uploadLogo(req, res, async function(err) {
            var data = {
                fromsymbol: req.body.fromsym,
                tosymbol: req.body.tosym,
                status: req.body.status,
                startdate: new Date(req.body.start),
                enddate: new Date(req.body.end),
            };

            if (
                req.files.tokenalogo &&
                req.files.tokenalogo[0] &&
                req.files.tokenalogo[0].filename
            ) {
                data.fromlogo = req.files.tokenalogo[0].filename;
            }
            if (
                req.files.tokenblogo &&
                req.files.tokenblogo[0] &&
                req.files.tokenblogo[0].filename
            ) {
                data.tologo = req.files.tokenblogo[0].filename;
            }
            var id = new mongoose.Types.ObjectId(req.body.id);
            console.log("datadata", data);
            await comingpairDB.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });

            return res
                .status(200)
                .json({ success: true, message: "Load successfully" });
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

async function fromHex(fromaddr) {
    try {
        var fromAddr = await tronWeb.address.fromHex(fromaddr);
        return fromAddr;
    } catch (err) {}
}

async function toHex(fromaddr) {
    try {
        var toAddr = await tronWeb.address.toHex(fromaddr);
        console.log("toAddr", toAddr);
        return toAddr;
    } catch (err) {}
}

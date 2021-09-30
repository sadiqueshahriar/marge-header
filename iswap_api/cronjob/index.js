import cron from 'node-cron';
import syncEach from 'sync-each';
import TronWeb from 'tronweb';
import events from 'events';
import config from '../config/config';
import pairlistDB from '../iswapmodels/pairlist';
import dailypriceDB from '../iswapmodels/dailyprice';
import settingsDB from '../iswapmodels/settings';
import tokenDB from '../iswapmodels/token';

const contractAddress = config.router;
const ownerAddress = config.owneraddress;

const tronWeb = new TronWeb({
    fullHost: config.fullHost
});

const eventEmitter = new events.EventEmitter();

cron.schedule('*/600 * * * * *', async function() {
    console.log('>>>>>>>>>>>>600')
    var getSettings = await settingsDB.findOne({});
    await tronWeb.setAddress(ownerAddress);
    var tohexval = await toHex(getSettings.router)
    var contract = await tronWeb.contract().at(tohexval);

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);


    var getlist = await pairlistDB.aggregate([{
            $match: {
                _id: { $ne: null }
            },
        },
        {
            $project: {
                _id: 1,
                fromaddress: 1,
                toaddress: 1,
                fromdecimal: 1,
                todecimal: 1,
                from: 1,
                to: 1,
                address: 1
            },
        }
    ]);
    syncEach(getlist, async function(items, next) {

        var amount = await tobi(100, items.fromdecimal)

        if (items.address == "TB1kux8YFRkf8W4gp2wvWpfsxh8Ft9C4Za") {
            console.log(items, "saveDatasaveDatasaveData");
        }

        try {
            var getCal = await contract.calcPairLiquidity(amount, items.fromaddress, items.toaddress, false).call();
            var amountb = await tronWeb.toDecimal(getCal.amountB._hex);
            var tovalue = await frombi(amountb, items.todecimal);

            var fromamt = tovalue / 100;
            var toamt = 100 / tovalue;

            var rates = {
                    fromrate: fromamt,
                    torate: toamt
                }
                // console.log('rates',rates)
            await pairlistDB.findOneAndUpdate({ _id: items._id }, { "$set": rates }, { new: true });

            var cond = {
                createdAt: { $gte: start, $lt: end },
                pairaddress: items.address
            }
            let exits = await dailypriceDB.findOne(cond);
            if (exits) {
                await dailypriceDB.findOneAndUpdate({ _id: exits._id }, {
                    "$set": { "fromamount": fromamt, "toamount": toamt }
                }, { new: true });
            } else {
                var saveData = {
                    from: items.fromaddress,
                    to: items.toaddress,
                    fromamount: fromamt,
                    toamount: toamt,
                    fromsymbol: items.from,
                    tosymbol: items.to,
                    pairaddress: items.address
                };

                let newData = new dailypriceDB(saveData);
                let newDoc = await newData.save();
            }

            process.nextTick(next)

        } catch (err) {
            console.log('errerrerrerr', err)
        }

    }, function(err, transformedItems) {

    });


});


cron.schedule('*/600 * * * * *', async function() {
    console.log('*******>>>>>>>')
    await tronWeb.setAddress(ownerAddress);
    // return false;

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);


    var getlist = await pairlistDB.aggregate([{
            $match: {
                _id: { $ne: null }
            },
        },
        {
            $project: {
                _id: 1,
                fromaddress: 1,
                toaddress: 1,
                fromdecimal: 1,
                todecimal: 1,
                from: 1,
                to: 1,
                address: 1
            },
        }
    ]);
    syncEach(getlist, async function(items, next) {

        try {
            console.log('*******>>>>>>>', items.address)
            var fromcontract = await tronWeb.contract().at(items.fromaddress);
            var balanceOf = await fromcontract.balanceOf(items.address).call();
            var fromdecimal = await fromcontract.decimals().call();
            var fromBalance = await tronWeb.toDecimal(balanceOf._hex);
            //var fromDecimal = await tronWeb.toDecimal(decimals._hex);

            var tocontract = await tronWeb.contract().at(items.toaddress);
            var tobalanceOf = await tocontract.balanceOf(items.address).call();
            var todecimals = await tocontract.decimals().call();
            var toBalance = await tronWeb.toDecimal(tobalanceOf._hex);
            var toDecimal = await tronWeb.toDecimal(todecimals._hex);

            var fromPool = 0;
            var toPool = 0;
            if (fromBalance > 0) {

                fromPool = fromBalance / (10 ** fromdecimal);
            }
            if (toBalance > 0) {
                toPool = toBalance / (10 ** todecimals);
            }

            await pairlistDB.findOneAndUpdate({ address: items.address }, {
                "$set": { "frompool": fromPool, "topool": toPool }
            }, { new: true });

            await tokenDB.findOneAndUpdate({ pairaddress: items.address }, {
                "$set": { "frompool": fromPool, "topool": toPool }
            }, { new: true });
            process.nextTick(next)

        } catch (err) {
            console.log('errerrerrerr', err)
            process.nextTick(next)
        }

    }, function(err, transformedItems) {
        console.log("completed", transformedItems);
    });
    console.log("completed1");

});

async function tobi(value, from) {
    return '0x' + (Math.floor(parseFloat(value) * (10 ** from)) || 0).toString(16);
}

async function frombi(value, decimal) {
    return parseFloat(value / (10 ** decimal)) || 0;
}

async function fromHex(fromaddr) {

    try {
        var fromAddr = await tronWeb.address.fromHex(fromaddr);
        // console.log('fromHex',fromAddr)
        return fromAddr;
    } catch (err) {

    }
}

async function toHex(fromaddr) {
    try {
        var toAddr = await tronWeb.address.toHex(fromaddr);
        return toAddr;
    } catch (err) {

    }
}

// import package
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import syncEach from "sync-each";
import TronWeb from "tronweb";
import events from "events";

// import modal
import Token from "../iswapmodels/token";
import AdminDB from "../iswapmodels/admin-model";
import pairlistDB from "../iswapmodels/pairlist";
import lptokenlistDB from "../iswapmodels/lptokenlist";
import referalsDB from "../iswapmodels/referals";
import settingsDB from "../iswapmodels/settings";
import liquityDB from "../iswapmodels/liquity";
import usersDB from "../iswapmodels/users";
import dailypriceDB from "../iswapmodels/dailyprice";
import stakingtDB from "../iswapmodels/Staking";
import userpoolDB from "../iswapmodels/userpool";
import comingpairDB from "../iswapmodels/comingpair";

import keys from "../config/config";
const ownerAddress = keys.owneraddress;

const eventEmitter = new events.EventEmitter();

var tronWeb = new TronWeb({
    fullHost: keys.fullHost,
});

export const getToken = async(req, res) => {
    try {
        console.log("saran");
        var result = await Token.find({});
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

export const getAssets = async(req, res) => {
    try {
        console.log("saran");
        var result = await Token.find({
            $or: [{ fromsymbol: { $eq: "WTRX" } }, { tosymbol: { $eq: "WTRX" } }],
        });
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

export const getToken1 = async(req, res) => {
    try {
        console.log("saran");
        var result = await Token.find({});
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

export const gettokenCount = async(req, res) => {
    try {
        console.log("saran");
        var result = await Token.count({});
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

export const addToken = async(req, res) => {
    try {
        var reqBody = req.body;
        var useraddress = reqBody.useraddress;
        console.log(reqBody, "reqBodyreqBodyreqBodyreqBody@@@@@@");
        let checkUser = await Token.findOne({ from: reqBody.from, to: reqBody.to });

        if (checkUser) {
            return res.status(200).json({
                success: false,
                errors: { question: "Address already exists" },
            });
        }
        if (!checkUser) {
            var settings = await settingsDB.findOne({});
            await tronWeb.setAddress(keys.owneraddress);
            var contract = await tronWeb.contract().at(settings.router);
            if (
                useraddress == "" ||
                typeof useraddress == "undefined" ||
                !useraddress
            ) {
                useraddress = reqBody.from;
            }
            var getPairname = await contract
                .getPair(useraddress, reqBody.from, reqBody.to)
                .call();
            var Pairname = await fromHex(getPairname.pair);

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

export const addPair = async(req, res) => {
    try {
        var reqBody = req.body;
        console.log(reqBody, "reqBodyreqBodyreqBodyreqBody");
        let checkExits = await Token.findOne({
            tokena: reqBody.tokena,
            tokenb: reqBody.tokenb,
        });

        if (checkExits) {
            return res
                .status(400)
                .json({ success: false, errors: { question: "Pair already exists" } });
        }

        let newData = new pairlistDB({
            tokena: reqBody.tokena,
            tokenb: reqBody.tokenb,
            txid: reqBody.txid,
        });

        let newDoc = await newData.save();

        return res
            .status(200)
            .json({ success: true, message: "Pair Created Successfully" });
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const addPool = async(req, res) => {
    try {
        var reqBody = req.body;
        console.log(reqBody, "reqBodyreqBodyreqBodyreqBody");
        let checkExits = await pairlistDB.findOne({
            fromaddress: reqBody.tokena,
            toaddress: reqBody.tokenb,
        });

        if (checkExits) {
            return res
                .status(400)
                .json({ success: false, errors: { question: "Pair already exists" } });
        }

        let newData = new pairlistDB({
            fromaddress: reqBody.tokena,
            toaddress: reqBody.tokenb,
            pairtype: "single",
        });

        let newDoc = await newData.save();

        return res
            .status(200)
            .json({ success: true, message: "Pair Created Successfully" });
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const updateLiquidities = async(req, res) => {
    try {
        var reqBody = req.body;

        var list = JSON.parse(reqBody.liquidities);
        var address = reqBody.address;

        var settings = await settingsDB.findOne({});

        await tronWeb.setAddress(keys.owneraddress);
        var contract = await tronWeb.contract().at(settings.router);

        syncEach(
            list,
            async function(items, next) {
                var fromval = items.fromaddress;
                var toval = items.toaddress;

                var getPairname = await contract
                    .getPair(address, fromval, toval)
                    .call();

                var Pairname = await fromHex(getPairname.pair);
                var reserveA = await tronWeb.toDecimal(getPairname.reserveA._hex);
                var reserveB = await tronWeb.toDecimal(getPairname.reserveB._hex);
                var totalSupply = await tronWeb.toDecimal(getPairname.totalSupply._hex);
                console.log(Pairname, "PairnamePairnamePairname");
                var exits = await pairlistDB.findOne({ address: Pairname });

                if (!exits) {
                    var saveData = {
                        from: items.from,
                        to: items.to,
                        fromaddress: items.fromaddress,
                        toaddress: items.toaddress,
                        address: Pairname,
                        reserveA: reserveA,
                        reserveB: reserveB,
                        supply: items.supply,
                        totalsupply: totalSupply,
                        price_from: 0.12174936015372763,
                        price_to: 8.164387876411901,
                        status: "confirmed",
                    };
                    let newData = new pairlistDB(saveData);
                    let newDoc = await newData.save();
                }

                var exits1 = await lptokenlistDB.findOne({
                    lptoken: Pairname,
                    useraddress: address,
                });
                if (!exits1) {
                    var lpvalue = {
                        useraddress: address,
                        lptoken: Pairname,
                        supply: items.supply,
                        totalsupply: items.totalSupply,
                        status: "confirmed",
                    };
                    let newlbs = new lptokenlistDB(lpvalue);
                    let newDoc1 = await newlbs.save();
                }

                process.nextTick(next);
            },
            function(err, transformedItems) {
                return res.status(200).json({ success: true, message: "success" });
            }
        );
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const updateBalance = async(req, res) => {
    try {
        var reqBody = req.body;
        var address = reqBody.address;
        var lptoken = reqBody.lptoken;
        console.log(reqBody, "updateBalance");
        var getlbtoken = await pairlistDB.findOne({ address: lptoken });

        await tronWeb.setAddress(keys.owneraddress);
        var contract = await tronWeb.contract().at(keys.router);
        var getPairname = await contract
            .getPair(address, getlbtoken.fromaddress, getlbtoken.toaddress)
            .call();
        var supply = tronWeb.toDecimal(getPairname.supply._hex);
        await lptokenlistDB.findOneAndUpdate({ lptoken: lptoken }, { $set: { supply: supply } }, { new: true });
        return res.status(200).json({ success: true, message: "success" });
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getPairs = async(req, res) => {
    let market_flag = req.params.market;
    try {
        console.log("saran");
        var pairList = await pairlistDB.find({ stakeaddress: { $ne: "" } });
        // var pairList = await pairlistDB.find({ $or: [ { from: market_flag }, { to: market_flag } ] });

        var liqList = await liquityDB.aggregate([{
                $match: {
                    buytype: "add",
                    status: "success",
                },
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    poolamount: 1,
                    createdAt: 1,
                    buytype: 1,
                    fromamount: 1,
                    toamount: 1,
                },
            },
            {
                $group: {
                    _id: "$pairaddress",
                    totalliquity: { $sum: "$poolamount" },
                    pairaddress: { $first: "$pairaddress" },
                    fromsymbol: { $first: "$fromsymbol" },
                    poolamount: { $first: "$poolamount" },
                    tosymbol: { $first: "$tosymbol" },
                    fromamount: { $first: "$fromamount" },
                    toamount: { $first: "$toamount" },
                    fromvolume: {
                        $sum: {
                            $cond: [{
                                    $and: [{ $eq: ["$buytype", "add"] }],
                                },
                                "$fromamount",
                                0,
                            ],
                        },
                    },
                    tovolume: {
                        $sum: {
                            $cond: [{
                                    $and: [{ $eq: ["$buytype", "add"] }],
                                },
                                "$toamount",
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        var pairData = [];

        for (var p = 0; p < pairList.length; p++) {
            var index = liqList.findIndex(
                (val) => val.pairaddress == pairList[p].address
            );

            var fromvolume = 0;
            var tovolume = 0;

            if (index != -1) {
                fromvolume = liqList[index].fromvolume;
                tovolume = liqList[index].tovolume;
            }

            var obj = {
                from: pairList[p].from,
                to: pairList[p].to,
                fromaddress: pairList[p].fromaddress,
                toaddress: pairList[p].toaddress,
                fromlogo: pairList[p].fromlogo,
                tologo: pairList[p].tologo,
                address: pairList[p].address,
                stakeaddress: pairList[p].stakeaddress,
                rewardrate: pairList[p].rewardrate,
                price_from: pairList[p].price_from,
                price_to: pairList[p].price_to,
                supply: pairList[p].supply,
                reserveA: pairList[p].reserveA,
                reserveB: pairList[p].reserveB,
                totalsupply: pairList[p].totalsupply,
                fromdecimal: pairList[p].fromdecimal,
                todecimal: pairList[p].todecimal,
                fromrate: pairList[p].fromrate,
                torate: pairList[p].torate,
                frompool: pairList[p].frompool,
                topool: pairList[p].topool,
                totalliqutity: pairList[p].totalliqutity,
                fromvolume: pairList[p].frompool,
                tovolume: pairList[p].topool,
                stakestart: pairList[p].stakestart,
                stakeend: pairList[p].stakeend,
                pairtype: pairList[p].pairtype
            };

            pairData.push(obj);
        }

        if (!pairData) {
            return res
                .status(400)
                .json({ success: false, errors: { message: "Reords Not Found" } });
        }

        return res
            .status(200)
            .json({ success: true, message: "Load successfully", data: pairData });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getLPToken = async(req, res) => {
    try {
        console.log("saran");
        var result = await lptokenlistDB.find({ useraddress: req.query.account });
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

export const addReferal = async(req, res) => {
    try {
        var reqBody = req.body;
        let checkUser = await referalsDB.findOne({ address: reqBody.address });

        var validAddr = tronWeb.isAddress(reqBody.address);
        var validAddr1 = tronWeb.isAddress(reqBody.ref);

        if (!validAddr || !validAddr1) {
            return res
                .status(200)
                .json({ success: false, errors: { question: "Invalid address" } });
        }

        if (checkUser) {
            return res
                .status(200)
                .json({ success: false, errors: { question: "Address added" } });
        }
        if (!checkUser) {
            var data = { address: reqBody.ref };
            var userchk = await usersDB.findOne(data);

            if (!userchk) {
                let userData = new usersDB(data);
                let newUser = await userData.save();
            }
            let newUserData = new referalsDB({
                referal: reqBody.ref,
                address: reqBody.address,
            });

            let newDoc = await newUserData.save();
        }
        return res.status(200).json({
            success: true,
            refaddr: reqBody.ref,
            message: "Referals Updated Successfully",
        });
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getReferal = async(req, res) => {
    try {
        var reqBody = req.query;
        let checkUser = await referalsDB.findOne({ address: reqBody.address });

        if (checkUser) {
            return res
                .status(200)
                .json({ success: true, refaddr: checkUser.referal });
        } else {
            return res.status(200).json({ success: false, refaddr: "" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getSettings = async(req, res) => {
    try {
        let getVal = await settingsDB.findOne({});

        if (getVal) {
            return res.status(200).json({ success: true, result: getVal });
        } else {
            return res.status(200).json({ success: false, result: "" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const addLiquity = async(req, res) => {
    try {
        var reqBody = req.body;

        var from = reqBody.from;
        var to = reqBody.to;

        var cond1 = {
            $or: [
                { fromaddress: from, toaddress: to },
                { toaddress: from, fromaddress: to },
            ],
        };
        var cond = {
            $or: [
                { from: from, to: to },
                { to: from, from: to },
            ],
        };
        let tokenDetails = await Token.findOne(cond);

        let getPair = await pairlistDB.findOne(cond1);
        //let getPair = await pairlistDB.findOne({});

        console.log("getPair", getPair, reqBody);

        var fromdecimal = parseFloat(tokenDetails.fromdecimal);
        var todecimal = parseFloat(tokenDetails.todecimal);
        var fromsymbol = tokenDetails.fromsymbol;
        var tosymbol = tokenDetails.tosymbol;

        var fromaddress = tokenDetails.from;
        var toaddress = tokenDetails.to;

        var decimal1 = 0;
        var decimal2 = 0;

        if (fromaddress == from) {
            decimal1 = 10 ** fromdecimal;
        } else if (toaddress == from) {
            decimal1 = 10 ** todecimal;
        }
        if (fromaddress == to) {
            decimal2 = 10 ** fromdecimal;
        } else if (toaddress == to) {
            decimal2 = 10 ** todecimal;
        }

        var pairAddr =
            tokenDetails && tokenDetails.pairaddress ? tokenDetails.pairaddress : "";

        if (pairAddr == "") {
            var settings = await settingsDB.findOne({});
            await tronWeb.setAddress(keys.owneraddress);
            var contract = await tronWeb.contract().at(settings.router);
            var getPairname = await contract
                .getPair(reqBody.address, from, to)
                .call();
            pairAddr = await fromHex(getPairname.pair);
            console.log("pairAddr><><>", pairAddr);
        }

        var data = { address: reqBody.address };
        var userchk = await usersDB.findOne(data);

        var userId = userchk && userchk._id ? userchk._id : "";
        if (!userchk) {
            let userData = new usersDB(data);
            let newUser = await userData.save();
            userId = newUser._id;
        }
        var cnd = {
            address: reqBody.address,
            pairaddress: pairAddr,
        };
        var poolchk = await userpoolDB.findOne(cnd);

        if (!poolchk) {
            var poolval = {
                pairaddress: pairAddr,
                address: reqBody.address,
            };
            let poolData = new userpoolDB(poolval);
            let newPool = await poolData.save();
        }

        var fromamount = reqBody.amount1 / decimal1;
        var toamount = reqBody.amount2 / decimal2;

        if (reqBody.buytype == "remove") {
            fromamount = reqBody.amount1;
            toamount = reqBody.amount2;
        }
        var amt1 = 0;
        var amt2 = 0;
        var reverse = false;
        if (fromaddress == from) {
            amt1 = fromamount;
            amt2 = toamount;
        } else {
            amt1 = toamount;
            amt2 = fromamount;
            reverse = true;
        }

        // if(reqBody.buytype=="add"){
        //   if(!reverse){
        //     await Token.findOneAndUpdate({_id:tokenDetails._id},{
        //       $inc: {
        //         frompool: amt1,
        //         topool:amt2
        //       }
        //     },{new:true});
        //   }else if(reverse){
        //     await Token.findOneAndUpdate({_id:tokenDetails._id},{
        //       $inc: {
        //         frompool: amt1,
        //         topool:amt2
        //       }
        //     },{new:true});
        //   }
        // }else if(reqBody.buytype=="swap"){
        //   if(!reverse){
        //     await Token.findOneAndUpdate({_id:tokenDetails._id},{
        //       $inc: {
        //         frompool: amt1,
        //         topool:-amt2
        //       }
        //     },{new:true});
        //   }else if(reverse){
        //     await Token.findOneAndUpdate({_id:tokenDetails._id},{
        //       $inc: {
        //         frompool: -amt1,
        //         topool:amt2
        //       }
        //     },{new:true});
        //   }
        // }

        var liqdata = {
            from: fromaddress,
            to: toaddress,
            fromsymbol: fromsymbol,
            tosymbol: tosymbol,
            fromamount: amt1,
            toamount: amt2,
            pairaddress: pairAddr,
            txid: reqBody.txid,
            useraddress: reqBody.address,
            userid: userId,
            buytype: reqBody.buytype,
            reverse: reverse,
        };

        let newData = new liquityDB(liqdata);
        let newDoc = await newData.save();

        var transData = {
            address: reqBody.address,
            txid: reqBody.txid,
            id: newDoc._id,
            from: from,
            to: to,
            buytype: reqBody.buytype,
            pairaddress: pairAddr,
        };

        if (reqBody.buytype != "swap") {
            eventEmitter.emit("check-transaction", transData, function() {});
        }
        if (reqBody.buytype == "add") {
            eventEmitter.emit("daily-price", liqdata, function() {});
        }
        if (reqBody.buytype == "swap") {
            eventEmitter.emit("check-swap-transaction", transData, function() {});
        }

        var poolAddr = {
            pair: pairAddr,
            from: fromaddress,
            to: toaddress,
        };
        eventEmitter.emit("update-pool-tokens", poolAddr, function() {});

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log("errerr", err);
        return res.status(500).json({ success: false, errors: { messages: err } });
    }
};

eventEmitter.on("update-pool-tokens", async function(data, done) {
    try {
        const tronWeb = new TronWeb({
            fullHost: "https://api.trongrid.io",
        });

        var fromcontract = await tronWeb.contract().at(data.from);
        var balanceOf = await fromcontract.balanceOf(data.pair).call();
        var decimals = await fromcontract.decimals().call();
        var fromBalance = await tronWeb.toDecimal(balanceOf._hex);
        var fromDecimal = await tronWeb.toDecimal(decimals._hex);

        var tocontract = await tronWeb.contract().at(data.to);
        var tobalanceOf = await tocontract.balanceOf(data.pair).call();
        var todecimals = await tocontract.decimals().call();
        var toBalance = await tronWeb.toDecimal(tobalanceOf._hex);
        var toDecimal = await tronWeb.toDecimal(todecimals._hex);

        var fromPool = 0;
        var toPool = 0;
        if (fromBalance > 0) {
            fromPool = fromBalance * 10 ** fromDecimal;
        }
        if (toBalance > 0) {
            toPool = toBalance * 10 ** toDecimal;
        }

        // await pairlistDB.findOneAndUpdate({address:exits._id},{ "$set":
        // {"frompool":fromPool,"topool":toPool}},{new:true});

        // await Token.findOneAndUpdate({pairaddress:exits._id},{ "$set":
        // {"frompool":fromPool,"topool":toPool}},{new:true});

        await pairlistDB.findOneAndUpdate({ address: data.pair }, { $set: { frompool: fromPool, topool: toPool } }, { new: true });

        await Token.findOneAndUpdate({ pairaddress: data.pair }, { $set: { frompool: fromPool, topool: toPool } }, { new: true });

        done();
    } catch (err) {
        done();
    }
});

eventEmitter.on("daily-price", async function(data, done) {
    try {
        var start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        var cond = {
            createdAt: { $gte: start, $lt: end },
        };
        let exits = await dailypriceDB.findOne(cond);

        var fromamount = parseFloat(data.fromamount);
        var toamount = parseFloat(data.toamount);
        var fromRate = (toamount / fromamount).toFixed(4);
        var toRate = (fromamount / toamount).toFixed(4);

        if (exits) {
            await dailypriceDB.findOneAndUpdate({ _id: exits._id }, { $set: { fromamount: fromRate, toamount: toRate } }, { new: true });
        } else {
            var saveData = {
                from: data.from,
                to: data.to,
                fromamount: fromRate,
                toamount: toRate,
                fromsymbol: data.fromsymbol,
                tosymbol: data.tosymbol,
            };
            let newData = new dailypriceDB(saveData);
            let newDoc = await newData.save();
        }
        done();
    } catch (err) {
        console.log("err~~~~", err);
        done();
    }
});

eventEmitter.on("check-transaction", async function(data, done) {
    checkTransaction(data);

    var transactionCnt = 0;
    async function checkTransaction(data) {
        console.log("postData~~~~~~~~~~~~~", data);

        try {
            if (transactionCnt >= 30) {
                console.log("Invalid transaction>>>>>>>>>>>>>");
                done();
                return;
            }

            var txid = data.txid;
            var getTrans = await tronWeb.trx.getTransaction(txid);
            await tronWeb.setAddress(ownerAddress);
            if (
                getTrans &&
                getTrans.ret &&
                getTrans.ret[0] &&
                getTrans.ret[0].contractRet &&
                getTrans.ret[0].contractRet == "SUCCESS"
            ) {
                var getSettings = await settingsDB.findOne({});
                var userData = await userpoolDB.findOne({
                    address: data.address,
                    pairaddress: data.pairaddress,
                });
                var poolAmt = userData && userData.poolamount ? userData.poolamount : 0;

                var contract = await tronWeb.contract().at(getSettings.router);
                var getList = await contract
                    .getPair(data.address, data.from, data.to)
                    .call();

                var supply = parseFloat(parseInt(getList.supply) / 10 ** 8 || 0);

                var amt = supply;
                if (poolAmt > 0 && data.buytype == "add") {
                    amt = supply - poolAmt;
                }
                if (poolAmt > 0 && data.buytype == "remove") {
                    amt = poolAmt - supply;
                }

                await liquityDB.findOneAndUpdate({ txid: txid }, { $set: { status: "success", poolamount: amt } }, { new: true });

                await pairlistDB.findOneAndUpdate({ address: data.pairaddress }, {
                    $inc: {
                        totalliqutity: amt,
                    },
                }, { new: true });

                await userpoolDB.findOneAndUpdate({ address: data.address, pairaddress: data.pairaddress }, { $set: { poolamount: supply } }, { new: true });
                done();
            } else {
                setTimeout(function() {
                    transactionCnt++;
                    console.log("elseeeeee");
                    checkTransaction(data);
                }, 200);
            }
        } catch (err) {
            console.log("errerrerr", err, transactionCnt);
            if (transactionCnt >= 30) {
                console.log("Invalid transaction");
                done();
            } else {
                setTimeout(function() {
                    transactionCnt++;
                    checkTransaction(data);
                }, 200);
            }
        }
    }
});

eventEmitter.on("check-swap-transaction", async function(data, done) {
    checkTransaction(data);

    var transactionCnt = 0;
    async function checkTransaction(data) {
        console.log("postData~~~~~~~~~~~~~", data);

        try {
            if (transactionCnt >= 30) {
                console.log("Invalid transaction>>>>>>>>>>>>>");
                done();
                return;
            }

            var txid = data.txid;
            var getTrans = await tronWeb.trx.getTransaction(txid);

            if (
                getTrans &&
                getTrans.ret &&
                getTrans.ret[0] &&
                getTrans.ret[0].contractRet &&
                getTrans.ret[0].contractRet == "SUCCESS"
            ) {
                await liquityDB.findOneAndUpdate({ txid: txid }, { $set: { status: "success" } }, { new: true });

                done();
            } else {
                setTimeout(function() {
                    transactionCnt++;
                    console.log("elseeeeee");
                    checkTransaction(data);
                }, 200);
            }
        } catch (err) {
            console.log("errerrerr", err, transactionCnt);
            if (transactionCnt >= 30) {
                console.log("Invalid transaction");
                done();
            } else {
                setTimeout(function() {
                    transactionCnt++;
                    checkTransaction(data);
                }, 200);
            }
        }
    }
});

export const getLiquitylist = async(req, res) => {
    let market_flag = req.params.market;
    // let market_flag = "trx";
    try {
        var start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        // var cond = {
        //   createdAt: {$gte: start, $lt: end},
        //   buytype:'add',
        //   status: "success",
        // }

        var liqList = await liquityDB.aggregate([{
                $match: {
                    $or: [{ buytype: "add" }, { buytype: "swap" }],
                    status: "success",
                },
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    poolamount: 1,
                    createdAt: 1,
                    buytype: 1,
                    fromamount: 1,
                    toamount: 1,
                    reverse: 1,
                },
            },
            {
                $group: {
                    _id: "$pairaddress",
                    totalliquity: { $sum: "$poolamount" },
                    pairaddress: { $first: "$pairaddress" },
                    fromsymbol: { $first: "$fromsymbol" },
                    poolamount: { $first: "$poolamount" },
                    tosymbol: { $first: "$tosymbol" },
                    fromamount: { $first: "$fromamount" },
                    toamount: { $first: "$toamount" },
                    todaycount: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ["$createdAt", start] },
                                        { $lt: ["$createdAt", end] },
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    todayvolume: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ["$createdAt", start] },
                                        { $lt: ["$createdAt", end] },
                                    ],
                                },
                                "$poolamount",
                                0,
                            ],
                        },
                    },
                    fromvolume: {
                        $sum: {
                            $cond: [{
                                    $and: [{ $eq: ["$buytype", "add"] }],
                                },
                                "$fromamount",
                                0,
                            ],
                        },
                    },
                    tovolume: {
                        $sum: {
                            $cond: [{
                                    $and: [{ $eq: ["$buytype", "add"] }],
                                },
                                "$toamount",
                                0,
                            ],
                        },
                    },
                    volumetoday: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ["$createdAt", start] },
                                        { $lt: ["$createdAt", end] },
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", false] },
                                    ],
                                },
                                "$fromamount",
                                0,
                            ],
                        },
                    },
                    volumetoday1: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ["$createdAt", start] },
                                        { $lt: ["$createdAt", end] },
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", false] },
                                    ],
                                },
                                "$toamount",
                                0,
                            ],
                        },
                    },
                    volumetoday2: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ["$createdAt", start] },
                                        { $lt: ["$createdAt", end] },
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", true] },
                                    ],
                                },
                                '$toamount',
                                0,
                            ],
                        },
                    },
                    volumetoday3: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $gte: ["$createdAt", start] },
                                        { $lt: ["$createdAt", end] },
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", true] },
                                    ],
                                },
                                '$fromamount',
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        // var pairList = await pairlistDB.find();
        let query = {};

        if (market_flag == "trx") {
            query = {
                $and: [
                    {
                        $or: [
                            { from: market_flag },
                            { to: market_flag },
                            { from: "WTRX" },
                            { to: "WTRX" }
                        ]
                    },
                   { stakeaddress: { $ne: "" }}
                ]
            }
        } else {
            query = {
                $and: [
                    {
                        $or: [
                            { from: market_flag },
                            { to: market_flag }
                        ]
                    },
                   { stakeaddress: { $ne: "" }}
                ]
            }
        }
        var pairList = await pairlistDB.find(query);

        var pairData = [];

        for (var p = 0; p < pairList.length; p++) {
            var index = liqList.findIndex(
                (val) => val.pairaddress == pairList[p].address
            );
            var price_from = 0;
            var totalliquity = 0;
            var poolamount = 0;
            var todaycount = 0;
            var todayvolume = 0;
            var fromvolume = 0;
            var tovolume = 0;
            var volumetoday = 0;
            var volumetoday1 = 0;
            var volumetoday2 = 0;
            var volumetoday3 = 0;
            if (index != -1) {
                price_from = liqList[index].price_from;
                totalliquity = liqList[index].totalliquity;
                poolamount = liqList[index].poolamount;
                todaycount = liqList[index].todaycount;
                todayvolume = liqList[index].todayvolume;
                fromvolume = liqList[index].fromvolume;
                tovolume = liqList[index].tovolume;
                volumetoday = liqList[index].volumetoday;
                volumetoday1 = liqList[index].volumetoday1;
                volumetoday2 = liqList[index].volumetoday2;
                volumetoday3 = liqList[index].volumetoday3;
            }

            pairData.push({
                totalliquity: totalliquity,
                todaycount: todaycount,
                todayvolume: todayvolume,
                price_from: pairList[p].price_from,
                pairaddress: pairList[p].address,
                fromsymbol: pairList[p].from,
                tosymbol: pairList[p].to,
                fromamount: pairList[p].fromrate,
                toamount: pairList[p].torate,
                fromvolume: pairList[p].frompool,
                tovolume: pairList[p].topool,
                fromprice: pairList[p].fromrate,
                toprice: pairList[p].torate,
                volumetoday: volumetoday,
                volumetoday1: volumetoday1,
                volumetoday2: volumetoday2,
                volumetoday3: volumetoday3,
                fromlogo: pairList[p].fromlogo,
                tologo: pairList[p].tologo,
            });

            if (pairList[p].from == "ICR" && pairList[p].to == "BTC") {
                console.log({
                    totalliquity: totalliquity,
                    todaycount: todaycount,
                    todayvolume: todayvolume,
                    price_from: pairList[p].price_from,
                    pairaddress: pairList[p].address,
                    fromsymbol: pairList[p].from,
                    tosymbol: pairList[p].to,
                    fromamount: pairList[p].fromrate,
                    toamount: pairList[p].torate,
                    fromvolume: pairList[p].frompool,
                    tovolume: pairList[p].topool,
                    fromprice: pairList[p].frompool,
                    toprice: pairList[p].topool,
                    volumetoday: volumetoday,
                    volumetoday1: volumetoday1,
                    volumetoday2: volumetoday2,
                    volumetoday3: volumetoday3,
                    fromlogo: pairList[p].fromlogo,
                    tologo: pairList[p].tologo,
                }, "pairDatapairDatapairData");
            }
        }

        let trxicr = await pairlistDB.findOne({
            address: "TVGdFgp1oKksGXcozoYdM614by7pdJnzty",
        });
        var trxicrRate = (trxicr && trxicr.fromrate) ? trxicr.fromrate : 0;

        return res
            .status(200)
            .json({ success: true, list: pairData, ratevalue: trxicrRate });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getCharts = async(req, res) => {
    try {
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        console.log("monthmonth", month);
        var daysInMonth = new Date(year, month, 0).getDate();
        var period = parseFloat(req.query.period);
        var start = new Date(year, 1, 1);
        var end = new Date(year, 12, 31);
        if (period == 30) {
            start = new Date(year, month, 1);
            end = new Date(year, month, daysInMonth);
        }
        console.log(start, end, daysInMonth, "<><>><><");
        var cond = {
            createdAt: { $gte: start, $lt: end },
            buytype: "add",
            status: "success",
            pairaddress: req.query.pair,
        };

        if (req.query.type == "rate0" || req.query.type == "rate1") {
            var Query = [{
                    $match: {
                        pairaddress: req.query.pair,
                        $and: [{ fromamount: { $gt: 0 } }, { toamount: { $gt: 0 } }],
                    },
                },
                {
                    $project: {
                        _id: 1,
                        ymd: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        fromamount: 1,
                        toamount: 1,
                        createdAt: 1,
                    },
                },
            ];
            if (period == 365 || period == 30) {
                var pusgQuery = {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: "$createdAt" },
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" },
                        },
                        time: { $first: "$ymd" },
                        fromtotal: { $sum: "$fromamount" },
                        tototal: { $sum: "$toamount" },
                    },
                };
            }

            if (period == 7) {
                var pusgQuery = {
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                            week: { $week: "$createdAt" },
                            year: { $year: "$createdAt" },
                            day: { $dayOfMonth: "$createdAt" },
                        },
                        time: { $first: "$ymd" },
                        fromtotal: { $sum: "$fromamount" },
                        tototal: { $sum: "$toamount" },
                    },
                };
            }

            Query.push(pusgQuery);
            if (req.query.type == "rate0") {
                var pusgQuery1 = {
                    $project: {
                        _id: 0,
                        time: "$time",
                        value: "$fromtotal",
                        date: {
                            $dateFromString: {
                                dateString: "$time",
                            },
                        },
                    },
                };
            } else {
                var pusgQuery1 = {
                    $project: {
                        _id: 0,
                        time: "$time",
                        value: "$tototal",
                        date: {
                            $dateFromString: {
                                dateString: "$time",
                            },
                        },
                    },
                };
            }

            Query.push(pusgQuery1);
            var sort = {
                $sort: { date: 1 },
            };
            Query.push(sort);
            var liqList = await dailypriceDB.aggregate(Query);
        } else {
            var Query = [{
                    $match: cond,
                },
                {
                    $project: {
                        _id: 1,
                        ymd: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        poolamount: 1,
                        fromamount: 1,
                        toamount: 1,
                        createdAt: 1,
                    },
                },
            ];

            if (req.query.type == "volume") {
                if (period == 365 || period == 30) {
                    var pusgQuery = {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" },
                                day: { $dayOfMonth: "$createdAt" },
                            },
                            time: { $first: "$ymd" },
                            value1: { $sum: "$fromamount" },
                            value2: { $sum: "$toamount" },
                        },
                    };
                }

                if (period == 7) {
                    var pusgQuery = {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                week: { $week: "$createdAt" },
                                year: { $year: "$createdAt" },
                                day: { $dayOfMonth: "$createdAt" },
                            },
                            time: { $first: "$ymd" },
                            value1: { $sum: "$fromamount" },
                            value2: { $sum: "$toamount" },
                        },
                    };
                }

                Query.push(pusgQuery);
                var pusgQuery1 = {
                    $project: {
                        _id: 0,
                        time: "$time",
                        value: { $add: ["$value1", "$value2"] },
                        date: {
                            $dateFromString: {
                                dateString: "$time",
                            },
                        },
                    },
                };
            } else {
                console.log("<<<>>>>>>>>>>>>>>>");
                if (period == 365 || period == 30) {
                    var pusgQuery = {
                        $group: {
                            _id: {
                                day: { $dayOfMonth: "$createdAt" },
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" },
                            },
                            time: { $first: "$ymd" },
                            value: { $sum: "$poolamount" },
                        },
                    };
                }

                if (period == 7) {
                    var pusgQuery = {
                        $group: {
                            _id: {
                                month: { $month: "$createdAt" },
                                week: { $week: "$createdAt" },
                                year: { $year: "$createdAt" },
                                day: { $dayOfMonth: "$createdAt" },
                            },
                            time: { $first: "$ymd" },
                            value: { $sum: "$poolamount" },
                        },
                    };
                }

                Query.push(pusgQuery);
                var pusgQuery1 = {
                    $project: {
                        _id: 0,
                        time: "$time",
                        value: "$value",
                        date: {
                            $dateFromString: {
                                dateString: "$time",
                            },
                        },
                    },
                };
            }
            Query.push(pusgQuery1);
            var sort = {
                $sort: { date: 1 },
            };
            Query.push(sort);

            var liqList = await liquityDB.aggregate(Query);
        }

        return res.status(200).json({ success: true, list: liqList });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getPairetails = async(req, res) => {
    try {
        var address = req.query.pair;
        let getVal = await pairlistDB.findOne({ address: address });

        let trxicr = await pairlistDB.findOne({
            address: "TVGdFgp1oKksGXcozoYdM614by7pdJnzty",
        });
        var trxicrRate = trxicr.fromrate;

        if (getVal) {
            return res.status(200).json({
                success: true,
                result: getVal,
                fromamount: getVal.fromrate,
                toamount: getVal.torate,
                ratevalue: trxicrRate,
            });
        } else {
            return res.status(200).json({ success: false, result: "" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getPairstats = async(req, res) => {
    try {
        var start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        var pairaddr = req.query.pair;

        var liqList = await liquityDB.aggregate([{
                $match: {
                    $or: [{ buytype: "add" }, { buytype: "swap" }, { buytype: "remove" }],
                    status: "success",
                    pairaddress: pairaddr,
                },
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    poolamount: 1,
                    fromamount: 1,
                    buytype: 1,
                    toamount: 1,
                },
            },
            {
                $group: {
                    _id: "$pairaddress",
                    totalliquity: { $sum: "$poolamount" },
                    liqtotaladd: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "add"] }, "$poolamount", 0],
                        },
                    },
                    liqtotalremove: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "remove"] }, "$poolamount", 0],
                        },
                    },
                    fromtotaladd: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "add"] }, "$fromamount", 0],
                        },
                    },
                    fromtotalremove: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "remove"] }, "$fromamount", 0],
                        },
                    },
                    tototaladd: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "add"] }, "$toamount", 0],
                        },
                    },
                    tototalremove: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "remove"] }, "$toamount", 0],
                        },
                    },
                    fromtotal: { $sum: "$fromamount" },
                    tototal: { $sum: "$toamount" },
                    pairaddress: { $first: "$pairaddress" },
                    fromsymbol: { $first: "$fromsymbol" },
                    tosymbol: { $first: "$tosymbol" },
                },
            },
        ]);

        var cond = {
            createdAt: { $gte: start, $lt: end },
            $or: [{ buytype: "add" }, { buytype: "swap" }, { buytype: "remove" }],
            status: "success",
            pairaddress: pairaddr,
        };

        var todayliqList = await liquityDB.aggregate([{
                $match: cond,
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    poolamount: 1,
                    fromamount: 1,
                    toamount: 1,
                    buytype: 1,
                    reverse: 1,
                },
            },
            {
                $group: {
                    _id: "$pairaddress",
                    totalliquity: { $sum: "$poolamount" },
                    liqtotaladd: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "add"] }, "$poolamount", 0],
                        },
                    },
                    fromvolume: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", false] },
                                    ],
                                },
                                "$fromamount",
                                0,
                            ],
                        },
                    },
                    tovolume: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", false] },
                                    ],
                                },
                                "$toamount",
                                0,
                            ],
                        },
                    },
                    fromvolume1: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", true] },
                                    ],
                                },
                                "$toamount",
                                0,
                            ],
                        },
                    },
                    tovolume1: {
                        $sum: {
                            $cond: [{
                                    $and: [
                                        { $eq: ["$buytype", "swap"] },
                                        { $eq: ["$reverse", true] },
                                    ],
                                },
                                "$fromamount",
                                0,
                            ],
                        },
                    },
                    liqtotalremove: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "remove"] }, "$poolamount", 0],
                        },
                    },
                    swapcount: {
                        $sum: {
                            $cond: [{ $eq: ["$buytype", "swap"] }, 1, 0],
                        },
                    },
                    totalcount: { $sum: 1 },
                    pairaddress: { $first: "$pairaddress" },
                    fromsymbol: { $first: "$fromsymbol" },
                    tosymbol: { $first: "$tosymbol" },
                },
            },
        ]);

        var count = -1;
        if (liqList && liqList.length && todayliqList && todayliqList.length) {
            var x;
            for (x in liqList) {
                count++;
                var index = todayliqList.findIndex(
                    (val) =>
                    (val._id && val._id != "" && val._id.toString()) ==
                    (liqList[x] &&
                        liqList[x]._id &&
                        liqList[x]._id != "" &&
                        liqList[x]._id.toString())
                );
                console.log("indexindex", index);
                if (index != -1) {
                    var finalVal = parseFloat(todayliqList[index].liqtotaladd);

                    liqList[count].todayliq = finalVal;
                    liqList[count].fromvolume = todayliqList[index].fromvolume;
                    liqList[count].tovolume = todayliqList[index].tovolume;
                    liqList[count].countliq = todayliqList[index].totalcount;
                    liqList[count].swapcnt = todayliqList[index].swapcount;
                }
            }
        }

        let tokenval = await Token.findOne({ pairaddress: pairaddr });

        console.log("liqList", liqList, tokenval, todayliqList, "saranßß");
        return res.status(200).json({
            success: true,
            list: liqList,
            tokenval: tokenval,
            todaylist: todayliqList,
        });
    } catch (err) {
        console.log(err, "errrrrrrrrrr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getTransactionlist = async(req, res) => {
    try {
        var type = "";
        console.log("req.query", req.query.pair, req.query.type);
        var cond = {
            pairaddress: req.query.pair,
            $or: [
                { buytype: { $eq: "swap" } },
                { buytype: { $eq: "add" } },
                { buytype: { $eq: "remove" } },
            ],
            status: "success",
        };
        if (req.query.type != "all") {
            cond = {
                pairaddress: req.query.pair,
                buytype: req.query.type,
                status: "success",
            };
        }

        var liqList = await liquityDB.aggregate([{
                $match: cond,
            },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    _id: 1,
                    fromamount: 1,
                    toamount: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    useraddress: 1,
                    buytype: 1,
                    reverse: 1,
                    txid: 1,
                    ymd: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                },
            },
            { $limit: 20 },
        ]);

        var x;
        for (x in liqList) {
            liqList[x].fromsymbol =
                liqList[x].fromsymbol == "WTRX" ? "TRX" : liqList[x].fromsymbol;
            liqList[x].tosymbol =
                liqList[x].tosymbol == "WTRX" ? "TRX" : liqList[x].tosymbol;
        }

        return res
            .status(200)
            .json({ success: true, message: "success", result: liqList });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const updateLiqudity = async(req, res) => {
    try {
        var reqBody = req.body;
        var address = reqBody.address;
        var lptoken = parseFloat(reqBody.lptoken);
        if (reqBody.status == 1) {
            var lptoken = reqBody.lptoken;
        } else {
            var lptoken = -Math.abs(reqBody.lptoken);
        }

        var exits = await stakingtDB.findOne({ stakingAddress: address });

        if (!exits) {
            var saveData = {
                stakingAddress: address,
                totalstaking: lptoken,
            };
            let newData = new stakingtDB(saveData);
            let newDoc = await newData.save();
        } else {
            await stakingtDB.findOneAndUpdate({ stakingAddress: address }, {
                $inc: {
                    totalstaking: lptoken,
                },
            }, { new: true });
        }

        return res.status(200).json({ success: true, message: "success" });
    } catch (err) {
        console.log(err, "errerrerrerrerrerrerrerrerrerrerrerr");
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getTotal = async(req, res) => {
    try {
        var reqBody = req.query;
        let checkUser = await stakingtDB.findOne({ address: reqBody.address });

        if (checkUser) {
            async.parallel({
                    result: function(cb) {
                        stakingtDB
                            .findOne({ address: reqBody.address }, { totalstaking })
                            .exec(cb);
                    },
                    total: function(cb) {
                        stakingtDB
                            .aggregate([{
                                $group: {
                                    _id: null,
                                    total: {
                                        $sum: "$totalstaking",
                                    },
                                },
                            }, ])
                            .exec(cb);
                    },
                },
                function(err, results) {
                    return res.status(200).json({
                        success: true,
                        amount: results.result.totalstaking,
                        total: results.total[0][total],
                    });
                }
            );
        } else {
            return res
                .status(200)
                .json({ success: false, errors: { question: "Address added" } });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const Swaplist = async(req, res) => {
    try {
        var liqList = await liquityDB.aggregate([{
                $match: {
                    buytype: "swap",
                    status: "success",
                },
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    from: 1,
                    to: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    fromamount: 1,
                    toamount: 1,
                    last_price: { $literal: 0 },
                },
            },
            {
                $group: {
                    _id: "$pairaddress",
                    base_id: { $first: "$from" },
                    base_name: { $first: "$fromsymbol" },
                    base_symbol: { $first: "$fromsymbol" },
                    quote_id: { $first: "$to" },
                    quote_name: { $first: "$tosymbol" },
                    quote_symbol: { $first: "$tosymbol" },
                    last_price: { $first: "$last_price" },
                    base_volume: { $sum: "$fromamount" },
                    quote_volume: { $sum: "$toamount" },
                },
            },
        ]);

        var lastPrice = await liquityDB.aggregate([{
                $match: {
                    buytype: "swap",
                    $or: [{ fromsymbol: { $eq: "WTRX" } }, { tosymbol: { $eq: "WTRX" } }],
                    status: "success",
                },
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    from: 1,
                    to: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    fromamount: 1,
                    toamount: 1,
                    last_price: { $literal: 0 },
                },
            },
        ]);

        if (lastPrice && lastPrice.length > 0) {
            var lastValue = lastPrice[lastPrice.length - 1];
            if (lastValue.fromsymbol == "WTRX") {
                liqList[0].last_price = lastValue.fromamount;
            } else if (lastValue.tosymbol == "WTRX") {
                liqList[0].last_price = lastValue.toamount;
            }
        }

        res.json(liqList);
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const Swaplists = async(req, res) => {
    try {
        var liqList = await liquityDB.aggregate([{
                $match: {
                    buytype: "swap",
                    status: "success",
                },
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    from: 1,
                    to: 1,
                    fromsymbol: 1,
                    txid: 1,
                    tosymbol: 1,
                    fromamount: 1,
                    toamount: 1,
                    createdAt: 1,
                    last_price: { $literal: 0 },
                },
            },
        ]);

        var list = [];
        var x;
        for (x in liqList) {
            var id = liqList[x].txid;
            var fromDecimal = 6;
            var fromsym = liqList[x].fromsymbol;
            var fromAmt = liqList[x].fromamount;

            var toDecimal = 8;
            var tosym = liqList[x].tosymbol;
            var toAmt = liqList[x].toamount;

            var newDate = new Date(liqList[x].createdAt);
            var timestamp = newDate.getTime();

            var obj = {
                id: id,
                pair: {
                    fromToken: {
                        decimals: fromDecimal,
                        symbol: fromsym,
                        tradeVolume: fromAmt,
                    },
                    toToken: {
                        decimals: toDecimal,
                        symbol: tosym,
                        tradeVolume: toAmt,
                    },
                },
                timestamp: timestamp,
            };
            list.push(obj);
        }

        res.json(list);
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const yieldForming = async(req, res) => {
    try {
        var List = await stakingtDB.aggregate([{
                $match: {},
            },
            {
                $project: {
                    _id: 1,
                    totalstaking: 1,
                },
            },
            {
                $group: {
                    _id: null,
                    totalstaked: { $sum: "$totalstaking" },
                },
            },
        ]);
        var stakedTot =
            List && List[0] && List[0].totalstaked ? List[0].totalstaked : 0;
        var listValue = await stakingtDB.find({});
        let getSettings = await settingsDB.findOne({});
        var poolList = [];
        var y;
        for (y in listValue) {
            var stakedAmt = listValue[y].totalstaking;
            var stakedAddr = listValue[y].stakingAddress;

            let getPair = await pairlistDB.findOne({ stakeaddress: stakedAddr });

            var ownerAddr = "TUEieVrbZjTNUnvdqy5k3DU6wMiiMBTPS8";
            var fromaddr = getPair && getPair.fromaddress ? getPair.fromaddress : "";
            var toaddr = getPair && getPair.toaddress ? getPair.toaddress : "";
            var fromDecimal =
                getPair && getPair.fromdecimal ? getPair.fromdecimal : "";
            var toDecimal = getPair && getPair.todecimal ? getPair.todecimal : "";

            await tronWeb.setAddress(ownerAddr);

            //var contract = await this.getContract(routeaddress, ROUTEABI);
            var contract = await tronWeb.contract().at(getSettings.router);
            console.log(ownerAddr, fromaddr, toaddr, "><<>>>>>>");
            var response = await contract.getPair(ownerAddr, fromaddr, toaddr).call();
            var B_tokenTotalSupply = await tronWeb.toDecimal(response.reserveB._hex);
            var TokenDecimalB = 10 ** toDecimal;
            var A_tokenTotalSupply = await tronWeb.toDecimal(response.reserveA._hex);
            var TokenDecimalA = 10 ** fromDecimal;

            var supplyhex = await tronWeb.toDecimal(response.supply._hex);
            var supplyval = 0;
            if (supplyhex > 0) {
                supplyval = parseFloat(parseInt(supplyhex) / 10 ** 8 || 0);
            }

            var response1 = await contract
                .getPair(ownerAddr, fromaddr, toaddr)
                .call();
            var userbalance = await tronWeb.toDecimal(response1.supply._hex);
            var supply1 = 0;
            if (userbalance > 0) {
                var supply1 = parseFloat(parseInt(userbalance) / 10 ** 8 || 0);
            }

            var BLOCKS_PER_YEAR = 10512000;

            var orangeRewardPerBlock = 1;
            var LPTOTAL_SUPPLY = stakedAmt;
            var TOTAL_SUPPLY_IN_LP_CONTRACT = stakedTot;

            if (stakedAddr && stakedAddr != "") {
                //var contract = await this.getContract(stakeaddress, stakeAbi);
                var contract1 = await tronWeb.contract().at(stakedAddr);
                var res1 = await contract1.rewardRate().call();
                orangeRewardPerBlock = await tronWeb.toDecimal(res1._hex);
            }

            var OrangeRewardPerYear = orangeRewardPerBlock * BLOCKS_PER_YEAR;
            console.log(LPTOTAL_SUPPLY, TOTAL_SUPPLY_IN_LP_CONTRACT);
            var lpTokenRatio = LPTOTAL_SUPPLY / TOTAL_SUPPLY_IN_LP_CONTRACT;

            var Token_amount = (A_tokenTotalSupply / TokenDecimalA) * lpTokenRatio;
            var quoteTokenAmount =
                (B_tokenTotalSupply / TokenDecimalB) * lpTokenRatio;
            var TokenPrice = quoteTokenAmount / Token_amount;

            var apy = TokenPrice * OrangeRewardPerYear;
            var totalValue = (B_tokenTotalSupply / TokenDecimalB) * lpTokenRatio * 2;
            apy = (apy / totalValue) * 100;

            var name = getPair && getPair.from ? getPair.from : "";
            var name1 = getPair && getPair.to ? getPair.to : "";

            var pairAddr = getPair && getPair.address ? getPair.address : "";

            var data = {
                name: name + "/" + name1,
                pair: name + "/" + name1,
                pairLink: "https://tronscan.org/#/address/" + pairAddr + "",
                logo: "https://iotuswap.finance/images/icons/footerLogo.png",
                poolRewards: ["IOTU"],
                apr: apy,
                totalStaked: stakedTot,
            };
            poolList.push(data);
        }

        var data = {
            provider: "IOTU", // Project name - Sushi

            provider_logo: "https://iotuswap.finance/images/icons/footerLogo.png", // Project logo, square, less than 100*100 px

            provider_URL: "https://iotuswap.finance/", // Project URL

            links: [
                // social media info

                {
                    title: "Twitter",
                    link: "https://twitter.com/iotu",
                },
            ],

            pools: poolList,
        };

        res.json(data);
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const allPairs = async(req, res) => {
    try {
        var start = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        var cond = {
            createdAt: { $gte: start, $lt: end },
            buytype: "add",
            status: "success",
        };

        var liqList = await liquityDB.aggregate([{
                $match: {},
            },
            {
                $project: {
                    _id: 1,
                    pairaddress: 1,
                    fromsymbol: 1,
                    tosymbol: 1,
                    poolamount: 1,
                    fromamount: 1,
                    toamount: 1,
                    createdAt: 1,
                },
            },
            {
                $group: {
                    _id: "$pairaddress",
                    fromamount: { $sum: "$fromamount" },
                    toamount: { $sum: "$toamount" },
                    fromsymbol: { $first: "$fromsymbol" },
                    tosymbol: { $first: "$tosymbol" },
                },
            },
        ]);

        var pairList = await pairlistDB.aggregate([{
            $match: {},
        }, ]);

        console.log("liqList", liqList);
        console.log("pairList", pairList);

        var x;
        var pairs = [];
        for (x in pairList) {
            var from = pairList[x].from;
            var to = pairList[x].to;
            var fromaddr = pairList[x].fromaddress;
            var toaddr = pairList[x].toaddress;
            var fromDeci = pairList[x].fromdecimal;
            var toDeci = pairList[x].todecimal;

            var quote_name = "";
            var quote_symbol = "";
            var quote_decimal = 6;
            var base_symbol = "";
            var base_decimal = "";
            var price = 0;
            var base_id = "";
            var base_name = "";
            var quote_volume = 0;
            var base_volume = 0;

            if (from == "trx") {
                var index1 = liqList.findIndex((val) => val.fromsymbol == "WTRX");
                if (index1 != -1) {
                    quote_name = "TRX";
                    quote_symbol = "TRX";
                    quote_decimal = 6;
                    quote_volume = liqList[index1].fromamount;
                    base_id = fromaddr;
                }
            } else if (from != "trx") {
                var index1 = liqList.findIndex((val) => val.fromsymbol == from);
                var index2 = liqList.findIndex((val) => val.tosymbol == from);

                if (index1 != -1) {
                    base_volume = liqList[index1].fromamount;
                    price = liqList[index1].fromrate;
                    base_symbol = from;
                    base_decimal = fromDeci;
                    base_name = from;
                }
                if (index2 != -1) {
                    base_volume = liqList[index2].toamount;
                    price = liqList[index2].torate;
                    base_symbol = to;
                    base_decimal = toDeci;
                    base_name = to;
                }
            }

            if (to == "trx") {
                var index1 = liqList.findIndex((val) => val.tosymbol == "WTRX");
                if (index1 != -1) {
                    quote_name = "TRX";
                    quote_symbol = "TRX";
                    quote_decimal = 6;
                    quote_volume = liqList[index1].toamount;
                    base_id = toddr;
                    base_name = to;
                }
            } else if (to != "trx") {
                var index1 = liqList.findIndex((val) => val.tosymbol == to);
                var index2 = liqList.findIndex((val) => val.fromsymbol == to);
                if (index1 != -1) {
                    base_volume = liqList[index1].toamount;
                    price = liqList[index1].torate;
                    base_symbol = to;
                    base_decimal = toDeci;
                }
                if (index2 != -1) {
                    base_volume = liqList[index2].fromamount;
                    price = liqList[index2].fromrate;
                    base_symbol = from;
                    base_decimal = fromDeci;
                }
            }

            var obj = {
                [base_id]: {
                    quote_id: 0,
                    quote_name: quote_name,
                    quote_symbol: quote_symbol,
                    quote_decimal: quote_decimal,
                    base_id: base_id,
                    base_name: base_name,
                    base_symbol: base_symbol,
                    base_decimal: base_decimal,
                    price: price,
                    quote_volume: quote_volume,
                    base_volume: base_volume,
                },
            };
            pairs.push(obj);
        }
        res.json(pairs);
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, errors: { messages: "Error on server" } });
    }
};

export const getSoonList = async(req, res) => {
    try {
        console.log("saran");
        var result = await comingpairDB.find({ status: "Active" });
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

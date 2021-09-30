//  import packages
import express from "express";

// import controllers
import * as frontCtrl from "../iswapcontrollers/front.controller";
import * as adminCtrl from "../iswapcontrollers/admin.controller";

const app = express();

module.exports = function(app) {

    app.route("/admin-login").post(adminCtrl.login);
    app.route("/get-contract").get(adminCtrl.getContract);
    app.route("/update-settings").post(adminCtrl.updateSettings);
    app.route("/get-staking").get(adminCtrl.getStaking);
    app.route("/get-pair-list").get(adminCtrl.getPairlist);
    app.route("/get-solo-list").get(adminCtrl.getSololist);
    app.route("/add-pair-token").post(adminCtrl.addPairtoken);
    app.route("/get-pair-value").post(adminCtrl.getPairvalue);
    app.route("/update-pair").post(adminCtrl.updatePair);
    app.route("/update-pool").post(adminCtrl.updatePool);
    app.route("/get-soon-value").post(adminCtrl.getSoonvalue);
    app.route("/coming-soon-pair").post(adminCtrl.CommingPair);
    app.route("/update-soon-pair").post(adminCtrl.UpdateComming);

    app.route("/add-pair").post(frontCtrl.addPair);
    app.route("/add-pool").post(frontCtrl.addPool);
    app.route("/gettoken").get(frontCtrl.getToken);
    app.route("/gettoken1").get(frontCtrl.getToken1);
    app.route("/gettokenCount").get(frontCtrl.gettokenCount);
    app.route("/addToken").post(frontCtrl.addToken);
    app.route("/update-liquidities").post(frontCtrl.updateLiquidities);
    app.route("/get-pairs/:market").get(frontCtrl.getPairs);
    app.route("/get-lplist").get(frontCtrl.getLPToken);
    app.route("/update-balance").post(frontCtrl.updateBalance);
    app.route("/get-assets").get(frontCtrl.getAssets);
    app.route("/add-referal").post(frontCtrl.addReferal);
    app.route("/get-referal").get(frontCtrl.getReferal);
    app.route("/get-settings").get(frontCtrl.getSettings);
    app.route("/add-liquity").post(frontCtrl.addLiquity);
    app.route("/get-liquity-list/:market").get(frontCtrl.getLiquitylist);
    app.route("/get-charts").get(frontCtrl.getCharts);
    app.route("/get-pair-details").get(frontCtrl.getPairetails);
    app.route("/get-pair-stats").get(frontCtrl.getPairstats);
    app.route("/update-liqudity").post(frontCtrl.updateLiqudity);
    app.route("/get-total").get(frontCtrl.getTotal);
    app.route("/get-transaction-list").get(frontCtrl.getTransactionlist);
    app.route("/get-soon-list").get(frontCtrl.getSoonList);

    app.route("/v1/swap").get(frontCtrl.Swaplist);
    app.route("/v1/swap-list").get(frontCtrl.Swaplists);
    app.route("/v1/yield-forming").get(frontCtrl.yieldForming);
    app.route("/v1/all-pairs").get(frontCtrl.allPairs);
}

// export default app;
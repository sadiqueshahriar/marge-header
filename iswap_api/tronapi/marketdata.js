// tronweb
import express from 'express';
import TronWeb from "tronweb";
import TronGrid from "trongrid";
const app = express();
// import modal
import PairListNew from "../iswapmodels/PairListNew"

const tronWeb = new TronWeb({
    fullHost: 'http://api.trongrid.io',
    eventServer: 'https://api.trongrid.io'
})

const tronGrid = new TronGrid(tronWeb)

var current_date = new Date();
var timeToStart = current_date.getTime() / 1000;

var lastTimerTrigger = timeToStart % 600; // 600 seconds (10 minutes)
var nextTimerTrigger = 600 - lastTimerTrigger;

setTimeout(function() {
    setInterval(getContractPairData, 600*1000);
    getContractPairData();
}, nextTimerTrigger*1000);

async function getContractPairData() {
    let contractAddress = "TJL9Tj2rf5WPUkaYMzbvWErn6M8wYRiHG7";

    const options = {
        event_name: "PairCreated",
        limit: 100,
        // min_timestamp: Date.now() - 600000000, // from a minute in the past to go on
        order_by: "timestamp,asc"
    };

    // get contract event data
    const pairList = await tronGrid.contract.getEvents(contractAddress, options).then(result => {
        result.data = result.data.map(tx => {
            tx.result.to_address = tronWeb.address.fromHex(tx.result.dst); // get the original address
            tx.result.from_address = tronWeb.address.fromHex(tx.result.src); // get the original address
            return tx;
        });
        // prepared event data
        // res.send(JSON.stringify(result));

        result.data.forEach(async function(data) {
            const list = await PairListNew.find({"pair": tronWeb.address.fromHex(data.result.pair)});
            if(list.length) {
                console.log('already exist');
            } else {
                
                console.log('not exist')
                var saveData ={
                    token0:tronWeb.address.fromHex(data.result.token0),
                    token0_hex:data.result.token0,
                    token1:tronWeb.address.fromHex(data.result.token1),
                    token1_hex:data.result.token1,
                    index_no:data.result.index,
                    pair:tronWeb.address.fromHex(data.result.pair),
                    pair_hex:data.result.pair,
                };
                let newData = new PairListNew(saveData);
                newData.save();

            }
        })

    }).catch(err => console.error("getpairs -> ", err.response));
}

//export default pairDetails;


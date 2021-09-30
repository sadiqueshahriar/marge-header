import TronWeb from 'tronweb';


// const TronWeb = require("tronweb");
// const fullNode = "https://api.trongrid.io";
// const solidityNode = "https://api.trongrid.io";
// const eventServer = "https://api.trongrid.io";
// const privateKey = process.env.VUE_APP_SHASTA_PRIVATE_KEY;
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

const tronWebInstance = {
    loggedIn: false,
    tronWeb: null,
    contract: null,
    loaded: false,
    loading: null,
    tron: null,
};

const tronWebChk = {
    installed: false,
    loggedIn: false,
    account: null
};

const setState = null;

const tron = {
    tronWeb: false,
    auth: false,
    account: ''
}

function pollTronLink(maxTries, pollInterval) {
    return new Promise((resolve) => {
        let tries;
        const timer = setInterval(() => {
            if (window.tronWeb) {
                // Logged in with TronLink
                clearInterval(timer);
                tron.tronWeb = !!window.tronWeb;

                setTimeout(function chechAuth() {
                    tron.auth = window.tronWeb && window.tronWeb.ready;
                    console.log("jsjsjsjs", tron)
                    if (!tron.auth) setTimeout(chechAuth, 200);
                    else tron.account = window.tronWeb.defaultAddress.base58;
                    window.tronWeb.on('addressChanged', function() {
                        tron.account = window.tronWeb.defaultAddress.base58;
                    });
                }, 200);
                console.log("jsauth", tron.auth)
                resolve({ tron: tron, tronWeb: window.tronWeb, loggedIn: true });
            }
            if (tries >= maxTries) {
                // No TronLink - Create TronWeb instance for call methods
                const tronApi = new TronWeb({
                    fullHost: process.env.VUE_APP_FULL_HOST,
                    privateKey: process.env.VUE_APP_PRIVATE_KEY,
                });
                clearInterval(timer);
                resolve({ tron: null, tronWeb: tronApi, loggedIn: false });
            }
        }, pollInterval);
    });
}

export async function initTronWeb() {
    const { tron, tronWeb, loggedIn } = await pollTronLink(5, 100);
    tronWebInstance.tronWeb = tronWeb;
    tronWebInstance.loggedIn = loggedIn;
    tronWebInstance.tron = tron;
    tronWebInstance.contract = await tronWebInstance.tronWeb
        .contract().at("TXjGFNPUrHDcN8Gp5aGMN6Cr3PUtBHwzrW");
    tronWebInstance.loaded = true;
}

export async function getTronWebInstance() {
    if (tronWebInstance.loaded) return tronWebInstance;
    if (!tronWebInstance.loading) {
        tronWebInstance.loading = initTronWeb();
    }
    await tronWebInstance.loading;
    return tronWebInstance;
}

export async function tronLinkcheck() {
    const { tron, tronWeb, contract, loggedIn } = await getTronWebInstance();
    // if (!loggedIn) return false;
    if (!loggedIn) {
        this.message = 'You need to be logged in with TronLink to Use ISWAP';
        return;
    }

    return tronLink = { tron: tron, tronWeb: tronWeb, contract: contract, loggedIn: loggedIn };
}

// export async function getTronWeb() {
//     return new Promise((resolve, reject) => {
//         // eslint-disable-next-line prefer-promise-reject-errors
//         window.tronWeb ? resolve(window.tronWeb) : reject('TronWeb not found');
//     });
// }

// export async function awaitTx(tx) {

//     return new Promise((resolve, reject) => {
//         this.getTronWeb().then(tronWeb => {
//             let i = 0;
//             (async function chech() {
//                 // eslint-disable-next-line no-console
//                 console.log('txtxtxtxtx!', tx)
//                 try {
//                     const getTrans = await tronWeb.trx.getTransaction(tx);

//                     if (getTrans && getTrans.ret && getTrans.ret[0] &&
//                         getTrans.ret[0].contractRet && getTrans.ret[0].contractRet === "SUCCESS") {
//                         resolve(getTrans)
//                     } else if (i++ < 300) {
//                         setTimeout(chech, 1000)
//                     } else {
//                         reject(new Error('Transaction not found'))
//                     }

//                     // }, reject);
//                 } catch (err) {
//                     // eslint-disable-next-line no-console
//                     console.log('errerrerr', err)
//                     if (i++ < 300) {
//                         setTimeout(chech, 1000)
//                     } else {
//                         reject(new Error('Transaction not found'))
//                     }
//                 }
//             })();
//         }, reject);
//     });

// }
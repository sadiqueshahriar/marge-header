const TronWeb = require("tronweb");
const fullNode = "https://api.trongrid.io";
const solidityNode = "https://api.trongrid.io";
const eventServer = "https://api.trongrid.io";
// const privateKey = process.env.VUE_APP_SHASTA_PRIVATE_KEY;
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

// export default ({ app }, inject) => {
//   inject('hello', msg => console.log(`Hello ${msg}!`));
// };


import Vue from 'vue'

Vue.mixin({

    data() {
        return {
            tron: {
                tronWeb: false,
                auth: false,
                account: ''
            }
        };
    },
    created() {
        const self = this;
        let tries = 0;

        setTimeout(function initTimer() {
            if (!tronWeb) return ++tries < 50 ? setTimeout(initTimer, 100) : null;

            self.tron.tronWeb = !!tronWeb;
            tronWeb.on('addressChanged', function() {
                self.tron.account = tronWeb.defaultAddress.base58;
                // console.log(tronWeb.defaultAddress)
            });

            setTimeout(function chechAuth() {
                self.tron.auth = tronWeb && tronWeb.ready;
                if (!self.tron.auth) setTimeout(chechAuth, 200);
                else self.tron.account = tronWeb.defaultAddress.base58;
            }, 200);
        }, 100);
    },
    methods: {
        getTronWeb() {
            return new Promise((resolve, reject) => {
                // eslint-disable-next-line prefer-promise-reject-errors
                tronWeb ? resolve(tronWeb) : reject('TronWeb not found');
            });
        },
        awaitTx(tx) {

            return new Promise((resolve, reject) => {
                this.getTronWeb().then(tronWeb => {
                    let i = 0;
                    (async function chech() {
                        // eslint-disable-next-line no-console
                        console.log('txtxtxtxtx!', tx)
                        try {
                            const getTrans = await tronWeb.trx.getTransaction(tx);

                            if (getTrans && getTrans.ret && getTrans.ret[0] &&
                                getTrans.ret[0].contractRet && getTrans.ret[0].contractRet === "SUCCESS") {
                                resolve(getTrans)
                            } else if (i++ < 300) {
                                setTimeout(chech, 1000)
                            } else {
                                reject(new Error('Transaction not found'))
                            }

                            // }, reject);
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.log('errerrerr', err)
                            if (i++ < 300) {
                                setTimeout(chech, 1000)
                            } else {
                                reject(new Error('Transaction not found'))
                            }
                        }
                    })();
                }, reject);
            });

        }
    }
})
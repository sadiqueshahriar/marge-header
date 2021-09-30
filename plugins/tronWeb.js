export default ({ $axios }, inject) => {
    const Tron = {
        isInstalled() {
            return !!window.tronWeb
        },
        isLoggedIn() {
            return !!window.tronWeb && !!window.tronWeb.ready
        },
        accountAddress() {
            return window.tronWeb.defaultAddress.base58
        },
        createReturnMessage() {
            return { code: 0, message: 'success', result: null, error: null, account: null }
        },
        async login() {
            const returnMessage = this.createReturnMessage()
            if (!this.isInstalled()) {
                returnMessage.code = -1
                returnMessage.message = 'Tron extension not Installed.'
                return returnMessage
            }
            if (!this.isLoggedIn()) {
                returnMessage.code = -2
                returnMessage.message = 'Tron extension not LoggedIn.'
                return returnMessage
            }

            const mes = 'intercroneswap.com'
            let signToken = null
            try {
                signToken = await window.tronWeb.trx.sign(window.tronWeb.toHex(mes))
            } catch (error) {
                returnMessage.code = -3
                returnMessage.message = 'Tron extension sign error.'
                returnMessage.error = error
                return returnMessage
            }

            const account = {
                userId: this.accountAddress(),
                password: signToken
            }

            try {
                // returnMessage.result = await $axios.$post('/tronLogin', account)
                returnMessage.account = account;
            } catch (error) {
                returnMessage.code = -4
                returnMessage.message = 'API TronLogin error.'
                returnMessage.error = error
            }
            return returnMessage
        },
        async getBalance() {
            const returnMessage = this.createReturnMessage()
            if (!this.isInstalled()) {
                returnMessage.code = -1
                returnMessage.message = 'Tron extension not Installed.'
                return returnMessage
            }
            if (!this.isLoggedIn()) {
                returnMessage.code = -2
                returnMessage.message = 'Tron extension not LoggedIn.'
                return returnMessage
            }

            try {
                let balance = await window.tronWeb.trx.getBalance(this.accountAddress())
                    // let balance = await window.tronWeb.trx.getUnconfirmedBalance(
                    //   this.accountAddress()
                    // )
                balance = balance / 1000000
                returnMessage.result = balance
            } catch (error) {
                returnMessage.code = -3
                returnMessage.message = 'Tron extension sign error.'
                returnMessage.error = error
                return returnMessage
            }
            return returnMessage
        },
        async sendTransaction(toAddress, amount) {
            const returnMessage = this.createReturnMessage()
            if (!this.isInstalled()) {
                returnMessage.code = -1
                returnMessage.message = 'Tron extension not Installed.'
                return returnMessage
            }
            if (!this.isLoggedIn()) {
                returnMessage.code = -2
                returnMessage.message = 'Tron extension not LoggedIn.'
                return returnMessage
            }

            try {
                const resp = await window.tronWeb.trx.sendTransaction(
                    toAddress,
                    amount * 1000000
                )
                console.log('tronWeb sendTransaction resp: ', resp)
                if (resp.result) {
                    let balance = await window.tronWeb.trx.getBalance(
                            this.accountAddress()
                        )
                        // let balance = await window.tronWeb.trx.getUnconfirmedBalance(
                        //   this.accountAddress()
                        // )
                    balance = balance / 1000000
                    resp.balance = balance
                    returnMessage.result = resp
                } else {
                    returnMessage.code = -5
                    returnMessage.message = 'Tron extension sendTransaction fail.'
                }
            } catch (error) {
                returnMessage.code = -4
                returnMessage.message = 'Tron extension sendTransaction error.'
                returnMessage.error = error
                return returnMessage
            }
            return returnMessage
        },
        async tronChk() {
            const FOUNDATION_ADDRESS = "TXjGFNPUrHDcN8Gp5aGMN6Cr3PUtBHwzrW"
            await new Promise(resolve => {
                const tronWebState = {
                    installed: !!window.tronWeb,
                    loggedIn: window.tronWeb && window.tronWeb.ready,
                    // account: window.tronWeb.defaultAddress.base58
                };

                if (tronWebState.installed) {
                    this.setState = {
                        tronWebChk: tronWebState
                    };

                    return resolve();
                }

                let tries = 0;

                const timer = setInterval(() => {
                    if (tries >= 10) {
                        const TRONGRID_API = 'https://api.trongrid.io';

                        window.tronWeb = new TronWeb(
                            TRONGRID_API,
                            TRONGRID_API,
                            TRONGRID_API,
                            API_KEY
                        );

                        this.setState = {
                            tronWebChk: {
                                installed: false,
                                loggedIn: false
                            }
                        };

                        clearInterval(timer);
                        return resolve();
                    }

                    tronWebState.installed = !!window.tronWeb;
                    tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                    if (!tronWebState.installed)
                        return tries++;

                    this.setState = {
                        tronWebChk: tronWebState
                    };

                    resolve();
                }, 100);
            });

            // if (!this.setState.tronWebChk.loggedIn) {
            //     // Set default address (foundation address) used for contract calls
            //     // Directly overwrites the address object as TronLink disabled the
            //     // function call
            //     window.tronWeb.defaultAddress = {
            //         hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
            //         base58: FOUNDATION_ADDRESS
            //     };

            //     window.tronWeb.on('addressChanged', () => {
            //         if (this.state.tronWeb.loggedIn)
            //             return;

            //         this.setState = {
            //             tronWebChk: {
            //                 installed: true,
            //                 loggedIn: true
            //             }
            //         };
            //     });
            // }
            // await Utils.setTronWeb(window.tronWeb);
            return this.setState

        },
        async allsequence() {
            const returnMessage = this.createReturnMessage()
            if (!this.isInstalled()) {
                returnMessage.code = -0
                returnMessage.message = 'TronLink extension not Installed.'
                return returnMessage
            }
            if (!this.isLoggedIn()) {
                returnMessage.code = -1
                returnMessage.message = 'TronLink extension not LoggedIn.'
                return returnMessage
            }

            if (!this.accountAddress()) {
                returnMessage.code = -1
                returnMessage.message = 'TronLink extension issue.'
                return returnMessage
            } else {
                returnMessage.code = 1
                returnMessage.message = 'TronLink Logged in.'
                try {
                    returnMessage.account = this.accountAddress()
                } catch (error) {
                    returnMessage.code = -2
                    returnMessage.message = 'TronLink address not connected'
                    returnMessage.error = error
                }
                // returnMessage.account = this.accountAddress()
                return returnMessage
            }
        }
    }
    inject('tron', Tron)
}

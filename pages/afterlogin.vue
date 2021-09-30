

<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"
            ><img src="~/assets/images/logo.png" alt=""
          /></a>
          <div class="d-flex align-items-center">
            <form class="pe-2 d-block d-sm-none">
              <button class="custom-btn" type="submit">Register</button>
            </form>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src="~/assets/images/menu.svg" alt="" style="width: 35px" />
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <span>Dashboard</span>
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Assets</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Ref</a>
                  </li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Trading
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Exchange</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Liquidity</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"> Cash balance</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Earn
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Staking</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Solopool</a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  >Market
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#"
                  >Games
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="#">FAQs </a>
              </li>
            </ul>
            <ul class="navbar-nav align-items-center">
              <li class="nav-item">
                <button class="nav-link button" href="#">
                  TJ4NcCZy...ossA
                </button>
              </li>
              <li class="nav-item d-none d-sm-block">
                <form class="px-2"></form>
              </li>

              <li class="nav-item"></li>
              <li class="nav-item d-flex align-items-center">
                <b-button
                  id="show-btn"
                  class="btn header__cog"
                  @click="showModal"
                >
                  <img src="~/assets/images/cog.svg" />
                </b-button>
              </li>
              <li class="nav-item d-flex align-items-center">
                <b-button
                  id="show-btn"
                  class="btn header__bars"
                  @click="showModal2"
                >
                  <img src="~/assets/images/bars.svg" />
                </b-button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <b-modal ref="my-modal1" hide-footer class="modal-header">
      <div class="modalbody">
        <div class="dropdown-con">
          <div class="dropdown-con__section">Transaction Settings</div>
          <div class="dropdown-con__label">Slippage tolerance</div>
          <div class="dropdown-con__inps">
            <button class="btn btn_inppad btn_white">0.1%</button
            ><button class="btn btn_inppad primary">0.5%</button
            ><button class="btn btn_inppad btn_white">1%</button
            ><input size="2" placeholder="other" class="inp" />
          </div>
          <div class="dropdown-con__label">Transaction deadline</div>
          <div class="dropdown-con__inps">
            <input value="20" size="2" class="inp" /><span>&nbsp;minutes</span>
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal ref="my-modal2" hide-footer class="modal-header">
      <ul class="dropdown-nav">
        <div class="dropdown-nav__mobile">
          <li>
            <a href="#"><img src="~/assets/images/assets.svg" /> Assets</a>
          </li>
          <li>
            <a href="#"><img src="~/assets/images/ref.svg" /> Ref</a>
          </li>
          <li>
            <a href="#"
              ><img src="~/assets/images/exchange-icon.svg" /> Exchange</a
            >
          </li>
          <li>
            <a href="#"
              ><img src="~/assets/images/liquidity.svg" /> Liquidity</a
            >
          </li>
          <li>
            <a href="#"><img src="~/assets/images/staking.svg" /> LP Staking</a>
          </li>
          <li>
            <a href="#"><img src="~/assets/images/solopool.png" /> Solopool</a>
          </li>
          <li>
            <a href="#"><img src="~/assets/images/charts-pie.svg" />Market</a>
          </li>
          <li>
            <a href="#"><img src="~/assets/images/game_icon.png" />Games</a>
          </li>
          <li>
            <a
              href="https://intercroneworld.gitbook.io/intercrone/"
              target="_blank"
              ><img src="~/assets/images/faq.svg" />FAQs</a
            >
          </li>
          <div class="separator"></div>
        </div>
        <li>
          <a href="https://t.me/intercroneworld" target="_blank"
            ><img src="~/assets/images/tele_icon.png" /> Telegram</a
          >
        </li>
        <li>
          <a href="https://www.facebook.com/InterCrone" target="_blank"
            ><img src="~/assets/images/fb_icon.png" /> Facebook</a
          >
        </li>
        <li>
          <a href="https://twitter.com/IntercroneWorld" target="_blank"
            ><img src="~/assets/images/tw_icon.png" /> Twitter</a
          >
        </li>
        <li>
          <a href="https://www.youtube.com/c/InterCroneWorld" target="_blank"
            ><img src="~/assets/images/youtube_icon.png" /> Youtube</a
          >
        </li>
        <li>
          <a href="https://www.binance.org/en/bridge" target="_blank"
            ><img src="~/assets/images/binance.png" /> Binance</a
          >
        </li>
      </ul>
    </b-modal>
  </div>
</template>
<script>
// import * as tronWebUtils from '@/plugins/tronWebUtils';
// import { POSITION, TYPE } from 'vue-toastification'
export default {
  // data() {
  //   return {
  //     tronChk: {
  //       installed: false,
  //       loggedIn: false,
  //       account: '',
  //     },
  //     visible: {
  //       modal: '',
  //       menu: false,
  //       search: '',
  //     },
  //     userId: 'Connect to Wallet',
  //   }
  // },
  // async beforeMount() {
  //   // this.tronLink = await tronWebUtils.tronLinkcheck();
  //   // this.tron = this.tronLink.tron;
  //   // console.log("jjjjjjjjjjjjjj",this.tron)
  //   // this.interval = setInterval(() => this.getAddressId(), 1000);
  //   // const { result: address } = await this.$tron.accountAddress()
  //   // console.log('address: ', address)
  // },
  // async mounted() {
  //   await this.allsequenceCheck()
  // },
  // async created() {},

  methods: {
    showModal() {
      this.$refs['my-modal1'].show()
    },
    hideModal() {
      this.$refs['my-modal1'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal1'].toggle('#toggle-btn')
    },

    showModal2() {
      this.$refs['my-modal2'].show()
    },
    hideModal2() {
      this.$refs['my-modal2'].hide()
    },
    toggleModal2() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal2'].toggle('#toggle-btn')
    },

    // async tronCheck() {
    //   this.tronChk = await this.$tron.tronChk()
    //   console.log('loggedin?', this.tronChk)
    // },
    // async tronCheck() {
    //   this.tronChk = await this.$tron.tronChk()
    //   console.log('loggedin?', this.tronChk)
    // },

    // async allsequenceCheck() {
    //   const { code, message, account } = await this.$tron.allsequence()
    //   switch (code) {
    //     case -0:
    //       this.$toast(message, {
    //         type: TYPE.WARNING, // or "success", "error", "default", "info" and "warning"
    //         position: POSITION.BOTTOM_RIGHT,
    //       })
    //       break
    //     case -1:
    //       this.$toast(message, {
    //         type: TYPE.WARNING,
    //         position: POSITION.BOTTOM_RIGHT,
    //       })
    //       break
    //     case 1:
    //       this.$toast(message, {
    //         type: TYPE.SUCCESS,
    //         timeout: 1000,
    //         position: POSITION.BOTTOM_RIGHT,
    //       })
    //       this.userId = account
    //       break
    //     case -2:
    //       this.$toast(message, {
    //         type: TYPE.ERROR,
    //         position: POSITION.BOTTOM_RIGHT,
    //       })
    //       this.userId = account
    //       break

    //     default:
    //       break
    //   }

    //   const interval = setInterval(() => {
    //     console.log('tronlink: ', message)
    //     if (code === 1) {
    //       clearInterval(interval)
    //     }
    //   }, 10000)
    // },
  },
}
</script>
<style scoped>
.button {
  background-color: #fff;
  border-radius: 10px !important;
  padding: 8px 30px !important;
  color: rgb(70, 69, 69) !important;
  font-size: 16px !important;
  line-height: 24px !important;
  text-transform: capitalize !important;
  font-weight: 400 !important;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.header__cog {
  padding: 9px 9px 4px 9px;
  background-color: #fff;
  border-radius: 10px;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

img {
  max-width: 100%;
}
.header__bars {
  padding: 9px 9px 4px 9px;
  background-color: #fff;
  border-radius: 10px;
  margin-left: 10px !important;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.modal-header {
  border-bottom: 0 none !important;
}
.dropdown-con__section {
  font-weight: bold;
  padding: 8px 0;
}

.dropdown-con__inps {
  display: flex;
  margin: 0 -5px 10px;
  align-items: center;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn.primary {
  background-image: linear-gradient(90deg, #ffb807, #ffea00);
  border-radius: 50px;
  padding: 8px 30px;
  color: #0a0a1e;
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;
  font-weight: 400;
}
.dropdown-con__inps > * {
  margin: 0 5px;
}
.btn_inppad {
  padding: 9px;
}
.btn_white {
  border-color: #adbcc7;
  background: #fff;
  color: #000;
}
button,
input {
  overflow: visible;
}

.inp {
  background: #fff;
  border: 1px solid #adbcc7;
  padding: 8px 9px 9px;
  display: inline-block;
  border-radius: 5px;
  transition: 0.2s;
}
body,
select,
textarea,
input,
button {
  font: 14px/1.3 'Poppins', sans-serif;
}
.dropdown-con__label {
  padding: 8px 0 12px;
}

.dropdown-nav a {
  display: flex;
  align-items: center;
  color: #000;
  padding: 8px 0;
  font-size: 16px;
}

.dropdown-nav {
  list-style: none;
}
.dropdown-nav__mobile {
  display: none;
}
.dropdown-nav img {
  margin-right: 15px;
  width: 24px;
}
.modal-content {
  margin-left: 78% !important;
}
@media (max-width: 599.98px) {
  .header {
    flex-direction: column;
  }
}
@media (max-width: 599.98px) {
  .header__logo {
    text-align: center;
    padding: 0 0 30px 0;
  }
}
@media (max-width: 1199.98px) {
  .header__nav {
    display: none;
  }
}
@media (max-width: 599.98px) {
  .header__tools {
    justify-content: center;
  }
}
@media (max-width: 599.98px) {
  .dropdown-nav {
    top: 130px;
  }
}
@media (max-width: 1199.98px) {
  .dropdown-nav__mobile {
    display: block;
  }
}
</style>
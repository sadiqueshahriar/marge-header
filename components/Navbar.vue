

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
                <b-button
                  id="show-btn"
                  @click="showModal"
                  class="nav-link button"
                  href="#"
                  >Connect to Wallet</b-button
                >
              </li>
              <li class="nav-item d-none d-sm-block">
                <form class="px-2"></form>
              </li>

              <li class="nav-item"></li>
              <li class="nav-item d-flex align-items-center">
                <span style="color: #5e6673">|</span>
              </li>
              <li class="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <b-modal ref="my-modal" hide-footer class="content">
      <div class="modal-body">
        <div class="modal__title">Connect a wallet</div>
        <div class="modal__body">
          <ul class="providers">
            <li>
              <img src="~assets/images/tronlink.svg" class="providers__icon" />
              <div class="providers__name">TronLink</div>
              <div class="providers__status">Disconnected</div>
            </li>
          </ul>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
// import * as tronWebUtils from '@/plugins/tronWebUtils';
import { POSITION, TYPE } from 'vue-toastification'
export default {
  data() {
    return {
      tronChk: {
        installed: false,
        loggedIn: false,
        account: '',
      },
      visible: {
        modal: '',
        menu: false,
        search: '',
      },
      userId: 'Connect to Wallet',
    }
  },
  async beforeMount() {
    // this.tronLink = await tronWebUtils.tronLinkcheck();
    // this.tron = this.tronLink.tron;
    // console.log("jjjjjjjjjjjjjj",this.tron)
    // this.interval = setInterval(() => this.getAddressId(), 1000);
    // const { result: address } = await this.$tron.accountAddress()
    // console.log('address: ', address)
  },
  async mounted() {
    await this.allsequenceCheck()
  },
  async created() {},

  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    async tronCheck() {
      this.tronChk = await this.$tron.tronChk()
      console.log('loggedin?', this.tronChk)
    },

    async allsequenceCheck() {
      const { code, message, account } = await this.$tron.allsequence()
      switch (code) {
        case -0:
          this.$toast(message, {
            type: TYPE.WARNING, // or "success", "error", "default", "info" and "warning"
            position: POSITION.BOTTOM_RIGHT,
          })
          break
        case -1:
          this.$toast(message, {
            type: TYPE.WARNING,
            position: POSITION.BOTTOM_RIGHT,
          })
          break
        case 1:
          this.$toast(message, {
            type: TYPE.SUCCESS,
            timeout: 1000,
            position: POSITION.BOTTOM_RIGHT,
          })
          this.userId = account
          break
        case -2:
          this.$toast(message, {
            type: TYPE.ERROR,
            position: POSITION.BOTTOM_RIGHT,
          })
          this.userId = account
          break

        default:
          break
      }

      const interval = setInterval(() => {
        console.log('tronlink: ', message)
        if (code === 1) {
          clearInterval(interval)
        }
      }, 10000)
    },
  },
}
</script>
<style scoped>
.modal__body {
  padding: 11px 28px 28px;
  margin-top: 18px;
}
.providers {
  list-style: none;
  padding: 0;
}
.providers__status {
  color: #dc1427;
  font-size: 16px;
}
.providers__name {
  padding: 0 10px;
  flex: 1 0;
  font-size: 20px;
}
.button {
  background-image: linear-gradient(90deg, #ffb807, #ffea00);
  border-radius: 50px !important;
  padding: 8px 30px !important;
  color: #0a0a1e !important;
  font-size: 16px !important;
  line-height: 24px !important;
  text-transform: capitalize !important;
  font-weight: 400 !important;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

.providers li {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px !important;
  padding: 20px;
  align-items: center;
  margin: 0 0 15px 0;
  transition: 0.2s;
  cursor: pointer;
}
.providers:hover {
  border: 1px solid red;
}
.modal__title {
  font-weight: bold;
  font-size: 24px;
  padding: 28px 28px 0;
  margin-top: -108px !important;
}

.providers__icon {
  max-height: 32px !important;
  max-width: 32px !important;
}
</style>
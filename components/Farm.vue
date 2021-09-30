<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="banner">
    <div class="container">
      <div class="banner-heading">
        <h2>Farms</h2>
        <p>
          Stake LP tokens to earn. <br>
          <a href="#">Apply for a LP-Staking<i class="fa fa-arrow-right"></i></a>
        </p>
      </div>
    </div>
  </div>
  <!-- _____[TABLE]_______ -->
  <div class="container">
    <div class="table-common">
      <div class="table-common-header">
        <div class="row">
          
          <div class="col-md-2 col-6">
            <label class="switchSmall2 m5">
              <input type="checkbox" checked="">
              <small></small>
              <p>Staked only</p>
            </label>
          </div>
          <div class="col-md-3 col-12">
            <div class="tab-slider-nav">
              <ul class="tab-slider-tabs" :class="{'slide': tab_slider == 'tab2'}">
                <li class="tab-slider-trigger" :class="{'active': tab_slider == 'tab1'}" rel="tab1" @click="tabSlider('tab1')" >Live</li>
                <li class="tab-slider-trigger" :class="{'active': tab_slider == 'tab2'}" rel="tab2" @click="tabSlider('tab2')">Finished</li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="input-group-custom">
              <div class="select-filter">
                <label for="" class="filter-label">SORT BY</label>
                <select id="" name="" class="custom-select">
                  <option value="" selected="">Hot</option>
                  <option value="">ARR</option>
                  <option value="">Earned</option>
                  <option value="">Total stacked</option>
                </select>
              </div>
              <div class="search-filter">
                <label for="" class="filter-label">Search</label>
                <input type="text" placeholder="Search Pools">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-slider-container">
        <div v-if="tab_slider == 'tab1'" id="tab1" class="tab-slider-body">
          <div class="table-grid">
            <div id="accordionExample" class="accordion">
              <div class="accordion-item">
                <h2 id="headingOne" class="accordion-header">
                  <button class="accordion-button" :class="{'collapsed': tab != 'first'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="showToggle('first')">
                    <div class="grid-row">
                      <div class="grid-col">
                        <div class="main-data">
                          <div class="coin-img">
                            <img src="../assets/images/soloicr.png" alt="">
                            <img src="../assets/images/btc.png" class="img-icon" alt="">
                          </div>
                          <div class="coin-name">
                            <h3>TokenA-TokenB</h3>
                          </div>
                        </div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">Earned</div>
                        <div class="dull-data">0</div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">APR</div>
                        <div class="strong-data">83.67%</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">Liquidity</div>
                        <div class="strong-data">$770,509,475</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">End at</div>
                        <div class="strong-data">20.11.2021 14:00</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="detail-btn">Details</div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" :class="{'collapse': tab != 'first'}" class="accordion-collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-6 col-12" style="
    margin-top: 18px;
">
                        <div class="row">
                          <div class="col-md-6 col-12">
                            <div class="token-details">
                              <div class="detail-link">
                                <a href="#">See Token Info
                                  <i class="fa fa-external-link"></i></a>
                              </div>
                              <div class="detail-link">
                                <a href="#">View Project Site
                                  <i class="fa fa-external-link"></i></a>
                              </div>
                              <div class="detail-link">
                                <a href="#">View Contract
                                  <i class="fa fa-external-link"></i></a>
                              </div>
                              
                            </div>
                          </div>
                          <div class="col-md-6 col-12">
                            <div class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                " style="
    padding-top: 5px;
    padding-bottom: 5px;
">
                              <div class="normal-text">Staking fee:</div>
                              <div class="normal-text"><b>3%</b></div>
                            </div>
                            <div class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                " style="
    padding-top: 5px;
    padding-bottom: 5px;
">
                              <div class="normal-text">
                                Referral payments:
                              </div>
                              <div class="normal-text"><b>15%</b></div>
                            </div>
                            <div class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                " style="padding-top: 2px;padding-bottom: 2px;">
                              <div class="normal-text">Started at</div>
                              <div class="normal-text">
                                <b>29.7.2021, 12:41:39</b>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-12">
                        <div class="profit-box" style="
    margin-top: 8px;
">
                          <div class="profit-heading">Reward Info</div>
                          <div class="profit-data">
                            <div>
                              <div class="profit-number">64.4756876 ICR</div>
                              <div class="dull-data-small">0 USD</div>
                            </div>
                            <button class="profit-btn harvest block">Harvest</button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-12">
                        <div class="profit-box" style="
    margin-top: 8px;
">
                          <div class="profit-heading">Start Staking</div>
                          <div class="profit-data">
                            <button class="profit-btn w-100">
                              Connect Wallet
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingTwo" class="accordion-header">
                  <button :class="{'collapsed': tab != 'second'}" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" @click="showToggle('second')" >
                    <div class="grid-row">
                      <div class="grid-col">
                        <div class="main-data">
                          <div class="coin-img">
                            <img src="../assets/images/soloicr.png" alt="">
                            <img src="../assets/images/logob.png" class="img-icon" alt="">
                          </div>
                          <div class="coin-name">
                            <h3>TokenA-TokenB</h3>
                          </div>
                        </div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">Earned</div>
                        <div class="dull-data">0</div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">APR</div>
                        <div class="strong-data">83.67%</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">Liquidity</div>
                        <div class="strong-data">$770,509,475</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">End at</div>
                        <div class="strong-data">20.09.2021 14:00</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="detail-btn">Details</div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div id="collapseTwo" :class="{'collapse': tab != 'second'}" class="accordion-collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-4 col-12">
                        <div class="token-details">
                          <div class="detail-link">
                            <a href="#">Get CAKE-BNB LP
                              <i class="fa fa-external-link"></i></a>
                          </div>
                          <div class="detail-link">
                            <a href="#">View Contract
                              <i class="fa fa-external-link"></i></a>
                          </div>
                          <div class="detail-link">
                            <a href="#">See Pair Info
                              <i class="fa fa-external-link"></i></a>
                          </div>
                          <div class="auto-btn">
                            <a href="#">
                              <i class="fa fa-sync"></i> &nbsp;&nbsp; Core
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 col-12">
                        <div class="profit-box">
                          <div class="profit-heading">Cake Earned</div>
                          <div class="profit-data">
                            <div class="profit-number">0</div>
                            <button class="profit-btn" disabled="">
                              Harvest
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 col-12">
                        <div class="profit-box">
                          <div class="profit-heading">Start Stalking</div>
                          <div class="profit-data">
                            <button class="profit-btn w-100">
                              Connect Wallet
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tab_slider == 'tab2'" id="tab2" class="tab-slider-body">
          <h2 class="info-msg">These pools are no longer distributing rewards. Please unstake your tokens.</h2>
          <div class="table-grid">
            <div id="accordionExample" class="accordion">
              <div class="accordion-item">
                <h2 id="headingOne" class="accordion-header">
                  <button :class="{'collapsed': tab != 'third'}" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="showToggle('third')" >
                    <div class="grid-row">
                      <div class="grid-col">
                        <div class="main-data">
                          <div class="coin-img">
                            <img src="../assets/images/soloicr.png" alt="">
                            <img src="../assets/images/btc.png" class="img-icon-top" alt="">
                          </div>
                          <div class="coin-name">
                            <h3>CAKE-BNB</h3>
                          </div>
                        </div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">Earned</div>
                        <div class="dull-data">0</div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">APR</div>
                        <div class="strong-data">83.67%</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">Liquidity</div>
                        <div class="strong-data">$770,509,475</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">End at</div>
                        <div class="strong-data">20.10.2021 14:00</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="detail-btn">Details</div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div id="collapseOne" :class="{'collapse': tab != 'third'}" class="accordion-collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-6 col-12" style="
    margin-top: 18px;
">
                        <div class="row">
                          <div class="col-md-6 col-12">
                            <div class="token-details">
                              <div class="detail-link">
                                <a href="#">See Token Info
                                  <i class="fa fa-external-link"></i></a>
                              </div>
                              <div class="detail-link">
                                <a href="#">View Project Site
                                  <i class="fa fa-external-link"></i></a>
                              </div>
                              <div class="detail-link">
                                <a href="#">View Contract
                                  <i class="fa fa-external-link"></i></a>
                              </div>
                              
                            </div>
                          </div>
                          <div class="col-md-6 col-12">
                            <div class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                " style="
    padding-top: 5px;
    padding-bottom: 5px;
">
                              <div class="normal-text">Staking fee:</div>
                              <div class="normal-text"><b>3%</b></div>
                            </div>
                            <div class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                " style="
    padding-top: 5px;
    padding-bottom: 5px;
">
                              <div class="normal-text">
                                Referral payments:
                              </div>
                              <div class="normal-text"><b>15%</b></div>
                            </div>
                            <div class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                " style="padding-top: 2px;padding-bottom: 2px;">
                              <div class="normal-text">Started at</div>
                              <div class="normal-text">
                                <b>29.7.2021, 12:41:39</b>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-12">
                        <div class="profit-box" style="
    margin-top: 8px;
">
                          <div class="profit-heading">Reward Info</div>
                          <div class="profit-data">
                            <div>
                              <div class="profit-number">64.4756876 ICR</div>
                              <div class="dull-data-small">0 USD</div>
                            </div>
                            <button class="profit-btn harvest block">Harvest</button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-12">
                        <div class="profit-box" style="
    margin-top: 8px;
">
                          <div class="profit-heading">Start Staking</div>
                          <div class="profit-data">
                            <button class="profit-btn w-100">
                              Connect Wallet
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingTwo" class="accordion-header">
                  <button :class="{'collapsed': tab != 'forth'}" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" @click="showToggle('forth')" >
                    <div class="grid-row">
                      <div class="grid-col">
                        <div class="main-data">
                          <div class="coin-img">
                            <img src="../assets/images/soloicr.png" alt="">
                            <img src="../assets/images/logob.png" class="img-icon-top" alt="">
                          </div>
                          <div class="coin-name">
                            <h3>CAKE-BNB</h3>
                          </div>
                        </div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">Earned</div>
                        <div class="dull-data">0</div>
                      </div>
                      <div class="grid-col">
                        <div class="col-heading">APR</div>
                        <div class="strong-data">83.67%</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">Liquidity</div>
                        <div class="strong-data">$770,509,475</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="col-heading">End at</div>
                        <div class="strong-data">20.10.2021 14:00</div>
                      </div>
                      <div class="grid-col d-none d-md-block">
                        <div class="detail-btn">Details</div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div id="collapseTwo" :class="{'collapse': tab != 'forth'}" class="accordion-collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-4 col-12">
                        <div class="token-details">
                          <div class="detail-link">
                            <a href="#">Get CAKE-BNB LP
                              <i class="fa fa-external-link"></i></a>
                          </div>
                          <div class="detail-link">
                            <a href="#">View Contract
                              <i class="fa fa-external-link"></i></a>
                          </div>
                          <div class="detail-link">
                            <a href="#">See Pair Info
                              <i class="fa fa-external-link"></i></a>
                          </div>
                          <div class="auto-btn">
                            <a href="#">
                              <i class="fa fa-sync"></i> &nbsp;&nbsp; Core
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 col-12">
                        <div class="profit-box">
                          <div class="profit-heading">Cake Earned</div>
                          <div class="profit-data">
                            <div class="profit-number">0</div>
                            <button class="profit-btn" disabled="">
                              Harvest
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 col-12">
                        <div class="profit-box">
                          <div class="profit-heading">Start Stalking</div>
                          <div class="profit-data">
                            <button class="profit-btn w-100">
                              Connect Wallet
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: '',
      currentTab: '',
      tab_slider: 'tab1'
    }
  },
  methods: {
    showToggle(tab) {
      if(this.currentTab) {
        if(tab === this.currentTab) {
          this.tab = ''
          this.currentTab = ''
          return
        } else {
          this.tab = tab
          this.currentTab = tab
        }
      }
      this.tab = tab
      this.currentTab = tab
    }, 
    tabSlider(tab) {
      this.tab_slider = tab
      this.tab = ''
      this.currentTab = ''
    }
  }
}
</script>

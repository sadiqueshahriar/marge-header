<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="container pt-4">
      <div class="row">
        <div class="col-md-3 col-12">
          <div class="chart-card">
            <div class="chart-heading">ICR/USDT</div>
            <div class="chart-prices">$ 15.08</div>
            <div class="chart-volume">
              <span>+79.95%</span>
              Volume: 107,821,084.95 USDT
            </div>
            <img src="../assets/images/chart.png" alt="">
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="chart-card">
            <div class="chart-heading">TRX/USDT</div>
            <div class="chart-prices">$ 0.06911</div>
            <div class="chart-volume">
              <span>+7.95%</span>
              Volume: 107,821,084.95 USDT
            </div>
            <img src="../assets/images/chart.png" alt="">
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="chart-card">
            <div class="chart-heading">BTC/USDT</div>
            <div class="chart-prices">$ 39,000</div>
            <div class="chart-volume">
              <span>+7.95%</span>
              Volume: 107,821,084.95 USDT
            </div>
            <img src="../assets/images/chart.png" alt="">
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="chart-card">
            <div class="chart-heading">WIN/USDT</div>
            <div class="chart-prices">$ 0.0000381 </div>
            <div class="chart-volume">
              <span>+7.95%</span>
              Volume: 107,821,084.95 USDT
            </div>
            <img src="../assets/images/chart.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="table-header">
        <div class="row align-items-center">
          <div class="col-md-8 col-12">
            <h2 class="heading">Markets</h2>
          </div>
          <div class="col-md-4 col-12">
            <div class="input-group">
              <span id="basic-addon2" class="input-group-text"><i class="fa fa-search"></i></span>
              <input type="text" class="form-control" placeholder="Search Coin Name" aria-label="Search Coin Name"
                aria-describedby="basic-addon2">
            </div>
          </div>
        </div>
      </div>

      <div class="table-main">
        <ul id="myTab" class="nav nav-tabs" role="tablist" :class="{'slide': tab_slider == 'spot-tab'}">
          <li class="nav-item" role="presentation">
            <button id="favorites-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#favorites" type="button"
              role="tab" aria-controls="favorites" aria-selected="false" :class="{'active': tab_slider == 'favorites-tab'}" @click="marketSlider('favorites-tab')">
              Favorites
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button id="spot-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#spot" type="button"
              role="tab" aria-controls="spot" aria-selected="true" :class="{'active': tab_slider == 'spot-tab'}" @click="marketSlider('spot-tab')">
              Spot Markets
            </button>
          </li>



        </ul>

        <div class="overflow-auto tab-content">
          <div v-if="tab_slider == 'favorites-tab'" id="favorites" class="tab-pane" role="tabpanel" aria-labelledby="favorites-tab">
            <ul class="py-2 nav nav-pills">
              <li class="nav-item">

              </li>
              <li class="nav-item">

              </li>
            </ul>
            <table class="table-custom">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">24h Change</th>
                  <th scope="col">Liquidity</th>
                  <th scope="col">24h Volumen</th>
                  <th scope="col">APY</th>
                  <th scope="col">LP-Staking</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">TRX/ICR
                        <p>InterCrone</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>Aktiv</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">ICR/MEOX
                        <p>Metronix</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>Inaktiv</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">ICR/WIN<p>WINkLink</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>Aktiv</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">ETH/MEOX<p>Metronix</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>Aktiv</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>









              </tbody>
            </table>
          </div>
          <div id="zones" class="tab-pane" role="tabpanel" aria-labelledby="zones-tab">
            <ul class="py-2 nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">All</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">DeFi</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">POS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Polkadot</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">NFT</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">POW</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">BSC</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Storage</a>
              </li>
            </ul>
            <table class="table-custom">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Change (24hrs)</th>
                  <th scope="col">Market Cap</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>18</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tab_slider == 'spot-tab'" id="spot" class="tab-pane active" role="tabpanel" aria-labelledby="spot-tab">
            <ul class="py-2 nav nav-pills" :class="{'slide': tab_slider_spot_market == 'trx'}">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="javascript:void(0)" :class="{'active': tab_slider_spot_market == 'trx'}" @click="marketName('trx')" >TRX Markets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="javascript:void(0)" :class="{'active': tab_slider_spot_market == 'ICR'}" @click="marketName('ICR')" >ICR Markets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="javascript:void(0)" :class="{'active': tab_slider_spot_market == 'BTC'}"  @click="marketName('BTC')" >BTC Markets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="javascript:void(0)" :class="{'active': tab_slider_spot_market == 'ETH'}" @click="marketName('ETH')" >ETH Markets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="javascript:void(0)" :class="{'active': tab_slider_spot_market == 'USDT'}" @click="marketName('USDT')" >FIAT Markets</a>
              </li>
              <li class="nav-item dropdown">

                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">All Margin</a></li>
                  <li><a class="dropdown-item" href="#">Cross</a></li>
                  <li><a class="dropdown-item" href="#">Isolated</a></li>
                </ul>
              </li>
            </ul>
            <table class="table-custom">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">24h Change</th>
                  <th scope="col">Liquidity</th>
                  <th scope="col">24h Volumen</th>
                  <th scope="col">APY</th>
                  <th scope="col">LP-Staking</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pair in pairList" v-bind:key="pair.pairaddress">
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img :src="' '+pair.fromlogo+' '"
                                    onerror="this.src = '../assets/images/tokens/token.png'">
                      </div>
                      <div class="name">{{pair.fromsymbol.toUpperCase()}}/{{pair.tosymbol.toUpperCase()}}<p>InterCrone</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>15.87 %</td>
                  <td>Aktiv</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="future" class="tab-pane" role="tabpanel" aria-labelledby="future-tab">
            <ul class="py-2 nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">USDⓈ-M Futures</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">COIN-M Futures</a>
              </li>
            </ul>
            <table class="table-custom">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Change (24hrs)</th>
                  <th scope="col">High (24hrs)</th>
                  <th scope="col">Low (24hrs)</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Volume (24hrs)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <a href="#">Data History</a>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="overview" class="tab-pane" role="tabpanel" aria-labelledby="overview-tab">
            <ul class="py-2 nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">USDⓈ-M Futures</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">COIN-M Futures</a>
              </li>
            </ul>
            <table class="table-custom">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Change (24hrs)</th>
                  <th scope="col">High (24hrs)</th>
                  <th scope="col">Low (24hrs)</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Volume (24hrs)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="movers" class="tab-pane" role="tabpanel" aria-labelledby="movers-tab">
            <ul class="py-2 nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">USDⓈ-M Futures</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">COIN-M Futures</a>
              </li>
            </ul>
            <table class="table-custom">
              <thead>
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Last Price</th>
                  <th scope="col">Change (24hrs)</th>
                  <th scope="col">High (24hrs)</th>
                  <th scope="col">Low (24hrs)</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Volume (24hrs)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td scope="row">
                    <div class="name-data">
                      <div class="img-data">
                        <img src="../assets/images/logoa.png" alt="">
                      </div>
                      <div class="name">
                        BTC
                        <p>Bitcoin</p>
                      </div>
                    </div>
                  </td>
                  <td>$67141.09</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>$3533.91</td>
                  <td>27,092.63</td>
                  <td>$24.60M</td>
                  <td>
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Trade</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>

export default {

	data () {
		return {
      currentTab: '',
      tab_slider: 'spot-tab',
      tab_slider_spot_market: 'trx',
			pair_address: '',
        tokens: 0,
        visible: {
            modal: '',
            menu: false,
            search: ''
        },
        pairList:[],
        settings: {
            search: '',
            type: 'liquidity',
            period: 365,
            txs_tab: 'all'
        },
        txs: []
		}
	},

  watch: {
    'tron.account'() {
        if (/^login/.test(this.visible.modal)) {
            this.visible.modal = '';
        }

        this.upBalance();
    },
  },

  mounted() {

      this.getPairs();
      // this.upBalance();
      this.upTxs();
  },

    methods: {

      marketSlider(tab) {
        this.tab_slider = tab
        this.tab = ''
        this.currentTab = ''
      },

        async getPairs(market="trx") {

          const baseUrl = "https://intercroneswap.com/api/";

            const result = await fetch(baseUrl+'get-liquity-list/'+market).then(r => r.json());

            const list  = result.list;

            const usdrate = await fetch("https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD").then(r => r.json());
            const usdval = usdrate.USD;

            const ONETRXUSD=usdval;
            // eslint-disable-next-line no-unused-vars
            const ONEICRUSD=0;
            let x;
            const pairList =[];
            const ONEICRTRX = result.ratevalue;
            const ICRUSD = ONEICRTRX*ONETRXUSD;
            for(x in list){

                let fromsym = list[x].fromsymbol;
                fromsym = (fromsym==="WTRX" || fromsym==="trx" || fromsym==="TRX")?"TRX":fromsym
                let tosym = list[x].tosymbol;
                tosym = (tosym==="WTRX" || tosym==="trx" || tosym==="TRX")?"TRX":tosym;



                const fromtokenLiq = list[x].fromvolume;
                const totokenLiq = list[x].tovolume;
                const fromvolume = parseFloat(list[x].volumetoday)+parseFloat(list[x].volumetoday3);
                const tovolume = parseFloat(list[x].volumetoday1)+parseFloat(list[x].volumetoday2);

                if(fromsym !=="TRX" && tosym !=="TRX"){

                    // var ONEICRTOKEN = 0;
                    // var trxvalue =0;
                    // var trxvalueUSD=0;
                    // eslint-disable-next-line no-var
                    var addval=0;
                    // eslint-disable-next-line no-var
                    var addvolume=0;

                    // if(fromsym=="ICR" || fromsym=="icr"){
                    //     ONEICRTOKEN = list[x].fromamount;
                    //     trxvalue = ONEICRTRX/ONEICRTOKEN;
                    //     trxvalueUSD = trxvalue*ONETRXUSD;
                    // }else if(tosym=="ICR" || tosym=="icr"){
                    //     ONEICRTOKEN = list[x].toamount;
                    //     trxvalue = ONEICRTRX/ONEICRTOKEN;
                    //     trxvalueUSD = trxvalue*ONETRXUSD;
                    // }
                    // console.log('trxvalueUSD',trxvalueUSD)
                    // console.log('fromtokenLiq',fromtokenLiq)
                    // console.log('ICRUSD',ICRUSD)
                    if(fromsym==="ICR" || fromsym==="icr"){
                        addval += parseFloat(fromtokenLiq)*parseFloat(ICRUSD);
                        addvolume += parseFloat(fromvolume)*parseFloat(ICRUSD);
                        if(tosym === "BTC" && fromsym==="ICR") {
                            // eslint-disable-next-line no-console
                            console.log(addvolume,fromvolume,ICRUSD,"Atsaran")
                        }
                    }else if(tosym==="ICR" || tosym==="ICR"){
                        addval += parseFloat(totokenLiq)*parseFloat(ICRUSD);
                        addvolume += parseFloat(tovolume)*parseFloat(ICRUSD);
                    }

                    if(fromsym!=="ICR" && fromsym!=="icr"){
                        addval += parseFloat(fromtokenLiq)*parseFloat(list[x].fromprice)*parseFloat(ICRUSD);
                        addvolume += parseFloat(fromvolume)*parseFloat(list[x].fromprice)*parseFloat(ICRUSD);
                    }else if(tosym!=="ICR" && tosym!=="ICR"){
                        addval += parseFloat(totokenLiq)*parseFloat(list[x].toprice)*parseFloat(ICRUSD);
                        addvolume += parseFloat(tovolume)*parseFloat(list[x].toprice)*parseFloat(ICRUSD);
                        if(tosym === "BTC" && fromsym==="ICR") {
                            // eslint-disable-next-line no-console
                            console.log(addvolume,tovolume,list[x].toprice,ICRUSD,"Atsaran")
                        }

                    }


                }else{

                    // if(fromsym !="TRX"){
                    //     var onetrxtotoken = list[x].fromamount;
                    //     ONEICRUSD = onetrxtotoken*ONETRXUSD;
                    // }else if(tosym !="TRX"){
                    //     var onetrxtotoken = list[x].toamount;
                    //     ONEICRUSD = onetrxtotoken*ONETRXUSD;
                    // }
                    let addval=0;
                    let addvolume=0;
                    if(fromsym==="TRX"){
                        addval += parseFloat(fromtokenLiq)*parseFloat(ONETRXUSD);
                        addvolume += parseFloat(fromvolume)*parseFloat(ONETRXUSD);
                    }else if(fromsym!=="TRX"){
                        addval += parseFloat(fromtokenLiq*list[x].fromprice)*parseFloat(ONETRXUSD);
                        addvolume += parseFloat(fromvolume*list[x].fromprice)*parseFloat(ONETRXUSD);
                    }

                    if(tosym==="TRX"){
                        addval += parseFloat(totokenLiq)*parseFloat(ONETRXUSD);
                        addvolume += parseFloat(tovolume)*parseFloat(ONETRXUSD);
                    }else if(tosym!=="TRX"){
                        // eslint-disable-next-line no-unused-vars
                        addval += parseFloat(totokenLiq*list[x].toprice)*parseFloat(ONETRXUSD);
                        // eslint-disable-next-line no-unused-vars
                        addvolume += parseFloat(tovolume*list[x].toprice)*parseFloat(ONETRXUSD);
                    }

                    if(fromsym==="TRX" && tosym==="SUN"){
                        // eslint-disable-next-line no-console
                        console.log('###################',fromtokenLiq,totokenLiq)

                    }
                }

                if(tosym === "BTC" && fromsym==="ICR") {
                    // eslint-disable-next-line no-console
                    console.log(addvolume,"Atsaran")
                }

                let fromsymval=fromsym;
                let tosymval=tosym;
                if(fromsym==="TRX"){
                    fromsymval = fromsym;
                    tosymval = tosym;
                }else if(tosym==="TRX"){
                    fromsymval = tosym;
                    tosymval = fromsym;
                }

                pairList.push({
                    fromsymbol:fromsymval,
                    tosymbol:tosymval,
                    totalliquity:(addval > 0)?addval.toFixed(2):0,
                    todayvolume:(addvolume > 0)?addvolume.toFixed(2):0,
                    todaycount:list[x].todaycount,
                    pairaddress:list[x].pairaddress,
                    // eslint-disable-next-line no-undef
                    fromlogo:"~/assets/images/tokens/"+fromsymval.toLowerCase()+".png",
                    // eslint-disable-next-line no-undef
                    tologo:"~/assets/images/tokens/"+list[x].tologo
                })

            }
            // eslint-disable-next-line no-console
            console.log('pairList',pairList)
            this.pairList =pairList;

        },
        marketName(market) {
          this.tab_slider_spot_market = market
          const currentMarket = market;
          this.getPairs(currentMarket)
        },
        upTxs() {
            // fetch('/pairs/' + this.pair_address + '/txs/?type=' + this.settings.txs_tab).then(r => r.json()).then(r => {
            //     this.txs = r.data;
            // });
        },
        upBalance() {
            if (!this.tron.account) return;
            this.getTronWeb().then(tronWeb => {
                tronWeb.trx.getBalance(this.tron.account).then(balance => {
                    this.tokens = balance / 1e6;
                });
            });
        },
    }

}
</script>

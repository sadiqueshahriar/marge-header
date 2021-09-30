<template>
    <div>
    <!-- exchange-liquidity-section -->
        <div class="container container-custom">
            <div class="row">
                <div class="col-md-12">
                    <div class="exchange-liquidity-section">
                        <div class="custom-tab-all">
                        <button class="btn btn-warning float-start custom-btn-all">Add Liquidity</button>
                        <ul id="myTab"  class="nav nav-tabs margin-left-custom" role="tablist" :class="{'slide': tab_slider == 'exchange-tab'}">
                            <li class="nav-item" role="presentation">
                            <button id="home-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#exchange" type="button" role="tab" aria-controls="home" aria-selected="true" :class="{'active': tab_slider == 'exchange-tab'}" @click="changeTab('exchange-tab')">Exchange</button>
                            </li>
                            <li class="nav-item" role="presentation">
                            <button id="liquidity-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#liquidity" type="button" role="tab" aria-controls="profile" aria-selected="false" :class="{'active': tab_slider == 'liquidity-tab'}" @click="changeTab('liquidity-tab')">Liquidity</button>
                            </li>
                        </ul>
                        </div>
                        
                        <!--start tab-content -->
                        <div id="myTabContent" class="tab-content tab-content-custom mt-4"> 
                        <!-- exchange -->
                        <div v-if="tab_slider == 'exchange-tab'" id="exchange-tab" class="tab-pane fade" role="tabpanel" aria-labelledby="home-tab" :class="{'active show': tab_slider == 'exchange-tab'}">
                            <div class="exchange-top-value">
                            <div class="row m-0">
                                <div class="col-md-6">
                                <label>ENERGY - 244849/272458 </label>
                                </div>
                                <div class="col-md-6">
                                <label>BANDWIDTH - 4841/5000</label>
                                </div>
                            </div>
                            </div>
                            <div class="col-md-12">
                            <div class="exchange-form">
                                <div class="exchange-form-inner">
                                <div class="row">
                                    <div class="col-md-12">
                                    <div class="form-list">
                                        <label for="exampleFormControlInput1" class="form-label mb-0">From</label>
                                        <input id="form" type="text" class="form-control" placeholder="">
                                    </div>
                                    <span class="max-span">MAX</span>
                                    <div class="form-list-two">
                                        <label for="exampleFormControlInput1" class="form-label">Balane:<span class="value-span">40</span></label>
                                        <div class="form-list-inner"> <span class="icon-form"><img src="../assets/images/logob.png" alt=""></span>
                                        <div class="form-list-inner-right" data-bs-toggle="modal" data-bs-target="#valuse-modal" @click="showModal('token-modal')"> <span class="span-value-modal">TRX<i class="fas fa-chevron-down"></i></span> </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-center"> <span class="arrow-sapn"><i class="fas fa-arrow-up"></i></span> <span class="arrow-sapn"><i class="fas fa-arrow-down"></i></span> </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 mt-4">
                                    <div class="form-list form-list-width">
                                        <label for="exampleFormControlInput1" class="form-label mb-0">To</label>
                                        <input id="form" type="text" class="form-control" placeholder="">
                                    </div>
                                    <div class="form-list-two">
                                        <label for="exampleFormControlInput1" class="form-label">Balane:<span class="value-span">0</span></label>
                                        <div class="form-list-inner"> <span class="icon-form"><img src="../assets/images/form-icon2.jpg" alt=""></span>
                                        <div class="form-list-inner-right" data-bs-toggle="modal" data-bs-target="#valuse-modal"> <span class="span-value-modal">WIN<i class="fas fa-chevron-down"></i></span> </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                    <ul class="form-list list-group ul-custom">
                                        <li> <span class="price-span-list">Price</span>
                                        <div class="price-vlue">
                                            <div class="col-md-12">
                                            <p>126.5709 <u>WIN</u> per <u>TRX</u></p>
                                            <p>0.0079 <u>TRX</u> per <u>WIN</u></p>
                                            </div>
                                        </div>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-center">
                                    <button class="btn btn-swap">Swap</button>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-md-10 offset-md-1">
                                    <ul class="form-list list-group ul-custom">
                                    <li> <span class="price-span-list">Minimum receive</span>
                                        <div class="price-vlue">
                                        <p>125.9381 WIN</p>
                                        </div>
                                    </li>
                                    <li> <span class="price-span-list">Price impact</span>
                                        <div class="price-vlue">
                                        <p class="grren-color-p"><i class="fas fa-chevron-left icon-arrow-value"></i>0.01%</p>
                                        </div>
                                    </li>
                                    <li> <span class="price-span-list">Liquidity Provider Fee</span>
                                        <div class="price-vlue">
                                        <p>0.003 TRX</p>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <!-- Modal valuse-modal -->
                        <div  v-if="tab_modal == 'token-modal'" id="token-modal" class="modal fade modal-custom" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" :class="{'show': tab_modal == 'token-modal'}" :style="{'display': 'block'}">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 id="exampleModalLabel" class="modal-title">Select a token</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <div class="col-md-12">
                                    <input id="searchInput" type="text" class="form-control search-input" name="" onkeyup="searchModalValue()" placeholder="Search by name" >
                                </div>
                                <div class="col-md-12">
                                    <p class="token-p">Token name</p>
                                </div>
                                <ul id="searchArea" class="list-group list-inline search-form-list">
                                    <li><a href="javascript:void(0)"><img src="../assets/images/logob.png" alt=""><span>TRX</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="../assets/images/form-icon2.jpg" alt=""><span>WIN</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="../assets/images/a.png" alt=""><span>ICR</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="../assets/images/b.png" alt=""><span>SUN</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="assets/images/c.png" alt=""><span>MEOX</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="../assets/images/d.png" alt=""><span>USDT</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="../assets/images/f.png" alt=""><span>JST</span></a></li>
                                    <li><a href="javascript:void(0)"><img src="../assets/images/g.png" alt=""><span>BTC</span></a></li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <!-- end exchange --> 
                        
                        <!-- start liquidity -->
                        <div v-if="tab_slider == 'liquidity-tab'" id="liquidity-tab" class="tab-pane fade" role="tabpanel" aria-labelledby="profile-tab" :class="{'active show': tab_slider == 'liquidity-tab'}">
                            <div class="liquidity-block">
                            <div class="liquidty-header">
                                <div class="col-md-12 col-12">
                                <div class="input-group-custom">
                                    <div class="select-filter">
                                    <select id="" name="" class="custom-select">
                                        <option value="" selected="">Hot</option>
                                        <option value="">ARR</option>
                                        <option value="">Earned</option>
                                        <option value="">Total stacked</option>
                                    </select>
                                    </div>
                                    <div class="search-filter">
                                    <input type="text" placeholder="Search Pools">
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 table-grid">
                                <div id="accordionExample" class="accordion"> 
                                    <!--start item one -->
                                    <div class="accordion-item">
                                    <h2 id="headingOne" class="accordion-header">
                                        <button class="accordion-button" :class="{'collapsed': tab != 'first'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="showToggle('first')">
                                        <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="main-data">
                                            <div class="header-img img-reversed new-cake-img"> <img class="cake-img" src="../assets/images/cake.svg" alt=""> <img src="../assets/images/dash.svg" class="img-small" alt=""> </div>
                                            <div class="coin-name">
                                                <h3>TRX-WIN</h3>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="grid-col">
                                            <div class="col-heading">Pool Token</div>
                                            <div class="dull-data">1096.49 / 9,5%</div>
                                        </div>
                                        <div class="grid-col">
                                            <div class="col-heading">TRX</div>
                                            <div class="strong-data">9782.5575</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="col-heading">WIN</div>
                                            <div class="strong-data">1241920.8331</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="col-heading">USDT</div>
                                            <div class="strong-data">3,182.00</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="detail-btn">Details</div>
                                        </div>
                                        </div>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" :class="{'collapse': tab != 'first'}" class="accordion-collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body accordion-body-custom">
                                        <div class="row">
                                            <div class="col-md-4 col-12">
                                            <div class="token-details">
                                                <div class="detail-link"> <a href="#">See Token Info <i class="fa fa-external-link"></i> </a> </div>
                                                <div class="detail-link"> <a href="#">View Project Site <i class="fa fa-external-link"></i> </a> </div>
                                                <div class="detail-link"> <a href="#">View Contract <i class="fa fa-external-link"></i> </a> </div>
                                            </div>
                                            </div>
                                            <div class="col-md-4 col-12">
                                            <div class="profit-box">
                                                <button class="profit-btn w-100">Add </button>
                                            </div>
                                            </div>
                                            <div class="col-md-4 col-12">
                                            <div class="profit-box">
                                                <button class="profit-btn w-100"> Remove </button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <!--end item one --> 
                                    
                                    <!--start item two -->
                                    <div class="accordion-item">
                                    <h2 id="headingTwo" class="accordion-header">
                                        <button class="accordion-button" :class="{'collapsed': tab != 'second'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" @click="showToggle('second')">
                                        <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="main-data">
                                            <div class="header-img img-reversed new-cake-img"> <img class="cake-img" src="../assets/images/cake.svg" alt=""> <img src="../assets/images/dash.svg" class="img-small" alt=""> </div>
                                            <div class="coin-name">
                                                <h3>CAKE-BNB</h3>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="grid-col">
                                            <div class="col-heading">Pool Token</div>
                                            <div class="dull-data">24.59 / 9.7%</div>
                                        </div>
                                        <div class="grid-col">
                                            <div class="col-heading">BNB</div>
                                            <div class="strong-data">21.45</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="col-heading">CAKE</div>
                                            <div class="strong-data">36.18</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="col-heading">USDT</div>
                                            <div class="strong-data">3.175.00</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="detail-btn">Details</div>
                                        </div>
                                        </div>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" :class="{'collapse': tab != 'second'}" class="accordion-collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body accordion-body-custom">
                                        <div class="row">
                                            <div class="col-md-4 col-12">
                                            <div class="token-details">
                                                <div class="detail-link"> <a href="#">See Token Info <i class="fa fa-external-link"></i> </a> </div>
                                                <div class="detail-link"> <a href="#">View Project Site <i class="fa fa-external-link"></i> </a> </div>
                                                <div class="detail-link"> <a href="#">View Contract <i class="fa fa-external-link"></i> </a> </div>
                                            </div>
                                            </div>
                                            <div class="col-md-4 col-12">
                                            <div class="profit-box">
                                                <button class="profit-btn w-100">Add </button>
                                            </div>
                                            </div>
                                            <div class="col-md-4 col-12">
                                            <div class="profit-box">
                                                <button class="profit-btn w-100"> Remove </button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <!--end item two --> 
                                    
                                    <!--start item three -->
                                    <div class="accordion-item">
                                    <h2 id="headingThree" class="accordion-header">
                                        <button class="accordion-button" :class="{'collapsed': tab != 'third'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" @click="showToggle('third')">
                                        <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="main-data">
                                            <div class="header-img img-reversed new-cake-img"> <img class="cake-img" src="../assets/images/cake.svg" alt=""> <img src="../assets/images/dash.svg" class="img-small" alt=""> </div>
                                            <div class="coin-name">
                                                <h3>CAKE-BNB</h3>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="grid-col">
                                            <div class="col-heading">Pool Token</div>
                                            <div class="dull-data">24.59 / 9.7%</div>
                                        </div>
                                        <div class="grid-col">
                                            <div class="col-heading">BNB</div>
                                            <div class="strong-data">21.45</div>
                                        </div>
                                        <div class="grid-col d-none d-none d-md-block">
                                            <div class="col-heading">CAKE</div>
                                            <div class="strong-data">36.18</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="col-heading">USDT</div>
                                            <div class="strong-data">3.175.00</div>
                                        </div>
                                        <div class="grid-col d-none d-md-block">
                                            <div class="detail-btn">Details</div>
                                        </div>
                                        </div>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse" :class="{'collapse': tab != 'third'}" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body accordion-body-custom">
                                        <div class="row">
                                            <div class="col-md-4 col-12">
                                            <div class="token-details">
                                                <div class="detail-link"> <a href="#">See Token Info <i class="fa fa-external-link"></i> </a> </div>
                                                <div class="detail-link"> <a href="#">View Project Site <i class="fa fa-external-link"></i> </a> </div>
                                                <div class="detail-link"> <a href="#">View Contract <i class="fa fa-external-link"></i> </a> </div>
                                            </div>
                                            </div>
                                            <div class="col-md-4 col-12">
                                            <div class="profit-box">
                                                <button class="profit-btn w-100">Add </button>
                                            </div>
                                            </div>
                                            <div class="col-md-4 col-12">
                                            <div class="profit-box">
                                                <button class="profit-btn w-100"> Remove </button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <!--end item three --> 
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <!-- end liquidity --> 
                        </div>
                        <!--end tab-content --> 
                        
                    </div>
                </div>
            </div>
        </div>
    <!--end exchange-liquidity-section -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
            tab: '',
            currentTab: '',
            tab_slider: 'exchange-tab',
            tab_modal: '',
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
            changeTab(tab) {
                this.tab_slider = tab
                this.tab = ''
                this.currentTab = ''
                // this.tab_modal = 'token-modal'
            },
            showModal(tab) {
                this.tab_modal = tab
                this.tab = ''
                this.currentTab = ''
            },

        }
    }
</script>
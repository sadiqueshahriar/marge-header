<template>
    <!-- Transaction Settings modal -->
    <div v-if="showTransactionModal">
        <div id="modal">
            <div class="toast transaction-settings" :class="{'show': showTransactionModal === true}" data-autohide="false">
                <div class="toast-header mr-auto"> <span>Transaction Settings</span>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="hideModal"></button>
                </div>
                <div class="toast-body pt-1">
                    <p class="p-slippage-toler">Slippage tolerance</p>
                    <div id="value-button-area">
                        <button class="btn btn-value">0.1%</button>
                        <button class="btn btn-value btn-value-active ">0.5%</button>
                        <button class="btn btn-value">1%</button>
                        <input class="value-input form-control" type="text" name="" placeholder="other">
                    </div>
                    <p class="p-slippage-toler">Transaction deadline</p>
                    <div class="bottom-field">
                        <input class="form-control" type="text" name="" value="3">
                        <span>minutes</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Transaction Settings modal -->
</template>
<script>
export default {
   data() {
        return {
            showTransactionModal: false
        }
    },
    methods: {
        showModal() {
            console.log('ttt');
            this.showTransactionModal = true 
        },
        hideModal(){
            this.showTransactionModal = false
        }
    }
}
</script>
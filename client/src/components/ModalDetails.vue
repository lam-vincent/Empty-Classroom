<template>
    <transition name="modal">
        <div class="modal-mask" v-if="show">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            Default Header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            Default Body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            Default Footer
                        </slot>
                        <button class="modal-default-button" @click="close">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            show: false,
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
            this.$emit('close');
        },
    },
});
</script>
  
<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-default-button {
    height: 30px;
}
</style>
  
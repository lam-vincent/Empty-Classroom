<template>
    <transition name="modal">
        <div class="modal-mask" v-if="show">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <!-- header title -->
                    <div class="header-title">
                        <slot name="header-title">
                            <h2>header title</h2>
                        </slot>
                    </div>
                    <!-- header return button -->
                    <div class="header-return-button">
                        <slot name="header-return-button">
                            <button @click="close">return</button>
                        </slot>
                    </div>
                    <!-- form input 1 -->
                    <div class="form-input-1">
                        <slot name="form-input-1">
                            <input type="text" placeholder="form input 1" />
                        </slot>
                    </div>
                    <!-- form input 2 -->
                    <div class="form-input-2">
                        <slot name="form-input-2">
                            <input type="text" placeholder="form input 2" />
                        </slot>
                    </div>
                    <!-- form input description -->
                    <div class="form-input-description">
                        <slot name="form-input-description">
                            <p>form input description</p>
                        </slot>
                    </div>
                    <!-- form input 3 -->
                    <div class="form-input-3">
                        <slot name="form-input-3">
                            <input type="text" placeholder="form input 3" />
                        </slot>
                    </div>
                    <!-- form input 4 -->
                    <div class="form-input-4">
                        <slot name="form-input-4">
                            <input type="text" placeholder="form input 4" />
                        </slot>
                    </div>
                    <!-- form input 5 -->
                    <div class="form-input-5">
                        <slot name="form-input-5">
                            <input type="text" placeholder="form input 5" />
                        </slot>
                    </div>
                    <!-- form input 6 -->
                    <div class="form-input-6">
                        <slot name="form-input-6">
                            <input type="text" placeholder="form input 6" />
                        </slot>
                    </div>
                    <!-- modal button -->
                    <div class="modal-button">
                        <slot name="modal-button">
                            <button>modal button</button>
                        </slot>
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
</style>
  
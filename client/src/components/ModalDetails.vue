<template>
    <transition name="modal">
        <div class="modal-mask" v-if="show">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <!-- return button -->
                    <div class="return-button" @click="close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15.5 5.5L8.5 12.5L15.5 19.5" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <!-- image -->
                    <div class="image">
                        <img src="" alt="image" />
                    </div>
                    <!-- title -->
                    <div class="title">
                        <slot name="title">
                            <h1>title</h1>
                        </slot>
                    </div>
                    <!-- engagement tag -->
                    <div class="engagement-tag">
                        <slot name="engagement-tag">
                            <p>engagement tag</p>
                        </slot>
                    </div>
                    <!-- second title -->
                    <div class="second-title">
                        <slot name="second-title">
                            <h2>second title</h2>
                        </slot>
                    </div>
                    <!-- capsule with blue svg -->
                    <div class="capsule-with-blue-svg">
                        <slot name="capsule-with-blue-svg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.5 5.5L8.5 12.5L15.5 19.5" stroke="#1E1E1E" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </slot>
                    </div>
                    <!-- capsule with gray svg -->
                    <div class="capsule-with-gray-svg">
                        <slot name="capsule-with-gray-svg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.5 5.5L8.5 12.5L15.5 19.5" stroke="#1E1E1E" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </slot>
                    </div>
                    <!-- description title -->
                    <div class="description-title">
                        <slot name="description-title">
                            <h2>description title</h2>
                        </slot>
                    </div>
                    <!-- description -->
                    <div class="description">
                        <slot name="description">
                            <p>description</p>
                        </slot>
                    </div>
                    <!-- requirement -->
                    <div class="requirement">
                        <slot name="requirement">
                            <p>requirement</p>
                        </slot>
                    </div>
                    <!-- additonal information before modal button -->
                    <div class="additonal-information-before-modal-button">
                        <slot name="additonal-information-before-modal-button">
                            <p>additonal information before modal button</p>
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
  
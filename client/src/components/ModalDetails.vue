<template>
    <transition name="modal">
        <div class="modal-mask" v-if="show">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <!-- return button -->
                    <button class="return-button" @click="close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="white" width="24px" height="24px">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>

                    </button>
                    <!-- image -->
                    <div class="image">
                        <img src="\classroom1.jpg" alt="image" />
                    </div>

                    <div class="body">

                        <div class="header">
                            <!-- title -->
                            <div class="title">
                                <slot name="title">
                                </slot>
                            </div>
                            <!-- engagement tag -->
                            <div class="engagement-tag">
                                <slot name="engagement-tag">
                                </slot>
                            </div>
                        </div>
                        <!-- second title -->
                        <div class="second-title">
                            <slot name="second-title">
                            </slot>
                        </div>
                        <!-- capsule with blue svg -->
                        <div class="capsule-with-blue-svg">
                            <slot name="capsule-with-blue-svg">
                            </slot>
                        </div>
                        <!-- capsule with gray svg -->
                        <div class="capsule-with-gray-svg">
                            <slot name="capsule-with-gray-svg">
                            </slot>
                        </div>
                        <!-- description title -->
                        <div class="description-title">
                            <h2>Description</h2>
                        </div>
                        <!-- description -->
                        <div class="description">
                            <slot name="description">
                            </slot>
                        </div>
                        <!-- requirement -->
                        <div class="requirement">
                            <slot name="requirement">
                                <!-- <p>Require</p>
                                <span>nothing</span>
                                <span>HDMI cable</span> -->
                            </slot>
                        </div>

                        <div class="wrapper">
                            <!-- additonal information before modal button -->
                            <div class="additonal-information-before-modal-button">

                                <slot name="additonal-information-before-modal-button">
                                </slot>

                            </div>
                            <!-- modal button -->
                            <div class="modal-button">
                                <button>
                                    <slot name="modal-button">

                                    </slot>
                                </button>
                            </div>
                        </div>
                        <div class="modal-button-second modal-button">
                            <slot name="modal-button-second">
                                <!-- <button>modal button</button> -->
                            </slot>
                        </div>
                        <div class="modal-button-third modal-button">
                            <slot name="modal-button-third">
                                <!-- <button>modal button</button> -->
                            </slot>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { readToken } from "../utils/authUtils";

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
        readToken() {return readToken()}
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
    width: 100%;
    height: 100vh;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    overflow: hidden;
    overflow-y: scroll;
}

.return-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: var(--dark-blue);
    border: none;
    border-radius: 4rem;
    cursor: pointer;
    padding: 8px 10px;
}

.return-button svg {
    transform: translateY(2px);
}

.image {
    width: 100%;
    height: 150px;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.body {
    padding: 0 20px;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title h1 {
    font-size: 24px;
    font-weight: 600;
    color: black
}


.engagement-tag {
    margin-bottom: 10px;
    background-color: var(--dark-blue);
    padding: 8px 16px;
    border-style: solid;
    border-radius: 4rem;
    border-width: 8px;
    border-color: white;
    transform: translateY(-2rem);
    color: white;
}

.engagement-tag p {
    font-size: 14px;
    font-weight: 600;
}

.second-title {
    display: flex;
    align-items: center;
}

.second-title svg {
    margin-right: 4px;
    transform: translateY(-1px);
}

.second-title h2 {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray);
}

.capsule-with-gray-svg,
.capsule-with-blue-svg {
    display: flex;
    align-items: center;
    overflow: hidden;
    overflow-x: scroll;
}

.capsule-with-gray-svg p,
.capsule-with-blue-svg p {
    font-size: 14px;
    font-weight: 400;
    color: black;
}

.badge {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light-dark-gray);
    padding: 8px 16px;
    border-style: solid;
    border-radius: 4rem;
    border-width: 1px;
    margin-right: 10px;
}

.description-title h2 {
    font-size: 16px;
    font-weight: 600;
    color: black;
}


.description p {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray)
}

.requirement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    overflow-x: scroll;
}

.requirement p {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray)
}

.requirement span {
    font-size: 14px;
    font-weight: 400;
    color: var(--dark-gray);
    padding: 8px 16px;
    border-style: solid;
    border-radius: 4rem;
    border-width: 1px;
}

.wrapper {
    background-color: var(--light-dark-gray);
    border-radius: 1rem;
    margin-top: 10px;
}

.additonal-information-before-modal-button {
    padding: 10px 30px;
}

.additonal-information-before-modal-button p {
    font-size: 14px;
    font-weight: 400;
    color: black;
}

.modal-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-button button {
    width: 100%;
    height: 40px;
    background-color: var(--blue);
    border: none;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    font-size: 14px;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.modal-button-second {
    margin-top: 15px;
}

.modal-button-third button {
    background: var(--red);
}
</style>
  
<template>
    <transition name="modal">
        <div class="modal-mask" v-if="show">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <header>
                        <!-- header title -->
                        <div class="header-title">
                            <slot name="header-title">
                                <!-- <h3>Edit Room</h3>
                                <h3>for Classroom A101</h3> -->
                            </slot>
                        </div>
                        <!-- header return button -->
                        <div class="header-return-button">
                            <slot name="header-return-button">
                                <button @click="close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" width="24" height="24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </slot>
                        </div>
                    </header>
                    <!-- form input 1 -->
                    <div class="form-input">
                        <slot name="form-input-1">
                            <!-- <label for="form-input-1">Name</label>
                            <input type="text" placeholder="101" /> -->
                        </slot>
                    </div>
                    <!-- form input 2 -->
                    <div class="form-input">
                        <slot name="form-input-2">
                            <!-- <label for="form-input-2">Building</label>
                            <input type="text" placeholder="A" /> -->
                        </slot>
                    </div>
                    <!-- form input description -->
                    <div class="form-input-description">
                        <slot name="form-input-description">
                            <!-- <label for="form-input-description">Description</label>
                            <textarea name="form-input-description" id="form-input-description" cols="30" rows="5"
                                placeholder="You can find 30 desks and chairs and ... The classroom is in the building A."></textarea> -->
                        </slot>
                    </div>
                    <!-- form input 3 -->
                    <div class="form-input">
                        <slot name="form-input-3">
                            <!-- <label for="form-input-3">Campus</label>
                            <input type="text" placeholder="République" /> -->
                        </slot>
                    </div>
                    <!-- form input 4 -->
                    <div class="form-input">
                        <slot name="form-input-4">
                            <!-- <label for="form-input-4">Location</label>
                            <input type="text" placeholder="1st Floor" /> -->
                        </slot>
                    </div>
                    <!-- form input 5 -->
                    <div class="form-input">
                        <slot name="form-input-5">
                            <!-- <label for="form-input-5">State</label>
                            <input type="text" placeholder="Available" /> -->
                        </slot>
                    </div>
                    <!-- form input 6 -->
                    <div class="form-input">
                        <slot name="form-input-6">
                            <!-- <label for="form-input-6">Category</label>
                            <input type="text" placeholder="Classroom" /> -->
                        </slot>
                    </div>
                    <!-- modal button -->
                    <div class="modal-button">
                        <slot name="modal-button">
                            <!-- <button>modal button</button> -->
                        </slot>
                    </div>

                    <div class="modal-button-negative modal-button">
                        <slot name="modal-button-negative">
                            <!-- <button>modal button</button> -->
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
/* Modal styling */
.modal-button-negative {
    margin-top: 10px;
}

h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    font-family: Helvetica, Arial, sans-serif;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.header-return-button {
    display: flex;
    justify-content: center;
}

.header-return-button button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}

.form-input-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.form-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.form-input-description label,
.form-input label {
    width: auto;
    margin-bottom: 5px;
    font-size: 14px;
    color: var(--dark-gray);
}

.form-input-description textarea {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
    resize: none;
}

.form-input input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
}

.modal-button {
    display: flex;
    justify-content: center;
}

.modal-button button {
    background-color: var(--blue);
    color: #fff;
    padding: 10px 80px;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    outline: none;
}
</style>
  
<template>
    <div class="modal-details">
        <div class="modal-content">
            <slot></slot>

            <button @click="closeModal">Go Back</button>
        </div>
    </div>
</template>
  
<script lang="ts">
export default {
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
  
<style scoped>
.modal-details {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.modal-content {
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>
  
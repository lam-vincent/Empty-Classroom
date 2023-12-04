<template>
    <div class="equipment-capsule">
        <div class="equipment-image">
            <img src="computer-room1.jpg" alt="equipment image" />
        </div>
        <div class="equipment-details">
            <h3>{{ equipment.Equipment_Name }}</h3>
            <p>Type: {{ equipment.Equipment_Type }}</p>
        </div>
    </div>
</template>
  
<script lang="ts">

export default {
    props: {
        equipment: {
            type: Object,
            required: true,
        },
    },

    beforeMount() {
        console.log("EquipmentCapsule mounted: this.equipment", this.equipment);
    },
};
</script>
  
<style scoped>
.equipment-capsule {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    margin-bottom: 20px;
    min-width: 200px;
}

.equipment-image {
    width: 100%;
    height: 100px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.equipment-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.equipment-details {
    padding: 10px;
}

.equipment-details h3 {
    font-size: 16px;
    margin-bottom: 5px;
}

.equipment-details p {
    font-size: 14px;
    color: #555;
    margin: 0;
}
</style>
  
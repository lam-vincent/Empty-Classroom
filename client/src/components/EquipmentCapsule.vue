<template>
    <div class="equipment-capsule" @click="openModalDetails('modalEquipmentDetails')">
        <div class="equipment-image">
            <img src="computer-room1.jpg" alt="equipment image" />
        </div>
        <div class="equipment-details">
            <h3>{{ equipment.Equipment_Name }}</h3>
            <p>Type: {{ equipment.Equipment_Type }}</p>
        </div>
    </div>

    <ModalDetails ref="modalEquipmentDetails" @close="closeModal">
        <template v-slot:title>
            <h1>{{ equipment.Equipment_Name }}</h1>
        </template>
        <template v-slot:engagement-tag>
            <p>{{ equipment.Equipment_Type }}</p>
        </template>
        <template v-slot:second-title>
            <p>{{ equipment.Equipment_Location }} - {{ equipment.Equipment_Status }}</p>
        </template>
        <template v-slot:description>
            <p>{{ equipment.Equipment_Description }}</p>
        </template>
        <template v-slot:additonal-information-before-modal-button>
            <p>Click on the button to edit the equipment.
                If you can see this, congrats it means that
                you are an admin.</p>
        </template>
        <template v-slot:modal-button>
            <span>Edit the Equipment</span>
        </template>
    </ModalDetails>
</template>
  
<script lang="ts">

import ModalDetails from "./ModalDetails.vue";

export default {
    name: "EquipmentCapsule",
    components: {
        ModalDetails,
    },
    props: {
        equipment: {
            type: Object,
            required: true,
        },
    },

    beforeMount() {
        console.log("EquipmentCapsule mounted: this.equipment", this.equipment);
    },

    methods: {
        // Modal methods
        openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModal');
        },
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
        },
        closeModal() {
            console.log('Modal closed');
        },
    }
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
  
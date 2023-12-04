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
            <button>Edit the Equipment</button>
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

/* ModalDetails styling */
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
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
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
    height: 200px;
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
    text-align: center;
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
    justify-content: space-between;
    overflow: hidden;
    overflow-x: scroll;
}

.capsule-with-gray-svg svg,
.capsule-with-blue-svg svg {
    margin-right: 10px;
}

.capsule-with-gray-svg p,
.capsule-with-blue-svg p {
    font-size: 14px;
    font-weight: 400;
    color: black;
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
</style>
  
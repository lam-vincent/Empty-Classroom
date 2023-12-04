<template>
    <div class="room-card" @click="() => openModalDetails('modalRoomDetails')">
        <div class="room-card-image">
            <img src="/classroom1.jpg" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ room.Room_Building + room.Room_Name }}</h2>
            <p>{{ room.Room_State }}</p>
        </div>
    </div>

    <ModalDetails ref="modalRoomDetails" @close="closeModal">

        <template v-slot:title>
            <h1>{{ room.Room_Category }} {{ room.Room_Building + room.Room_Name }}</h1>
        </template>
        <template v-slot:engagement-tag>
            <p>{{ room.Room_State }}</p>
        </template>
        <template v-slot:second-title>
            <p>{{ room.Room_Campus }} - {{ room.Room_Location }}</p>
        </template>
        <template v-slot:description>
            <p>The room is in the building {{ room.Room_Building }}.
            </p>
        </template>
        <template v-slot:additonal-information-before-modal-button>
            <p>Click on the button to reserve the room.
                You will get to see the availability through
                timestamp there.</p>
        </template>
        <template v-slot:modal-button>
            <span>Reserve Now</span>
        </template>

    </ModalDetails>
</template>
  
<script lang="ts">
import ModalDetails from "./ModalDetails.vue";

export default {
    name: "RoomCapsule",
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    components: {
        ModalDetails,
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
.room-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    min-width: 200px;
}

.room-card-image {
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    overflow: hidden;
}

.room-card-image img {
    height: 100%;
    width: 100%;
}

.room-card-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 60px;
}

.room-card-content h2 {
    font-size: 16px;
}

.room-card-content p {
    background-color: var(--dark-blue);
    color: #fff;
    padding: 16px;
    border-radius: 16px;
    transform: translateY(-20px);
}
</style>

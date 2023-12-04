<template>
    <div class="room-card" @click="() => openModalDetails('modalRoomDetails')">
        <div class="room-card-image">
            <img src="/classroom1.jpg" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ room.Room_Building + room.Room_Name }}</h2>
            <p>{{ room.Room_State }}</p>
        </div>


        <ModalDetails ref="modalRoomDetails" @close="closeModal">
            <!-- <template #header>
                <h2>{{ room.Room_Building }} {{
                    room.Room_Name }}</h2>
            </template>

            <template #body>
                <p>Room Type: {{ room.Room_Type }}</p>
            </template>

            <template #footer>
                <p>Your Custom Footer</p>
            </template> -->
        </ModalDetails>

    </div>
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
    margin-right: 25px;
    margin-bottom: 25px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.room-card-image {
    width: 100%;
    height: 100px;
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
  
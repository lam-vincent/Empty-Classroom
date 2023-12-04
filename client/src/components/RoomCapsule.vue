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
            <button>Reserve Now</button>
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

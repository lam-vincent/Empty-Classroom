<template>
    <div class="room-card" @click="() => openModalDetails('modalRoomDetails')">
        <div class="room-card-image">
            <img src="/classroom3.jpg" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ room.Room_Building + room.Room_Name }}</h2>
            <p>{{ room.Room_State }}</p>
        </div>
    </div>

    <ModalDetails ref="modalRoomDetails" @close="closeModal">

        <template v-slot:title>
            <h1>{{ room.Room_Category }} {{ room.Room_Building + room.Room_Name }}</h1>

            <svg v-if="userData.token.role === 'Admin'" xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" width="24px" height="24px"
                style="transform: translateY(-2px); margin-left: 8px;" @click="() => openModal('EditRoom')">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </template>
        <template v-slot:engagement-tag>
            <p>{{ room.Room_State }}</p>
        </template>
        <template v-slot:second-title>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                width="16px" height="16px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
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
            <button @click="() => openModal('ReserveRoom')">Reserve Now</button>

            <button @click="deletePreference()" style="margin-top: 1rem; background-color: var(--red);">Delete
                Preference
            </button>
        </template>

    </ModalDetails>

    <Modal ref="EditRoom" @close="closeModal">
        <template v-slot:header-title>
            <h3>Edit Room</h3>
            <h3>for {{ room.Room_Category }} {{ room.Room_Building + room.Room_Name }}</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Name</label>
            <input v-model="currentRoomData.Room_Name" type="text" placeholder="101" />
        </template>
        <template v-slot:form-input-2>
            <label for="form-input-2">Building</label>
            <input v-model="currentRoomData.Room_Building" type="text" placeholder="A" />
        </template>
        <!-- <template v-slot:form-input-description>
            <label for="form-input-description">Description</label>
            <textarea name="form-input-description" id="form-input-description" cols="30" rows="5"
                placeholder="Write Description Here"></textarea>
        </template> -->
        <template v-slot:form-input-3>
            <label for="form-input-3">Campus</label>
            <input v-model="currentRoomData.Room_Campus" type="text" placeholder="République" />
        </template>
        <template v-slot:form-input-4>
            <label for="form-input-4">Location</label>
            <input v-model="currentRoomData.Room_Location" type="text" placeholder="1st Floor" />
        </template>
        <template v-slot:form-input-5>
            <label for="form-input-7">State</label>
            <select v-model="currentRoomData.Room_State">
                <option value="Occupied" :selected="currentRoomData.Room_State === 'Occupied' ? true : false">Occupied
                </option>
                <option value="Vacant" :selected="currentRoomData.Room_State === 'Vacant' ? true : false">Vacant</option>
            </select>
        </template>
        <template v-slot:form-input-6>
            <label for="form-input-6">Category</label>
            <input v-model="currentRoomData.Room_Category" type="text" placeholder="Classroom" />
        </template>
        <template v-slot:modal-button>
            <button @click="editRoom(); closeModal();">Save the Changes</button>
        </template>
    </Modal>

    <Modal ref="ReserveRoom" @close="">
        <template v-slot:header-title>
            <h3>Create a new Reservation</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Title</label>
            <input v-model="newReserveData.Title" type="text" placeholder="Group Project" />
        </template>
        <template v-slot:form-input-description>
            <label for="form-input-description">Description</label>
            <textarea v-model="newReserveData.Description" name="form-input-description" id="form-input-description"
                cols="30" rows="5" placeholder="Write Description Here"></textarea>
        </template>
        <template v-slot:form-input-3>
            <label for="form-input-3">Start time</label>
            <input v-model="newReserveData.start_time" type="text" placeholder="2023-12-30 10:0:00" />
        </template>
        <template v-slot:form-input-4>
            <label for="form-input-4">End time</label>
            <input v-model="newReserveData.end_time" type="text" placeholder="2023-12-30 12:00:00" />
        </template>
        <template v-slot:modal-button>
            <button @click="reserveRoom();">Finalize Reservation</button>
        </template>
    </Modal>
</template>

<script lang="ts">
import { verifyToken, readToken } from "../../utils/authUtils";
import ModalDetails from "../ModalDetails.vue";
import Modal from "../Modal.vue";
import axios from "axios";

export default {
    name: "RoomCapsule",
    components: {
        ModalDetails,
        Modal,
    },
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            userData: {
                token: "",
            },
            currentRoomData: {
                Room_Name: this.room.Room_Name,
                Room_Building: this.room.Room_Building,
                Room_Campus: this.room.Room_Campus,
                Room_Location: this.room.Room_Location,
                Room_State: this.room.Room_State,
                Room_Category: this.room.Room_Category,
            },
            newReserveData: {
                id_room: this.room.id_room,
                id_user: 1, // this.userData.token.id_user
                Title: "",
                Description: "",
                start_time: "",
                end_time: "",
            },
        };
    },
    beforeMount() {
        verifyToken();
        this.userData.token = readToken();
    },
    methods: {
        // Modal methods
        openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log("Modal opened openModal");
        },
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
        },
        closeModal() {
            (this.$refs.modalRoomDetails as any).close();
        },
        editRoom() {
            try {
                axios.put(
                    `http://localhost:3000/rooms/${this.room.id_room}`,
                    this.currentRoomData,
                    {
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:5173/",
                            "Content-Type": "application/json",
                        },
                    }
                );
                alert("Room infos successfully edited.");
                this.$emit("roomListUpdated");
                this.$emit("close");
            } catch (e) {
                alert("Error while updating room");
            }
        },
        async deletePreference() {
            try {
                const userId = readToken().userId;
                await axios.delete(
                    `http://localhost:3000/dashboard/recommended`,
                    {
                        data: {
                            userId: userId,
                            Room_Building: this.currentRoomData.Room_Building,
                            Room_Name: this.currentRoomData.Room_Name,
                        },
                        withCredentials: true,
                        headers: {
                            'Access-Control-Allow-Origin': 'http://localhost:5173/',
                            "Content-Type": "application/json",
                        },
                    }
                );
                window.location.reload();
            } catch (e) {
                alert("Error while deleting room preference");
            }
        },

        async reserveRoom() {
            try {
                axios.post(
                    `http://localhost:3000/reserve`,
                    this.newReserveData,
                    {
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:5173/",
                            "Content-Type": "application/json",
                        },
                    }
                );
                alert("Room successfully reserved.");
                (this.$refs.ReserveRoom as any).close();
                this.$emit("close");
                this.$emit("roomListUpdated");
            } catch (e) { }
        },
    },
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


/* Modal styling */
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

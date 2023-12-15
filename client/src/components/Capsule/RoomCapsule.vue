<template>
    <div v-if="cardPurpose != 'booking'" class="room-card" @click="() => openModalDetails('modalRoomDetails')">
        <div class="room-card-image">
            <img src="/classroom1.jpg" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ room.Room_Building + room.Room_Name }}</h2>
            <p>{{ room.Room_State }}</p>
        </div>
    </div>

    <div v-if="cardPurpose == 'booking'" class="room-card" @click="() => openModalDetails('reservationDetails')">
        <div class="room-card-image">
            <img src="/classroom1.jpg" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ Room_Name }}</h2>
            <p>{{ room.Start_Time.substring(0, 5) }}</p>
        </div>
    </div>

    <ModalDetails ref="modalRoomDetails" @close="">

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
        <template v-slot:capsule-with-blue-svg  v-if="userData.token.role === 'Admin'">
            <div v-for="equipment in equipmentData" :key="equipment.id_equipment">
                <p>{{ equipment.Equipment_Name }} <span class="badge">{{ equipment.Quantity }}</span>
                    <svg v-if="userData.token.role === 'Admin'" @click="deleteIsEquiped(equipment.Equipment_Name)"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="var(--red)" width="20px" height="20px"
                        style="margin-left: 0.5rem;">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            clip-rule="evenodd" />
                    </svg>

                </p>
            </div>
            <svg v-if="userData.token.role === 'Admin'" @click="() => openModal('addIsEquiped')"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--blue)"
                width="40px" height="40px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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

            <button @click="deleteRoom()" v-if="userData.token.role === 'Admin'"
                style="margin-top: 1rem; background-color: var(--red);">Delete
                Room
            </button>
        </template>

    </ModalDetails>
    <Modal ref="EditRoom" @close="">
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
            <button @click="editRoom(); closeModal('EditRoom');">Edit Room</button>
        </template>
    </Modal>

    <Modal ref="ReserveRoom" @close="">
        <template v-slot:header-title>
            <h3>🕘 New Reservation</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Title</label>
            <input v-model="newReserveData.Title" type="text" placeholder="Group Project" />
        </template>
        <template v-slot:form-input-2>
            <label for="form-input-2">Group reservation</label>
            <input v-model="isGroupReservation" name="form-input-2" type="checkbox" placeholder="Group Project" />
        </template>
        <template v-slot:form-input-3 v-if="isGroupReservation">
            <label for="form-input-3">Reservation for group</label>
            <select v-model="userData.selectedGroup">
                <option v-for="(group) in userGroups" :value="group.id_group">{{ group.Group_Name }}</option>
            </select>
        </template>
        <template v-slot:form-input-description>
            <label for="form-input-description">Description</label>
            <textarea v-model="newReserveData.Description" name="form-input-description" id="form-input-description"
                cols="30" rows="3" placeholder="Tell us more about what you will be doing in this room !"></textarea>
        </template>
        <template v-slot:form-input-4>
            <RoomTimetable :room="room" ref="mainTimetable" @scheduleTimeChanged="setReservationTime"
                @scheduleDateChanged="setReservationDate" />
        </template>
        <template v-slot:modal-button>
            <button @click="reserveRoom();">Create Reservation</button>
        </template>
    </Modal>
    <Modal ref="reservationDetails" @close="">
        <template v-slot:header-title>
            <h3>Details of this reservation</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Reservation Purpose</label>
            <input disabled v-model="room.Title" type="text" placeholder="Group Project" />
        </template>
        <!-- <template v-slot:form-input-2>
            <label for="form-input-2">Room</label>
            <input v-model="" name="form-input-2" type="text" placeholder="Group Project" />
        </template> -->
        <!-- <template v-slot:form-input-2>
            <label for="form-input-2">Group reservation</label>
            <input v-model="isGroupReservation" name="form-input-2" type="checkbox" placeholder="Group Project" />
        </template>
        <template v-slot:form-input-3 v-if="isGroupReservation">
            <label for="form-input-3">Reservation for group</label>
            <select v-model="userData.selectedGroup">
                <option v-for="(group) in userGroups" :value="group.id_group">{{ group.Group_Name }}</option>
            </select>
        </template> -->
        <template v-slot:form-input-description>
            <label for="form-input-description">Reservation Description</label>
            <textarea disabled v-model="room.Description" name="form-input-description" id="form-input-description"
                cols="30" rows="3" placeholder="Tell us more about what you will be doing in this room !"></textarea>
        </template>
        <!-- <template v-slot:form-input-description>
          <ul>
            <li>Purpose of the reservation : {{ this.room.Title }}</li>
            <li>Date of reservation : {{  this.room.Reservation_Date }}</li>
            <li>Schedule : {{  this.room.Start_Time.subtring(0,5) +" to "+ this.room.End_Time.subtring(0,5)  }}</li>
          </ul>
        </template> -->
    </Modal>
    <Modal ref="addIsEquiped" @close="">
        <template v-slot:header-title>
            <h3>Add Equipment</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Name</label>
            <input v-model="newEquipmentData.Equipment_Name" type="text" placeholder="Projector" />
        </template>
        <template v-slot:form-input-2>
            <label for="form-input-2">Quantity</label>
            <input v-model="newEquipmentData.Quantity" type="text" placeholder="1" />
        </template>
        <template v-slot:modal-button>
            <button @click="addIsEquiped();">Add Equipment</button>
        </template>
    </Modal>
</template>

<script lang="ts">
import { verifyToken, readToken } from "../../utils/authUtils";
import ModalDetails from "../ModalDetails.vue";
import Modal from "../Modal.vue";
import axios from "axios";
import RoomTimetable from "../RoomTimetable.vue";


export default {
    name: "RoomCapsule",
    components: {
        ModalDetails,
        Modal,
        RoomTimetable
    },
    props: {
        room: {
            type: Object,
            required: true,
        },
        userGroups: {
            type: Object,
        },
        cardPurpose: {
            type: String,
        }

    },
    data() {
        return {
            userData: {
                token: "",
                selectedGroup: ""
            },
            isGroupReservation: false,
            currentRoomData: {
                Room_Name: this.room.Room_Name,
                Room_Building: this.room.Room_Building,
                Room_Campus: this.room.Room_Campus,
                Room_Location: this.room.Room_Location,
                Room_State: this.room.Room_State,
                Room_Category: this.room.Room_Category,
            },
            equipmentData: [],
            newReserveData: {
                id_room: this.room.id_room,
                id_user: readToken().userId,
                Title: "",
                Description: "",
                Reservation_Date: "",
                start_time: null,
                End_Time: "",
            },
            newEquipmentData: {
                id_room: this.room.id_room,
                Equipment_Name: "",
                Quantity: "",
            },
            Room_Name: ""
        };
    },
    beforeMount() {
        verifyToken();
        this.userData.token = readToken();
        this.fetchRoomNameById(this.room.id_room);
        this.initializeData();
    },
    methods: {
        // Modal methods
        setReservationTime(data: any) {
            this.newReserveData.start_time = data;
        },
        setReservationDate(data: any) {
            this.newReserveData.Reservation_Date = data;
        },
        openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log("Modal opened openModal");
        },
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
        },
        closeModal(reference: string) {
            (this.$refs[reference] as any).close();
        },
        async initializeData() {
            await this.getEquipmentData();
        },
        computeNewDate(chaineHeure: string) {
            const dateHeure = new Date(`2000-01-01T${chaineHeure}`);
            // Ajouter une heure
            dateHeure.setHours(dateHeure.getHours() + 1);
            // Formater la nouvelle heure
            const nouvelleHeure = dateHeure.toTimeString().slice(0, 8);
            return nouvelleHeure;
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
        deleteRoom() {
            if (confirm("Are you sure you want to delete this room ?")) {
                try {
                    console.log("this.room", this.room);
                    axios.delete(
                        `http://localhost:3000/rooms/${this.room.id_room}`,
                        {
                            withCredentials: true,
                            headers: {
                                "Access-Control-Allow-Origin": "http://localhost:5173/",
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    alert("Room successfully deleted.");
                    (this.$refs.modalRoomDetails as any).close();
                    this.$emit("close");
                    this.$emit("roomListUpdated");
                } catch (e) { }
            }
        },
        async reserveRoom() {
            let requestURL;
            try {
                if (this.newReserveData.start_time.status != "reserved") {
                    console.log(this.newReserveData);

                    if (this.isGroupReservation) {
                        requestURL = `http://localhost:3000/reserve/group/${this.userData.selectedGroup}`;
                    } else {
                        requestURL = "http://localhost:3000/reserve";
                    }

                    try {
                        axios.post(
                            requestURL,
                            {
                                id_room: this.newReserveData.id_room,
                                id_user: this.newReserveData.id_user,
                                Title: this.newReserveData.Title,
                                Description: this.newReserveData.Description,
                                Reservation_Date: this.newReserveData.Reservation_Date,
                                Start_Time: this.newReserveData.start_time.date,
                                End_Time: this.computeNewDate(this.newReserveData.start_time.date),
                            },
                            {
                                withCredentials: true,
                                headers: {
                                    "Access-Control-Allow-Origin": "http://localhost:5173/",
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        alert("Room sucessfully reserved.");
                    } catch (e) {

                    }
                } else {
                    alert("This room is already reserved.");
                }
                (this.$refs.mainTimetable as any).fetchSchedule();
                // (this.$refs.ReserveRoom as any).close();
                // this.$emit("close");
                this.$emit("roomListUpdated");
            } catch (e) { }
        },

        // is_equiped methods
        async getEquipmentData() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/is_equipped/${this.room.id_room}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:5173/",
                            "Content-Type": "application/json",
                        },
                    }
                );
                this.equipmentData = response.data.is_equipped;
                console.log("equipmentData", this.equipmentData);
            } catch (e) {
                console.log(e);
            }
        },
        async addIsEquiped() {
            try {
                axios.post(
                    `http://localhost:3000/is_equipped`,
                    this.newEquipmentData,
                    {
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:5173/",
                            "Content-Type": "application/json",
                        },
                    }
                );
                await this.getEquipmentData();
                (this.$refs.addIsEquiped as any).close();
                (this.$refs.modalRoomDetails as any).close();
                (this.$refs.modalRoomDetails as any).open();
            } catch (e) { }
        },
        async deleteIsEquiped(equipmentName: string) {
            try {
                const id_room: number = this.room.id_room;
                await axios.delete(
                    `http://localhost:3000/is_equipped/`,
                    {
                        data: {
                            id_room: id_room,
                            equipmentName: equipmentName,
                        },
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:5173/",
                            "Content-Type": "application/json",
                        },
                    }
                );
                await this.getEquipmentData();
                (this.$refs.modalRoomDetails as any).close();
                (this.$refs.modalRoomDetails as any).open();
            } catch (e) {
                console.error("Error deleting equipment:", e);
            }
        },
        async fetchRoomNameById(roomId: string) {
            try {
                const response = await axios.get(
                    `http://localhost:3000/rooms/${roomId}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:5173", // Ne pas inclure le slash à la fin
                            "Content-Type": "application/json",
                        },
                    }
                );

                this.Room_Name = response.data.Room_Building + "" + response.data.Room_Name;
            } catch (e) {
                console.error("Error fetching room name:", e);
                throw e; // Ajout de cette ligne pour propager l'erreur à l'appelant
            }
        }
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
    overflow: hidden;
    overflow-x: scroll;
}

.capsule-with-gray-svg p,
.capsule-with-blue-svg p {
    color: black;
    border: 1px solid var(--dark-gray);
    border-radius: 4rem;
    padding: 8px 16px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
}

.badge {
    display: inline-flex;
    align-items: center;
    border-radius: 1rem;
    background-color: #eff6ff;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--blue);
    border-width: 1px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    border-color: var(--blue);
    margin-left: 1rem;
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
    margin-bottom: 12px;
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

<template>
    <!-- Recommendation Section -->
    <section class="recommendation">

        <div class="recommendation-title">
            <h2>Recommendations</h2>
        </div>

        <div class="display-case">

            <RoomCapsule v-for="(room, index) in recommendedData.currentRecommendedRooms" :key="index" :room="room"
                @click="() => openModalDetails('modalRoomDetails')" />

            <button @click="toggleForm" v-show="!showForm">Add Room</button>
            <form v-show="showForm" @submit.prevent="addRecommendedRoom">
                <label for="roomName">Room Name:</label>
                <input type="text" id="roomName" v-model="newRoomName" required />
                <button type="submit">Save</button>
            </form>

        </div>

        <ModalDetails ref="modalRoomDetails" @close="closeModal">
            <template #header>
                <h3>Your Custom Header</h3>
            </template>

            <template #body>
                <p>Your Custom Body</p>
            </template>

            <template #footer>
                <p>Your Custom Footer</p>
            </template>
        </ModalDetails>

    </section>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import RoomCapsule from "./RoomCapsule.vue";
import Modal from "./Modal.vue";
import ModalDetails from "./ModalDetails.vue";
import axios from "axios";

export default {
    components: {
        RoomCapsule,
        Modal,
        ModalDetails,
    },

    data() {
        return {
            showForm: false,
            newRoomName: "",
            roomData: {
                fetchedRooms: [],
                currentRooms: [],
            },
            preferData: {
                fetchedPreferRooms: [],
                currentPreferRooms: [],
            },
            recommendedData: {
                fetchedRecommendedRooms: [],
                currentRecommendedRooms: [],
            },
        };
    },

    beforeMount() {
        this.initializeData();
    },

    mounted() {
        console.log("RecommendationSection mounted");
    },

    methods: {
        async initializeData() {
            verifyToken();

            await this.fetchAllRooms();
            await this.fetchAllRecommendedRooms();
        },

        // Axios methods
        handleSuccess(response: any) {
            console.log("response", response);
        },

        handleError(error: any) {
            console.log(error);
        },


        // Recommendation methods
        toggleForm() {
            this.showForm = !this.showForm;
        },

        async fetchAllRooms() {
            try {
                const response = await axios.get('http://localhost:3000/rooms', {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });
                this.roomData.fetchedRooms = response.data;
                this.roomData.currentRooms = [...this.roomData.fetchedRooms];
                this.handleSuccess(response.data);
            } catch (error) {
                this.handleError(error);
            }
        },

        async fetchAllRecommendedRooms() {
            try {
                const userId: number = readToken().userId;
                const response = await axios.get(`http://localhost:3000/dashboard/recommended/${userId}`, {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });

                this.preferData.fetchedPreferRooms = response.data.preferredClassrooms;
                this.preferData.currentPreferRooms = [...this.preferData.fetchedPreferRooms];

                // when id are the same and userId from Prefer table and userId from token are the same, push the room to recommendedData
                this.preferData.currentPreferRooms.forEach((preferRoom: any) => {
                    this.roomData.fetchedRooms.forEach((room: any) => {
                        if (preferRoom.id_room === room.id_room) {
                            if (preferRoom.id_user === userId) {
                                this.recommendedData.currentRecommendedRooms.push(room as never);
                            }
                        }
                    });
                });

                this.handleSuccess(response.data);
            } catch (error) {
                this.handleError(error);
            }
        },

        addRecommendedRoom() {
            this.recommendedData.currentRecommendedRooms.push({
                id: this.recommendedData.currentRecommendedRooms.length + 1,
                name: this.newRoomName,
            } as never);

            const roomId: number = this.newRoomName.length + 1;

            const userId: number = readToken().userId;
            axios.post(`http://localhost:3000/dashboard/recommended/${userId}`, {
                userId: userId,
                roomId: roomId,
            }, {
                withCredentials: true, headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:5173/'
                }
            });

            this.newRoomName = "";
            this.toggleForm();
        },

        // Modal methods
        openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModal');
        },
        openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModalDetails');
        },
        closeModal() {
            console.log('Modal closed');
        },
    },
};
</script>
  
<style scoped>
.recommendation {
    display: flex;
    flex-direction: column;
    margin: 20px;
}

.display-case {
    display: flex;
    overflow: scroll;
}

button {
    color: var(--blue);
    background-color: transparent;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
}


button:hover {
    color: var(--dark-blue);
}
</style>
  
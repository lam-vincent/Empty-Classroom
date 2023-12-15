<template>
    <!-- Recommendation Section -->
    <section class="recommendation">

        <div class="recommendation-title">
            <h2>Recommendations</h2>
        </div>

        <div class="display-case">

            <PreferCapsule v-for="(room, index) in recommendedData.currentRecommendedRooms" :key="index" :room="room" />

            <button @click="toggleForm" v-show="!showForm">Add Room</button>
            <form v-show="showForm" @submit.prevent="addRecommendedRoom">
                <label for="roomName">Room Name:</label>
                <input type="text" id="roomBuilding" v-model="newRoomName.Room_Building" placeholder="Building" required />
                <input type="number" id="roomName" v-model="newRoomName.Room_Name" placeholder="Room Number" required />
                <button type="submit">Save</button>
                <button type="button" style="color: var(--red);" @click="toggleForm">Cancel</button>
            </form>

        </div>

    </section>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../../utils/authUtils";
import PreferCapsule from "../Capsule/PreferCapsule.vue";
import axios from "axios";

export default {
    components: {
        PreferCapsule,
    },

    data() {
        return {
            showForm: false,
            newRoomName: {
                Room_Building: "",
                Room_Name: "",
            },
            recommendedData: {
                // fetchedRecommendedRooms: [],
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

        async fetchAllRecommendedRooms() {
            try {
                // debugger;
                const userId: number = readToken().userId;
                const response = await axios.get(`http://localhost:3000/dashboard/recommended/${userId}`, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });

                this.recommendedData.currentRecommendedRooms = response.data.preferredClassrooms;
                // this.recommendedData.currentRecommendedRooms = [...this.recommendedData.fetchedRecommendedRooms];

                this.handleSuccess(response.data);
            } catch (error) {
                this.handleError(error);
            }
        },

        async addRecommendedRoom() {
            try {
                const userId = readToken().userId;
                const response = await axios.post(
                    `http://localhost:3000/dashboard/recommended`,
                    {
                        userId: userId,
                        Room_Building: this.newRoomName.Room_Building,
                        Room_Name: this.newRoomName.Room_Name,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            'Access-Control-Allow-Origin': 'http://localhost:5173/',
                        },
                    }
                );

                this.handleSuccess(response.data);

                await this.fetchAllRecommendedRooms();
            } catch (error) {
                this.handleError(error);
            } finally {
                this.newRoomName = {
                    Room_Building: "",
                    Room_Name: "",
                };
                this.toggleForm();
            }
        },

    },
};
</script>
  
<style scoped>
.recommendation {
    display: flex;
    flex-direction: column;
}

.display-case {
    display: flex;
    overflow: scroll;
}

.display-case form {
    display: flex;
    flex-direction: column;
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
  
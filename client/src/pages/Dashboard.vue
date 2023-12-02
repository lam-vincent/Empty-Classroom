<template>
  <main-layout>
    <div class="dashboard-page">

      <div class="dashboard-title">
        <h1>Find your favorite place to work</h1>
      </div>

      <router-link to="/find" class="go-to-find-card">
        <div class="go-to-find-card-image">
          <img src="classroom1.jpg" />
        </div>
        <div class="go-to-find-card-content">
          <p>What are you looking for?</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            height="30px" width="30px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </router-link>

      <!-- Categories Section -->
      <section class="categories">

        <div class="category" @click="redirectToFilteredRooms('classroom')">
          <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
          <span>classroom</span>
        </div>

        <div class="category" @click="redirectToFilteredRooms('computer-lab')">
          <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          <span>computer lab</span>
        </div>

        <div class="category" @click="redirectToFilteredRooms('auditorium')">
          <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
          </svg>
          <span>auditorium</span>
        </div>

      </section>

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

        <!-- Equipment Section -->
        <section class="equipment">
          <div class="equipment-title">
            <h2>Equipments</h2>
            <button @click="openModal('lightBulbModal')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#facc15" height="20px" width="20px">
                <path
                  d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
              </svg>
            </button>
          </div>

          <div class="display-case">
            <EquipmentCapsule v-for="(equipment, index) in Equipment.currentEquipment" :key="index" :equipment="equipment"
              @click="() => openModalDetails('modalEquipmentDetails')" />
            <button @click="openModal('addEquipmentModal')">Add Equipment</button>
          </div>
        </section>

        <!-- Modal Section -->
        <Modal ref="addEquipmentModal" @close="closeModal">
          <h3 slot="header">Custom Header</h3>
          <!-- Your custom content here -->
        </Modal>

        <Modal ref="lightBulbModal" @close="closeModal">
          <h3 slot="header">Custom Header</h3>
          <!-- Your custom content here -->
        </Modal>

        <!-- Modal Details Section -->
        <ModalDetails ref="modalRoomDetails" @close="closeModal">
          <h3 slot="header">Custom Header</h3>
          <!-- Your custom content here -->
        </ModalDetails>

        <ModalDetails ref="modalEquipmentDetails" @close="closeModal">
          <h3 slot="header">Custom Header</h3>
          <!-- Your custom content here -->
        </ModalDetails>

      </section>

    </div>
  </main-layout>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import RoomCapsule from "../components/RoomCapsule.vue";
import EquipmentCapsule from "../components/EquipmentCapsule.vue";
import Modal from "../components/Modal.vue";
import ModalDetails from "../components/ModalDetails.vue";
import axios from "axios";

export default {
  components: {
    RoomCapsule,
    EquipmentCapsule,
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
      Equipment: {
        fetchedEquipment: [],
        currentEquipment: [],
      }
    };
  },

  beforeMount() {
    verifyToken();
    this.fetchAllRooms();
    this.fetchAllRecommendedRooms();
    this.fetchAllEquipment();
  },

  mounted() {
    console.log("Dashboard mounted");
  },

  methods: {

    // Axios methods
    handleSuccess(response: any) {
      console.log("response", response);
    },

    handleError(error: any) {
      console.log(error);
    },

    // Category methods
    redirectToFilteredRooms(category: string) {
      // navigate to /find with the category as a query parameter
      this.$router.push({ path: '/find', query: { category } });
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
        this.preferData.fetchedPreferRooms = response.data;
        this.preferData.currentPreferRooms = [...this.preferData.fetchedPreferRooms];
        console.log("this.recommendedData.currentRecommendedRooms", this.preferData.currentPreferRooms);

        // when id are the same and userId from Prefer table and userId from token are the same, push the room to recommendedData
        this.preferData.currentPreferRooms.forEach((preferRoom: any) => {
          console.log("preferRoom", preferRoom);
          this.roomData.fetchedRooms.forEach((room: any) => {
            console.log("room", room);
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

    // Equipment methods
    async fetchAllEquipment() {
      try {
        const response = await axios.get('http://localhost:3000/equipment', {
          withCredentials: true, headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5173/'
          }
        });
        this.Equipment.fetchedEquipment = response.data;
        this.Equipment.currentEquipment = [...this.Equipment.fetchedEquipment];
        this.handleSuccess(response.data);
      } catch (error) {
        this.handleError(error);
      }
    },

    async addEquipment() {
      try {
        const response = await axios.post('http://localhost:3000/equipment', {
          name: "test",
          status: "test",
          roomId: 1,
        }, {
          withCredentials: true, headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5173/'
          }
        });
        console.log(response);
        this.handleSuccess(response.data);
      } catch (error) {
        this.handleError(error);
      }
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
.dashboard-title {
  padding: 5px;
  text-align: center;
}

.go-to-find-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  text-decoration: none;
  color: black;
}

.go-to-find-card-image {
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.go-to-find-card-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.go-to-find-card-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.go-to-find-card-content svg {
  background-color: var(--blue);
  border-radius: 50%;
  padding: 10px;
  color: #fff;
  height: 25px;
  width: 25px;
}

.categories {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
}

.category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 32px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 8px;
  padding-left: 16px;
  margin: 20px;
  margin-right: 0;
}

.category span {
  margin-left: 5px;
  width: 100px;
}

.category svg {
  color: var(--blue);
}

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

.equipment-title {
  display: flex;
}

.equipment-title svg {
  transform: translateY(0.25rem);
}
</style>
  
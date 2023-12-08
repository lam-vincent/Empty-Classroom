<template>
  <main-layout>
    <div class="find-page">
      <h1>Find a workplace and reserve now!</h1>

      <div class="search-bar">
        <input type="text" v-model="userData.searchInput" placeholder="Search and Filter" @keydown.enter="getRooms()" />
        <button class="search-btn" @click="getRooms()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="grey"
            height="30px" width="30px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        <button class="create-room-btn" @click="openModal('createRoom')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>
        </button>
      </div>
      <div class="item-list" ref="itemList">
        <RoomCapsule v-for="(objet) in roomData.currentRooms" :room="objet" @roomListUpdated="fetchAllRooms();"/>
      </div>
    </div>

    <Modal ref="createRoom" @close="">
      <template v-slot:header-title>
            <h3>Create a new room</h3>
        </template>
        <template v-slot:form-input-1>
            <label for="form-input-1">Name</label>
            <input v-model="newRoomData.Room_Name" type="text" placeholder="101" />
        </template>
        <template v-slot:form-input-2>
            <label for="form-input-2">Building</label>
            <input v-model="newRoomData.Room_Building" type="text" placeholder="A" />
        </template>
        <template v-slot:form-input-3>
            <label for="form-input-3">Campus</label>
            <input v-model="newRoomData.Room_Campus" type="text" placeholder="République" />
        </template>
        <template v-slot:form-input-4>
            <label for="form-input-4">Location</label>
            <input  v-model="newRoomData.Room_Location" type="text" placeholder="1st Floor" />
        </template>
        <template v-slot:form-input-5>
            <label for="form-input-7">State</label>
            <select v-model="newRoomData.Room_State">
                <option value="Occupied" :selected="newRoomData.Room_State === 'Occupied' ? true : false">Occupied</option>
                <option value="Vacant" :selected="newRoomData.Room_State === 'Vacant' ? true : false">Vacant</option>
            </select>
        </template>
        <template v-slot:form-input-6>
            <label for="form-input-6">Category</label>
            <input  v-model="newRoomData.Room_Category" type="text" placeholder="Classroom" />
        </template>
        <template v-slot:modal-button>
            <button @click="createRoom();">Save the Changes</button>
        </template>
    </Modal>

  </main-layout>
</template>

<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import RoomCapsule from "../components/Capsule/RoomCapsule.vue";
import axios from 'axios';
import Modal from "../components/Modal.vue";

export default {
  props: ['category'],
  components: {
    RoomCapsule,
    Modal
  },
  data() {
    return {
      userData: {
        token: "",
        searchInput: "",
        searchOptions: {
          building: [""],
          campus: [""],
          name: [""],
          hour: [""]
        },
        campusDictionary: ["REPUBLIQUE", "republique", "république", "BORDEAUX", "bordeaux", "bdx", "GORKI", "gorki"],
        buildingDictionary: ["A", "a", "B", "b", "C", "c"]
      },
      roomData: {
        fetchedRooms: [],
        currentRooms: []
      },
      newRoomData:{
        Room_Name:"",
        Room_Building:"",
        Room_Campus:"",
        Room_Location:"",
        Room_State:"",
        Room_Category:""
      }
    };
  },

  beforeMount() {
    verifyToken();
    this.userData.token = readToken();
    this.fetchAllRooms();
  },
  methods: {
    resetSearchOptions() {
      this.userData.searchOptions.building.length = 0;
      this.userData.searchOptions.campus.length = 0;
      this.userData.searchOptions.name.length = 0;
      this.userData.searchOptions.hour.length = 0;
    },
    openModal(reference: string) {
            (this.$refs[reference] as any).open();
            console.log('Modal opened openModal');
    },
    identifyKeyword(mot: string) {
      // Regex pour heure sous le format ':1h'
      const heureRegex = /^\d{1,2}h$/;
      const codeSalleRegex = /^[1-9]\d{0,2}$/;
      const estNomDeCampus = this.userData.campusDictionary.includes(mot);
      const estNomDeBuilding = this.userData.buildingDictionary.includes(mot);

      // Identifier la nature du mot en fonction des regex et des dictionnaires
      if (heureRegex.test(mot)) {
        console.log("Heure");
        this.userData.searchOptions.hour.push(mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      }
      if (codeSalleRegex.test(mot)) {
        console.log("Code de salle");
        this.userData.searchOptions.name.push(mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      }
      if (estNomDeCampus) {
        console.log("Nom de campus");
        this.userData.searchOptions.campus.push(mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      }
      if (estNomDeBuilding) {
        console.log("Nom de building");
        this.userData.searchOptions.building.push(mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      }

    },
    async getRooms() {

      this.resetSearchOptions();
      var searchKeywords = this.userData.searchInput.split(" ");
      searchKeywords.forEach((keyword) => { this.identifyKeyword(keyword) });
      console.log(this.userData.searchOptions);

      let buildingCriteria = (x) => this.userData.searchOptions.building.length === 0 || this.userData.searchOptions.building.includes(x);
      let campusCriteria = (x) => this.userData.searchOptions.campus.length === 0 || this.userData.searchOptions.campus.includes(x);
      let nameCriteria = (x) => this.userData.searchOptions.name.length === 0 || (this.userData.searchOptions.name.includes(x.toString()) || (x.toString().includes(this.userData.searchOptions.name)));

      let filteredRooms = this.roomData.fetchedRooms.filter((room) => {
        // Initialise includeRoom à true, puis modifie à false si une condition n'est pas satisfaite
        let includeRoom = true;

        if (!buildingCriteria(room.Room_Building)) { includeRoom = false; }
        if (!campusCriteria(room.Room_Campus)) { includeRoom = false; }
        if (!nameCriteria(room.Room_Name)) { includeRoom = false; }
        if (this.userData.searchOptions.building.length === 0 && this.userData.searchOptions.campus.length == 0 && this.userData.searchOptions.name.length == 0) { includeRoom = false; }

        return includeRoom;
      });
      this.roomData.currentRooms = filteredRooms;
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
        console.log(response.data);
        this.handleSuccess(response.data);
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchRoomsByCategory(category: any) {
      try {
        const response = await axios.get(`http://localhost:3000/rooms/category/${category}`);
        this.handleSuccess(response.data);
      } catch (error) {
        this.handleError(error);
      }
    },
    async createRoom(){
            try {
                  const response = await axios.post('http://localhost:3000/rooms', this.newRoomData , {
                      withCredentials: true, headers: {
                          'Access-Control-Allow-Origin': 'http://localhost:5173/'
                      }
                  });

                  this.fetchAllRooms();
                  alert("Room created successfully.");
              }catch(e){
                alert("Error while creating new room.");
              }
    },
    handleSuccess(data: never[]) {
      this.roomData.fetchedRooms = data;
    },
    handleError(error: unknown) {
      console.error('Error fetching rooms:', error);
      alert('An error occurred while fetching rooms. Please try again later.');
    }
  }
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-bar input[type="text"] {
  padding: 15px;
  border-radius: 3px 0px 0px 3px;
  background: rgba(0, 0, 0, 0.02);
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-right: none;
  /* border-bottom:1px solid #153e96; */
  width: 300px;
}

.search-btn {
  /* background:#153e96; */
  background: rgba(0, 0, 0, 0.02);
  border-radius: 0px 6px 6px 0px;
  height: 48px;
  width: 48px;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.create-room-btn{
  margin-left:20px;
  height:40px;
  width:40px;
  background:var(--blue);
  color:#FFF;
  border-radius:4px;
  border:none;
  cursor:pointer;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 300px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

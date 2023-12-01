<template>
  <main-layout>
    <div class="find-page">
      <h1>Find a workplace and reserve now!</h1>

      <div  class="search-bar">
        <input type="text" v-model="userData.searchInput" placeholder="Search and Filter" />
        <button class="search-btn" @click="getRoomsByName()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="white" height="30px" width="30px">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      <div class="item-list" ref="itemList">
        <RoomCapsule v-for="(objet) in roomData.fetchedRooms" :room="objet"/>
      </div>
    </div>
  </main-layout>
</template>

<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import RoomCapsule from "../components/RoomCapsule.vue";
import axios from 'axios';

export default {
  props: ['category'],
  components :{
    RoomCapsule
  },
  data() {
    return {
      userData: {
        token: "",
        searchInput: ""
      },
      roomData: {
        fetchedRooms: [],
        currentRooms : []
      }
    };
  },

  beforeMount() {
    verifyToken();
  },
  onMount() {
    this.userData.token = readToken();
  },
  mounted() {
    // if (this.category === null) {
    //   this.fetchAllRooms();
    // } else {
    //   this.fetchRoomsByCategory(this.category);
    // }
    this.fetchAllRooms();
  },
  methods: {
    async getRoomsByName() {
      const response = await axios.get(`http://localhost:3000/rooms/name/${this.userData.searchInput}`, {withCredentials:true});
      this.roomData.fetchedRooms = response.data;
      // console.log(name);
    },
    async fetchAllRooms() {
      try {
        const response = await axios.get('http://localhost:3000/rooms', { withCredentials: true ,headers :{
          'Access-Control-Allow-Origin':'http://localhost:5173/'
        }});
        this.roomData.fetchedRooms = response.data;
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
    async renderRooms(){

    },
    handleSuccess(data: never[]) {
      this.roomData.fetchedRooms = data;
    },
    handleError(error: unknown) {
      console.error('Error fetching rooms:', error);
      alert('An error occurred while fetching rooms. Please try again later.');
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
  display:flex;
  align-items:center; 
}

.search-bar input[type="text"]{
  padding:15px;
  border-radius:3px 3px 0px 0px;
  background:rgba(0,0,0,0.02);
  outline:none;
  border:none;
  border-bottom:1px solid #153e96;
  width:300px;
}

.search-btn{
  background:#153e96;
  border-radius:0px 6px 6px 0px;
  height:47px;
  width:47px;
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

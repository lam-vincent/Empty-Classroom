<template>
  <main-layout>
    <div class="find-page">
      <h1>Find a workplace and reserve now!</h1>

      <div  class="search-bar">
        <input type="text" placeholder="Search and Filter" />
      </div>

      <div class="item-list" ref="itemList">
        <div class="item">
        </div>
        <div class="item">
        </div>
        <div class="item">
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import axios from 'axios';

export default {
  props: ['category'],
  data() {
    return {
      userData: {
        token: "",
      },
      roomData: {
        fetchedRooms: []
      }, // two options: fetchedRooms and rooms. which one to use?
      rooms: [],
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
      const response = await axios.get(`http://localhost:3000/rooms`, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `auth=${this.userData.token}`
        }

      });
      console.log(response);
      // console.log(name);
    },
    async fetchAllRooms() {
      try {
        const response = await axios.get('http://localhost:3000/rooms', { withCredentials: true ,headers :{
          'Access-Control-Allow-Origin':'http://localhost:5173/'
        }});
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
    handleSuccess(data: never[]) {
      this.rooms = data;
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

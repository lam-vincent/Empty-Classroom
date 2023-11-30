<template>
  <main-layout>
    <div class="find-page">
      <h1>Find a workplace and reserve now!</h1>

      <div @onclick="getRoomsByName()" class="search-bar">
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
import { verifyToken,readToken } from "../utils/authUtils";
// import { Room } from "../../../server/types/types";
import axios from 'axios';

export default {
  beforeMount() {
    verifyToken();
  },
  onMount(){
    this.userData.token = readToken();
  }
  ,
  data() {
    return {
      userData: {
        token: "",
      },
      roomData: {
        fetchedRooms : []
      }
    };
  },

  methods:{
    async getRoomsByName() {
      const response = await axios.get(`http://localhost:3000/rooms`, {
            headers: {
              'Content-Type': 'application/json',
              'Cookie': `auth=${this.userData.token}`
            }
            
      });

      console.log(response);
      // console.log(name);
    }
  }
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

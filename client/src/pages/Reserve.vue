<template>
  <main-layout>
    <div class="reserve-page">

      <h2>Rooms you Booked</h2>
      <div class="booked">
        <RoomCapsule v-for="(objet) in rooms" :cardPurpose="'booking'" :room="objet" />
      </div>

    </div>
  </main-layout>
</template>
  
<script lang="ts">
import { verifyToken, readToken } from "../utils/authUtils";
import RoomCapsule from "../components/Capsule/RoomCapsule.vue";
import axios from 'axios';
import Modal from "../components/Modal.vue";


export default {
  components: {
    RoomCapsule,
    Modal,
  },
  data() {
    return {
      rooms: []
    };
  },
  beforeMount(){
    this.fetchUserReservations();
    // console.log("pipi");
    // console.log(this.rooms);
  },
  methods:{
    async fetchUserReservations(){
      try {
                  const response:any = await axios.get(
                      `http://localhost:3000/reserve/${readToken().userId}`,
                      {
                          withCredentials: true,
                          headers: {
                              "Access-Control-Allow-Origin": "http://localhost:5173/",
                              "Content-Type": "application/json",
                          },
                      }
                  );

                  this.rooms = response.data;

      } catch (e) {
          alert("Error while fetching reservations");
      }
    }
  }
}
</script>
  
<style scoped>
.reserve-page {
  text-align: center;
}

.display-case {
  display: flex;
  overflow: scroll;
}

.booked{
  /* background:red; */
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
}

.room-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin-right: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.room-card-image {
  width: 100%;
  height: 100px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
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
</style>
  
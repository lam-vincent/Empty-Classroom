<template>
  <main-layout>
    <div class="dashboard-page">

      <div class="dashboard-title">
        <h1>Find your favorite place to work</h1>
      </div>

      <router-link to="/find" class="go-to-find-card">
        <div class="go-to-find-card-image">
          <img src="computer-room2.jpg" />
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
      <categories-section></categories-section>

      <!-- Recommendation Section -->
      <recommendation-section></recommendation-section>

      <!-- Equipment Section -->
      <equipment-section></equipment-section>
    </div>
  </main-layout>
</template>
  
<script lang="ts">
import { verifyToken } from "../utils/authUtils";

import RoomCapsule from "../components/Capsule/RoomCapsule.vue";
import EquipmentCapsule from "../components/Capsule/EquipmentCapsule.vue";
import Modal from "../components/Modal.vue";
import ModalDetails from "../components/ModalDetails.vue";

import CategoriesSection from "../components/Section/CategoriesSection.vue";
import RecommendationSection from "../components/Section/RecommendationSection.vue";
import EquipmentSection from "../components/Section/EquipmentSection.vue";


export default {
  components: {
    RoomCapsule,
    EquipmentCapsule,
    Modal,
    ModalDetails,
    CategoriesSection,
    RecommendationSection,
    EquipmentSection,
  },


  beforeMount() {
    verifyToken();
  },

  mounted() {
    console.log("Dashboard mounted");
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
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.go-to-find-card-image img {
  width: 100%;
  height: 100%;
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
</style>
  
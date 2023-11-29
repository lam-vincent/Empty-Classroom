<template>
  <main-layout>
    <div class="dashboard-page">

      <div class="dashboard-title">
        <h1>Find your favorite place to work</h1>
      </div>

      <section class="go-to-find-card">
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
      </section>

      <section class="categories">

        <div class="category">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
          <span>classroom</span>
        </div>

        <div class="category">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          <span>computer lab</span>
        </div>

        <div class="category">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
          </svg>
          <span>auditorium</span>
        </div>

      </section>

      <section class="recommendation">

        <div class="recommendation-title">
          <h2>Recommendations</h2>
          <button>See all</button>
        </div>

        <div class="display-case">
          <div class="room-card">
            <div class="room-card-image">
              <img src="classroom1.jpg" />
            </div>
            <div class="room-card-content">
              <h2>Classroom A101</h2>
              <p>Available</p>
            </div>
          </div>
          <div class="room-card">
            <div class="room-card-image">
              <img src="classroom1.jpg" />
            </div>
            <div class="room-card-content">
              <h2>Classroom A102</h2>
              <p>Available</p>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main-layout>
</template>
  
<script lang="ts">
import { verifyToken } from "../utils/authUtils";

export default {
  beforeMount() {
    verifyToken();
  }
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

.recommendation-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.display-case {
  display: flex;
  overflow: scroll;
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
  
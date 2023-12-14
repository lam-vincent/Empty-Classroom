<template>
  <main-layout>
    <div class="reserve-page">

      <div class="booked">
        <h2>Room you Booked</h2>

        <div class="display-case">
          <div class="room-card">
            <div class="room-card-image">
              <img src="classroom1.jpg" />
            </div>
            <div class="room-card-content">
              <h2>Classroom A101</h2>
              <p>10h - 12h</p>
            </div>
          </div>
          <div class="room-card">
            <div class="room-card-image">
              <img src="classroom1.jpg" />
            </div>
            <div class="room-card-content">
              <h2>Classroom A102</h2>
              <p>14h - 16h</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </main-layout>
</template>
  
<script lang="ts">
</script>
  
<style scoped>
.reserve-page {
  text-align: center;
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
</style>
  
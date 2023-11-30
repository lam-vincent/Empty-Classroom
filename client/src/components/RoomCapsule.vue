<template>
    <div class="room-card">
        <div class="room-card-image">
            <img :src="room.image" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ room.name }}</h2>
            <p>{{ room.availability }}</p>
        </div>
    </div>
</template>
  
<script lang="ts">

export default {
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
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
  
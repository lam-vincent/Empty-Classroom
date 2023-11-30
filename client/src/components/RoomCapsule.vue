<template>
    <div class="room-card" @click="showRoom();">
        <div class="room-card-image">
            <img src="../../public/classroom1.jpg" alt="Room Image" />
        </div>
        <div class="room-card-content">
            <h2>{{ room.Room_Building+room.Room_Name }}</h2>
            <p>{{ room.Room_State }}</p>
        </div>
    </div>
</template>
  
<script lang="ts">

export default {
    name: "RoomCapsule",
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    methods:{
        showRoom(){
            alert(1);
        }
    }
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
    cursor:pointer;
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
  
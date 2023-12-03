<template>
    <div class="group-card">
            <div class="group-card-image">
              <img src="classroom1.jpg" />
            </div>
            <div class="group-card-content">
              <h2>{{group.Group_Name}}</h2>
              <p>{{ group.Belonging.length }} / {{group.Group_Size}}</p>
            </div>
    </div>
</template>
  
<script lang="ts">

export default {
    name: "GroupCapsule",
    props: {
        group: {
            type: Object,
            required: true,
        },
    },
    methods: {
        showGroup() {
            console.log("showGroup clicked");
        }
    }
};
</script>
  
<style scoped>
.group-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    margin-right: 25px;
    margin-bottom: 25px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.group-card-image {
    width: 100%;
    height: 100px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    overflow: hidden;
}

.group-card-image img{
    height:100%;
    width:100%;
}

.group-card-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 60px;
}

.group-card-content h2 {
    font-size: 16px;
}

.group-card-content p {
    background-color: var(--dark-blue);
    color: #fff;
    padding: 16px;
    border-radius: 16px;
    transform: translateY(-20px);
}
</style>
  
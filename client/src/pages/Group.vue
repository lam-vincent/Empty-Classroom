<template>
  <main-layout>
    <div class="group-page">
      <h1>Connect to People, One Group at a Time</h1>

      <!-- List of groups in which the user is a member -->
      <section>
        <h2>Joined Groups</h2>

        <div class="display-case">
          <GroupCapsule v-for="(objet) in groupData.joinedGroups" :group="objet" @groupListUpdated="fetchAllGroups();" />
        </div>

      </section>


      <!-- Form to create a new group -->
      <section>
        <h2>Create a New Group</h2>
        <form @submit.prevent="createGroup()">
          <input type="text" v-model="groupCreationData.groupName" placeholder="Group Name" required />
          <input type="text" v-model="groupCreationData.groupSize" placeholder="Group Member Limit" required />
          <select v-model="groupCreationData.groupState">
            <option value="private">private</option>
            <option value="public">public</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </section>

      <!-- List of public groups in which the user is not a member and can join -->
      <section>
        <h2>Public Groups to Join</h2>

        <div class="display-case">
          <GroupCapsule v-for="(objet) in groupData.publicGroups" :group="objet" @groupListUpdated="fetchAllGroups();" />
        </div>

      </section>

    </div>
  </main-layout>
</template>

<script lang="ts">
import axios from "axios"
import GroupCapsule from "../components/Capsule/GroupCapsule.vue";
import { generatePassword } from "../utils/utils";
import { readToken } from "../utils/authUtils";

export default {
    beforeMount(){
      this.fetchAllGroups();
    },
    data() {
        return {
            groupData: {
                fetchedGroups: [],
                joinedGroups: [],
                publicGroups: []
            },
            groupCreationData: {
              groupName:"",
              groupSize:"",
              groupState:"",
              groupPassword:""
            }
        };
    },
    methods: {
        async fetchAllGroups() {
            try {
                this.groupData.fetchedGroups.length = 0;
                const response = await axios.get('http://localhost:3000/groups', {
                    withCredentials: true, headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173/'
                    }
                });
                this.groupData.fetchedGroups = response.data;
                // this.groupData.joinedGroups = [...this.groupData.fetchedGroups];
                this.groupData.publicGroups = [...this.groupData.fetchedGroups];
                this.fetchJoinedGroups();
            }
            catch (error) {
                console.error("Error fetching groups : " + error);
            }
        },async createGroup(){
            try {
              let formattedDate = new Date().toISOString().slice(0, 10);
              let OwnerId = readToken().userId;
              console.log("createur : "+OwnerId);
              if(this.groupCreationData.groupState == "private"){ 
                this.groupCreationData.groupPassword = generatePassword() 
              } else { this.groupCreationData.groupPassword = ""}
              // group_p
                  const response = await axios.post('http://localhost:3000/groups', {
                    Group_Creation:formattedDate,
                    Group_Password:this.groupCreationData.groupPassword,
                    Group_Name:this.groupCreationData.groupName,
                    Group_Size:this.groupCreationData.groupSize,
                    Group_State:this.groupCreationData.groupState,
                    Group_Owner:OwnerId
                  } , {
                      withCredentials: true, headers: {
                          'Access-Control-Allow-Origin': 'http://localhost:5173/'
                      }
                  });

                  this.fetchAllGroups();
              }
              catch (error) {
                  console.error("Error creating group : " + error);
              }
        },
        fetchJoinedGroups(){
          this.groupData.joinedGroups.length = 0;
          const userId = readToken().userId;

      const elementsFiltres = this.groupData.fetchedGroups.filter((element) =>
        element.Belonging.some((belonging) => belonging.id_user === userId)
      );
      // console.log(this.groupData.fetchedGroups[0].Belonging.find((belonging) => belonging.id_user === userId))
      // Ajouter les éléments filtrés au tableau vide
      this.groupData.joinedGroups.push(...elementsFiltres);
    }
  },
  components: { GroupCapsule }
};
</script>

<style scoped>
.group-page h1 {
  margin-bottom: 40px;
}

.display-case {
  display: flex;
  overflow: scroll;
}

.group-card {
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

.group-card-image {
  width: 100%;
  height: 100px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
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

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>

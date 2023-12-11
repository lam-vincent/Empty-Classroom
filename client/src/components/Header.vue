<template>
  <header class="header">

    <Modal ref="modalProfileDetails" @close="">
      <template v-slot:header-title>
            <h3 class="profile-title">{{userData.User_Name}}'s profile</h3>
            <!-- <h3>for {{ room.Room_Category }} {{ room.Room_Building + room.Room_Name }}</h3> -->
        </template>
        <template v-slot:form-input-1>
          <div class="profile-image">
            <img :src="currentUserData.User_Picture || '../../public/logo-rounded1.png'">
            <div class="profile-image-wrapper" @click="triggerFileInput">
              Edit picture
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg> -->
              <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload">
            </div>
          </div>
        </template>
        <template v-slot:form-input-description>
            <label for="form-input-description">Description</label>
            <textarea v-model="currentUserData.User_Description" name="form-input-description" id="form-input-description" cols="30" rows="5"
            :placeholder="`tell us something nice about you!`"></textarea>
        </template>
        <template v-slot:form-input-5>
            <label for="form-input-5">Class</label>
            <input v-model="currentUserData.User_Class" type="text" placeholder="A" />
        </template>
        <template v-slot:form-input-6>
            <label for="form-input-6">Promo</label>
            <input v-model="currentUserData.User_Promo" type="text" placeholder="A" />
        </template>
        <template v-slot:modal-button>
            <button @click="editProfile();" class="save-profile-btn">Save the Changes</button>
        </template>
    </Modal>

    <button class="square-button" @click="toggleMenuDropdown" ref="dropdownButton">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        height="40px" width="40px">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
      <div v-if="showDropdown" class="dropdown-content">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/find">Find</a></li>
          <li><a href="/group">Group</a></li>
          <li><a href="/reserve">Reserve</a></li>
        </ul>
      </div>
    </button>

    <div class="header-actions" @click="toggleDropdown">
      <div class="header-actions-btn">
        <span>{{ userData.User_Name }}</span>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            height="40px" width="40px">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <button class="edit-profile-btn" @click="openModalDetails('modalProfileDetails')">Edit Profile</button>
        <button class="logout-btn" @click="handleLogout()">Logout</button>
      </div>
    </div>
  </header>
  
</template>

<script lang="ts">
import { logout,readToken } from "../utils/authUtils";
import Modal from "./Modal.vue";
import axios from "axios"

export default {
  name: "Header",
  components:{
    Modal
  },
  data() {
    return {
      loggedIn: true,
      showDropdown: false,
      isDropdownOpen: false,
      userData:{
        User_Name:""
      },
      currentUserData:{

      }
    };
  },
  methods: {
    toggleMenuDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleLogout() {
      logout();
    },
    closeDropdownOnOutsideClick(event:any) {
      // Fermer le menu déroulant si le clic est en dehors du header-actions
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
        window.removeEventListener('click', this.closeDropdownOnOutsideClick);
      }
    },
    openModalDetails(reference: string) {
            (this.$refs[reference] as any).open();
    },
    async fetchUserInfos(){
      try {
        console.log("fetching user infos...");
        const response = await axios.get(`http://localhost:3000/user/${readToken().userId}`, {
          withCredentials: true, headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5173/'
          }
        });
        this.userData = response.data[0];
        this.currentUserData = {...this.userData};
        delete this.currentUserData.User_Name;
        delete this.currentUserData.User_Role;
        console.log(this.currentUserData)
      } catch (error) {
        alert("Failed fetching user infos.");
      }
    },
    async editProfile(){
      try {
        const response = await axios.put(`http://localhost:3000/user/${readToken().userId}`,this.currentUserData, {
          withCredentials: true, headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5173/',
            'Content-Type': 'application/json'
          }
        });
        alert("Sucessfully edited user profile");
        this.fetchUserInfos();
        // this.userData = response.data[0];
        // this.currentUserData = this.userData;
        // console.log(this.userData);
      } catch (error) {
        alert("Failed fetching user infos.");
      }
    },
    triggerFileInput(){
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Handle the file as needed
          const reader = new FileReader();
          reader.onloadend = () => {
            this.currentUserData.User_Picture = reader.result;
          };
          reader.readAsDataURL(file);
        }
      },
  },
  beforeMount(){
    this.fetchUserInfos();
  },
  mounted() {
    // Ajouter un gestionnaire d'événements pour fermer le menu déroulant lors d'un clic à l'extérieur
    window.addEventListener('click', this.closeDropdownOnOutsideClick);
  },
  beforeDestroy() {
    // Nettoyer les gestionnaires d'événements lors de la destruction du composant
    window.removeEventListener('click', this.closeDropdownOnOutsideClick);
  },
};

</script>

<style scoped>

.header {
  background-color: var(--light-gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.square-button {
  margin: 1rem;
  background-color: #fff;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-top: 5px;
}

.header-actions {
  display: flex;
  align-items: center;
  flex-direction:column;
  background-color: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  cursor:pointer;
  user-select:none;
}

.header-actions-btn{
  display:flex;
  align-items:center;
  justify-content:center;
}

.header-actions span {
  padding-left: 8px;
  padding-left: 10px;
}

.header-actions svg {
  padding-top: 3px;
}


.dropdown-menu{
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  position:absolute;
  padding-top:20px;
  top:70px;
  padding:5px;
  width:130px;
  box-sizing:border-box;
  height:100px;
  /* top:20px; */
}

/* remove styling on button */
button {
  background: none;
  border: none;
  cursor: pointer;
}

/* remove styling on ul */
ul {
  list-style: none;
  padding: 0;
}

/* remove styling on a */
a {
  text-decoration: none;
  color: #000;
}

.edit-profile-btn{
  background:var(--blue);
  color: #fff;
  border: none;
  width:90%;
  height:30px;
  border-radius:6px;
  cursor: pointer;
  outline: none;
}

.save-profile-btn{
  background:var(--blue);
  color: #fff;
  border: none;
  width:90%;
  height:40px;
  border-radius:6px;
  cursor: pointer;
  outline: none;
  margin-top:20px;
}
.logout-btn{
  background:var(--red);
  color: #fff;
  border: none;
  width:90%;
  height:30px;
  border-radius:6px;
  cursor: pointer;
  outline: none;
  margin-top:4px;
}

.profile-image{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border:2px solid rgba(0, 0, 0, 0.1);
  border-radius:100%;
  cursor:pointer;
  margin-left:auto;
  margin-right:auto;
  width:120px;
  height:120px;
  margin-bottom:50px;
  display:flex;
  justify-content: center;
  align-items:center;
}

.profile-image img{
  width:90%;
  height:90%;
  border:2px solid rgba(0, 0, 0, 0.2);
  border-radius:100%;
}

.profile-image-wrapper{
  position:absolute;
  width:110px;
  height:110px;
  border-radius:100%;
  display:flex;
  justify-content: center;  
  align-items: center;
  opacity:0;
  color:#FFF;
  font-size:10px;
}

.profile-image-wrapper:hover{
  background:rgba(0, 0, 0, 0.6);
  display:flex;
  opacity:1;
}


.form-input-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.form-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.form-input-description label,
.form-input label {
    width: auto;
    margin-bottom: 5px;
    font-size: 14px;
    color: var(--dark-gray);
}

.form-input-description textarea {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
    resize:none;
}

.form-input input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
}

</style>

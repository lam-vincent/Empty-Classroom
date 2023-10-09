<template>
  <header class="header">

    <button class="square-button" @click="toggleDropdown" ref="dropdownButton">
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

    <div class="header-actions">
      <span>{{ username }}</span>
      <button @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          height="40px" width="40px">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script lang="ts">

export default {
  name: "Header",
  data() {
    return {
      loggedIn: true,
      username: "Vincent LAM",
      showDropdown: false,
    };
  },
  methods: {
    logout() {
      console.log("logout");
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
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
  background-color: #fff;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;
}

.header-actions span {
  padding-left: 8px;
  padding-left: 10px;
}

.header-actions svg {
  padding-top: 3px;
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
</style>

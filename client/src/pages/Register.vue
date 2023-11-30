<template>
  <auth-layout>
    <div class="register-page">

      <div class="login-form">
        <h1>Login</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <span></span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <span></span>
        </div>
        <a href="/register">Don't have an account? Sign up here.</a>
        <span>Sign In</span>
      </div>

      <div class="register-message">
        <h1>Hello, Friend!</h1>
        <p>Register with your personal details to access all site features.</p>
      </div>

      <div class="register-form">
        <h1>Register</h1>
        <form @submit="registerUser">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="registrationData.username" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="registrationData.email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="registrationData.password" required />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select v-model="registrationData.role">
              <option value="user">User</option>
              <option value="admin">Moderator</option>
            </select>
          </div>
          <a href="/login">Already have an account? Sign in here.</a>
          <button type="submit">Sign Up</button>
        </form>

      </div>

    </div>
  </auth-layout>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      registrationData: {
        username: "",
        email: "",
        password: "",
        role: "user",
      },
    };
  },
  methods: {
    registerUser() {
      axios
        .post("http://localhost:3000/api/auth/register", this.registrationData)
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.register-page {
  text-align: center;
  display: flex;
  height: 400px;
}

.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 50%;
  opacity: 1;
  animation: slideIn 1s ease-in-out;
  z-index: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(-10rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
  }
}

.form-group {
  margin-bottom: 10px;
}

.register-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 50%;
  text-align: center;
  background-color: var(--dark-blue);
  color: #fff;
  border-radius: 30px;
  border-bottom-right-radius: 150px;
  border-top-right-radius: 150px;
  animation: slideMessageIn 1s ease-in-out;
  z-index: 1000;
}

@keyframes slideMessageIn {
  from {
    transform: translateX(20rem);
    border-radius: 30px;
    border-bottom-left-radius: 150px;
    border-top-left-radius: 150px;
  }

  to {
    transform: translateX(0);
  }
}

/* the 4 following classes for the fake form. Make the illusion that we are on the same page.*/
.login-form {
  position: absolute;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 64px;
  width: 50%;
  opacity: 0;
  animation: fade 1s;
}

@keyframes fade {
  from {
    opacity: 1;
  }

  to {
    opacity: 1;
  }
}

.login-form span {

  display: block;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  margin-left: 108px;
  margin-right: 108px;
  border-radius: 8px;
  color: #fff;
  background-color: var(--dark-blue);
}

.login-form a {
  display: block;
  margin-bottom: 5px;
}

.form-group span {
  display: block;
  margin-bottom: 5px;
  padding: 18px;
  margin-left: 56px;
  margin-right: 56px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: inherit;
}


h1 {
  margin-block-start: 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background-color: var(--dark-blue);
  color: #fff;
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: var(--blue);
}

a {
  color: #000;
  text-decoration: none;
  font-size: 14px;
}

/* media query */
@media (max-width: 768px) {

  a {
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .login-form {
    display: none;
  }
}

@media (max-width: 480px) {

  a {
    font-size: 10px;
  }

  .register-message {
    display: none;
  }

  .register-form {
    width: 100%;
  }
}

@media (max-width: 360px) {}

@media (max-width: 320px) {

  a {
    font-size: 8px;
  }
}
</style>

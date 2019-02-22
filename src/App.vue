<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="home-link">Home</router-link>
      <router-link to="/settings" class="settings-link fas fa-cog"></router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-size: 1.4em;
  display: flex;
  justify-content: space-between;
}

#nav a {
  padding: 15px;
  font-weight: bold;
  color: #809b7f;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #1d7108;
}
</style>

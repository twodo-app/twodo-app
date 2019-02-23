<template>
  <div id="app">
    <div id="nav">
      <router-link :to="username ? { name: 'user', params: { id: username }} : '/'" class="todos-link">
        <img class="app-icon" src="android-chrome-192x192.png">
        Todos</router-link>
      <router-link to="/settings" class="settings-link fas fa-cog"></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.settings.userName;
    },
  },
  mounted() {
    // Find out if there is a cookie
    const username = document.cookie.split(";").filter((cookie) =>
      cookie.trim().startsWith("username="));

    if (this.$router.params && this.$router.params.id) {
      console.log(this.$router.params.id);
      this.$store.dispatch("setUser", this.$router.params.id);
      this.$store.dispatch("loadTodos");
    } else if (username.length) {
      this.$store.dispatch("setUser", username[0].split("=")[1]);
      this.$router.replace({
        name: "user", params: { id: username[0].split("=")[1] },
      });
      this.$store.dispatch("loadTodos");
    } else {
      this.$store.dispatch("initUser");
    }
  },
  watch: {
    "$route" (to, from) {
      if (this.$route.params.id) {
        this.$store.dispatch("setUser", this.$route.params.id);
        this.$store.dispatch("loadTodos");
      }
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.todos-link {
  display: flex;
  align-items: flex-end;
}
.app-icon {
  width: 30px;
  height: 30px;
  padding-right: 10px;
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

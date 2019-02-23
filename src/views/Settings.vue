<template>
  <div class="settings">
    <h1>Settings</h1>
    <p>User ID: <span class="monospace">{{userName}}</span></p>
    <div @click="saveCookie" class="cookie-button">Save this username as a cookie for a day.</div>
    <div class="app-description">This username is randomly generated, and all todos saved under this
      user will be deleted daily. The app is just a prototype, so feel free to fork it and run your
      own server that stores todos more permanently.
    </div>
    <div class="links-container">
      <a href="https://github.com/twodo-app/twodo-app/"
         target="_blank"
         class="github-link"><i class="fab fa-github"></i>View client source on Github</a>
      <a href="https://github.com/twodo-app/twodo-server/"
         target="_blank"
         class="github-link"><i class="fab fa-github"></i>View server source on Github</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userName: function() {
      return this.$store.state.settings.userName;
    },
  },
  methods: {
    saveCookie() {
      const expiryDate = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
      document.cookie = `username=${this.userName}; expires=${expiryDate}`;
      alert(`Username ${this.userName} saved as a cookie for one day.`);
    },
  },
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.monospace {
  font-family: monospace;
  font-size: 1.1rem;
  color: #6f6060;
  padding: 3px 6px;
}

.app-description {
  max-width: 500px;
  color: #343434;
  text-align: left;
  padding: 8px;
  margin: 10px;
}

.cookie-button {
  border-radius: 4px;
  background-color: #e0f0e0;
  width: 280px;
  max-width: 90%;
  padding: 12px;
  margin: 15px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px #cbcbcb;
  transition: all 100ms;
}
.cookie-button:hover {
  background-color: #98c598;
  box-shadow: 0px 1px 3px 2px #cbcbcb;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.github-link {
  text-decoration: none;
  font-weight: bold;
  color: #007529;
  padding: 15px;
  border-radius: 4px;
}
.github-link * {
  padding: 2px 5px;
}
.github-link:hover {
  color: #208539;
  background-color: #e0f0e0;
}
</style>

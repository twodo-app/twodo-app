<template>
  <div class="home">
    <todo-list/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoList from "@/components/TodoList.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "home",
  components: {
    TodoList,
  },
});
</script>

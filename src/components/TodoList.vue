<template>
  <div class="todo-list">
    <input type="text"
      class="new-todo-input"
      v-model="newTodoTitle"
      placeholder="Enter new todo..."
      @keypress.enter="addTodo">
    <span class="toggle-complete-button"
          :class="{'toggle-complete_show': displayComplete}"
          @click="toggleDisplayComplete">☑</span>
    <div v-if="loadingTodos" class="loading-message">Loading todos...</div>
    <div v-if="failedToLoad" class="failed-loading-message">Failed to load todos.</div>
    <div v-show="!loadingTodos && !failedToLoad">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import TodoItem from "./TodoItem";

export default Vue.extend({
  data() {
    return {
      newTodoTitle: "",
      loadingTodos: true,
      failedToLoad: false,
    };
  },
  components: {
    TodoItem,
  },
  computed: {
    ...mapGetters([
      "todos",
      "displayComplete",
    ]),
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle.trim() !== "") {
        this.$store.dispatch("addTodo", {
          title: this.newTodoTitle,
          created: Date.now(),
          description: "",
          priority: 0,
          due: 0,
          estimated: 0,
        }).then((res) => {
          this.newTodoTitle = "";
        }).catch((err) => {
          alert(err);
        });
      }
    },
    toggleDisplayComplete() {
      this.$store.dispatch("toggleDisplayComplete");
    },
  },
  mounted() {
    this.$store.dispatch("loadTodos")
      .then((res) => {
        this.loadingTodos = false;
      })
      .catch((err) => {
        this.loadingTodos = false;
        this.failedToLoad = true;
      });
  },
});
</script>

<style>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
}

.new-todo-input {
  width: 80%;
  max-width: 380px;
  padding: 8px;
  margin: 12px;
  font-size: 1.2em;
  color: #505050;
  border: none;
  border-radius: 4px;
  background-color: #ececec;
  box-shadow: 0px 1px 3px 0px #ddd;
  transition: box-shadow 200ms;
}
.new-todo-input:focus {
  outline: none;
  box-shadow: 0px 2px 4px 1px #d4d4d4;
}

.toggle-complete-button {
  max-width: 80px;
  font-size: 1.5rem;
  color: #aaa;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 5px 8px;
  cursor: pointer;
}
.toggle-complete-button:hover {
  box-shadow: 0px 1px 3px 1px #cbcbcb;
}
.toggle-complete_show {
  color: #007529;
  background-color: #e5e5e5;
}

.failed-loading-message {
  width: 80%;
  max-width: 600px;
  padding: 10px;
  margin: 10px auto;
  border: 2px solid #c76a6a;
  border-radius: 6px;
  font-style: italic;
  font-weight: bold;
  color: #a73839;
  background-color: #f1d0d0;
}

.loading-message {
  width: 80%;
  max-width: 600px;
  padding: 10px;
  margin: 10px auto;
  border: 2px solid #ffeebc;
  border-radius: 6px;
  font-weight: bold;
  color: #c7ac14;
  background-color: #fffce8;
  transition: max-height 1000ms;
}
</style>

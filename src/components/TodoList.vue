<template>
  <div class="todo-list">
    <div class="input-box-wrapper">
      <input type="text"
        class="new-todo-input"
        v-model="newTodoTitle"
        placeholder="Enter new todo..."
        @keypress.enter="addTodo"
        v-focus>
      <i class="new-todo-input_submit fas fa-angle-right"
        @click="addTodo"></i>
      <div class="toggle-complete-button"
            @click="toggleDisplayComplete">
        <span>Show complete</span>
        <i class="fa-check-square toggle-complete_checkbox"
           :class="{'toggle-complete_show fas': displayComplete, far: !displayComplete}">
        </i>
      </div>
    </div>
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
  directives: {
    focus: {
      inserted: (el) => el.focus(),
    },
  },
});
</script>

<style>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
}

.input-box-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-todo-input {
  width: 80%;
  max-width: 380px;
  padding: 8px;
  padding-right: 36px;
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
.new-todo-input_submit {
  position: relative;
  right: 50px;
  padding: 0px 12px;
  color: #ccc;
  font-size: 30px;
  cursor: pointer;
}
.new-todo-input_submit:hover {
  color: #9e9e9e;
}

.toggle-complete-button {
  display: flex;
  align-items: center;
  max-width: 80px;
  font-size: 0.85rem;
  color: #aaa;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 4px 8px;
  cursor: pointer;
}
.toggle-complete-button:hover {
  box-shadow: 0px 1px 3px 1px #cbcbcb;
}
.toggle-complete_checkbox {
  font-size: 1.5rem;
  margin: 6px;
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

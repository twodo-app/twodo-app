<template>
  <div class="todo-list">
    <input type="text" v-model="newTodoTitle" @keypress.enter="addTodo">
    <div class="todo-item" v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :value="todo.complete">
      <span>{{todo.title}}</span>
      <button @click="deleteTodo(todo.id)">🗙</button>
      <span>{{todo.created}}</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Todo } from "../types/todo";

export default Vue.extend({
  computed: {
    todos: function() {
      return this.$store.state.todos;
    },
    newTodoTitle: {
      get: function() {
        return this.$store.state.newTodoTitle;
      },
      set: function(newTodoTitle) {
        this.$store.dispatch("updateTodoTitle", newTodoTitle);
      },
    },
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo");
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
  },
});
</script>
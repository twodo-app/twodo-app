<template>
  <div class="todo-list">
    <input type="text"
      class="new-todo-input"
      v-model="newTodoTitle"
      placeholder="Enter new todo..."
      @keypress.enter="addTodo">
    <div class="todo-item" v-for="todo in todos" :key="todo.id">
      <div class="todo-checkbox"
        :class="{ 'todo-checkbox_checked': todo.complete,
                  'todo-checkbox_unchecked': !todo.complete }"
        :value="todo.complete"
        @click="toggleComplete(todo.id)">
          <div v-show="todo.complete">✔</div>
        </div>
        <div class="todo-title"
          :class="{'todo-title_complete': todo.complete}">{{todo.title}}</div>
      <div class="created-time"
        :title="getLongDate(todo.created)">
        {{getShortDate(todo.created)}}
      </div>
      <div class="button button-delete" @click="deleteTodo(todo.id)">🗙</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Todo } from "../types/todo";
import { DateTime } from "luxon";

export default Vue.extend({
  data() {
    return {
      newTodoTitle: "",
    };
  },
  computed: {
    todos: function() {
      return this.$store.state.todos;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodoTitle.trim() !== "") {
        this.$store.dispatch("addTodo", {
          title: this.newTodoTitle,
          created: DateTime.local().toMillis(),
        }).then((res) => {
          this.newTodoTitle = "";
        }).catch((err) => {
          alert(err);
        });
      }
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    toggleComplete(id) {
      this.$store.dispatch("toggleComplete", id);
    },
    getShortDate(ts_millis) {
      return DateTime.fromMillis(ts_millis).toFormat("HH:mm d MMM");
    },
    getLongDate(ts_millis) {
      return DateTime.fromMillis(ts_millis).toLocaleString(DateTime.DATETIME_FULL);
    },
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

.todo-item {
  display: flex;
  max-width: 600px;
  align-items: center;
  margin: 5px;
}
.todo-item:hover {
  background-color: #f8f8f8;
}

.todo-checkbox {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
}
.todo-checkbox_unchecked {
  border: 2px solid #b6b6b6;
}
.todo-checkbox_checked {
  color: #007529;
  border: 2px solid transparent;
}
.todo-checkbox:hover {
  border: 2px solid transparent;
}
.todo-checkbox_unchecked:hover:after {
  content: "✔";
  color: #007529;
}

.todo-title {
  flex-grow: 1;
  min-width: 200px;
  padding: 5px 10px;
  word-wrap: break-word;
  text-align: left;
}
.todo-title_complete {
  font-style: italic;
  text-decoration: line-through;
  color: #666;
}

.created-time {
  font-size: 0.9em;
  color: #888;
  min-width: 160px;
  flex-grow: 0;
}

.button {
  cursor: pointer;
  width: 25px;
  height: 25px;
}

.button-delete {
  flex-shrink: 0;
  color: #DD0426;
  background-color: #e2e2e2;
  border-radius: 3px;
}
.button-delete:hover {
  box-shadow: 0px 1px 3px 1px #cbcbcb;
}
</style>

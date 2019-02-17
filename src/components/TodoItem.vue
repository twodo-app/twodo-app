<template>
  <div class="todo-item">
    <div class="todo-checkbox"
         :class="{ 'todo-checkbox_checked': todo.complete,
         'todo-checkbox_unchecked': !todo.complete }"
         :value="todo.complete"
         @click="toggleComplete(todo)">
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
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: [ "todo" ],
  methods: {
    toggleComplete(todo) {
      const updatedTodo = Object.assign(todo, {complete: !todo.complete});
      this.$store.dispatch("updateTodo", updatedTodo);
    },
    getShortDate(ts_millis) {
      return DateTime.fromMillis(ts_millis).toFormat("HH:mm d MMM");
    },
    getLongDate(ts_millis) {
      return DateTime.fromMillis(ts_millis).toLocaleString(DateTime.DATETIME_FULL);
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
  },
};
</script>

<style>
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

import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid";
import { DateTime } from "luxon";

import { Todo } from "../types/todo";

interface State {
  newTodoName: string;
  todos: Todo[];
}
interface Mutations {
  UPDATE_TODO_TITLE: string;
  ADD_TODO: string;
  DELETE_TODO: string;
  TOGGLE_COMPLETE: string;
}

const mutations: Mutations = {
  UPDATE_TODO_TITLE: "updateTodoTitle",
  ADD_TODO: "addTodo",
  DELETE_TODO: "deleteTodo",
  TOGGLE_COMPLETE: "toggleComplete",
};

Vue.use(Vuex);

const initialState: State = {
  newTodoName: "",
  todos: [],
};

const store = new Vuex.Store({
  state: initialState,

  mutations: {
    updateTodoTitle(state, title) {
      state.newTodoName = title;
    },
    addTodo(state) {
      const todo: Todo = {
        id: uuidv4(),
        title: state.newTodoName,
        complete: false,
        created: DateTime.local(),
      };
      state.todos.push(todo);
      state.newTodoName = "";
    },
    deleteTodo(state, todoID) {
      state.todos = state.todos.filter((todo) => todo.id !== todoID);
    },
    toggleComplete(state, todoID) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === todoID) {
          todo.complete = !todo.complete;
        }
        return todo;
      });
    },
  },

  actions: {
    updateTodoTitle({ commit }, title) {
      commit(mutations.UPDATE_TODO_TITLE, title);
    },
    addTodo({ commit }) {
      commit(mutations.ADD_TODO);
    },
    deleteTodo({ commit }, todoID) {
      commit(mutations.DELETE_TODO, todoID);
    },
    toggleComplete({ commit }, todoID) {
      commit(mutations.TOGGLE_COMPLETE, todoID);
    },
  },
});

export default store;

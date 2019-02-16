import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid";
import axios from "axios";

import { Todo } from "../types/todo";

interface State {
  todos: Todo[];
}
interface Mutations {
  ADD_TODO: string;
  DELETE_TODO: string;
  TOGGLE_COMPLETE: string;
}

const mutations: Mutations = {
  ADD_TODO: "addTodo",
  DELETE_TODO: "deleteTodo",
  TOGGLE_COMPLETE: "toggleComplete",
};

Vue.use(Vuex);

const initialState: State = {
  todos: [],
};

const store = new Vuex.Store({
  state: initialState,

  mutations: {
    addTodo(state, data) {
      state.todos.push(data);
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
    addTodo({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/api/test/todos", data)
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              commit(mutations.ADD_TODO, res.data);
              resolve(res);
            } else {
              throw new Error(res.statusText);
            }
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
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

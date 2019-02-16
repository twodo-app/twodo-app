import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { Todo } from "../types/todo";

interface State {
  todos: Todo[];
  displayComplete: boolean;
}
interface Mutations {
  LOAD_TODOS: string;
  ADD_TODO: string;
  DELETE_TODO: string;
  UPDATE_TODO: string;
  TOGGLE_DISPLAY_COMPLETE: string;
}

const mutations: Mutations = {
  LOAD_TODOS: "loadTodos",
  ADD_TODO: "addTodo",
  DELETE_TODO: "deleteTodo",
  UPDATE_TODO: "updateTodo",
  TOGGLE_DISPLAY_COMPLETE: "toggleDisplayComplete",
};

Vue.use(Vuex);

const initialState: State = {
  todos: [],
  displayComplete: false,
};

const store = new Vuex.Store({
  state: initialState,

  getters: {
    incompleteTodos: (state) => {
      return state.todos.filter((todo) => !todo.complete);
    },
    completeTodos: (state) => {
      return state.todos.filter((todo) => todo.complete);
    },
  },

  mutations: {
    addTodo(state, data) {
      // Filter out duplicates that have already been loaded
      state.todos = state.todos.filter((todo) => data.id !== todo.id);
      state.todos.push(data);
    },
    deleteTodo(state, todoID) {
      state.todos = state.todos.filter((todo) => todo.id !== todoID);
    },
    updateTodo(state, updatedTodo) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    },
    toggleDisplayComplete(state) {
      state.displayComplete = !state.displayComplete;
    },
  },

  actions: {
    loadTodos({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/test/todos")
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              res.data.forEach((todo: Todo) => {
                commit(mutations.ADD_TODO, todo);
              });
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
    updateTodo({ commit }, todo) {
      axios
        .post(`http://localhost:3000/api/test/todos/${todo.id}`, todo)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            commit(mutations.UPDATE_TODO, res.data);
          } else {
            throw new Error(res.statusText);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    toggleDisplayComplete({ commit }) {
      commit(mutations.TOGGLE_DISPLAY_COMPLETE);
    },
  },
});

export default store;

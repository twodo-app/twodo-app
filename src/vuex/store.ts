import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { Todo } from "../types/todo";

Vue.use(Vuex);
const apiRoot: string = "https://twodo-app-server.herokuapp.com/api/v1/";

interface State {
  todos: Todo[];
  loadingState: "loading" | "complete" | "failed";
  settings: {
    userName: string;
    displayComplete: boolean;
  };
}
interface Mutations {
  UPDATE_USER: string;
  LOAD_TODOS: string;
  CLEAR_TODOS: string;
  UPDATE_LOADING_STATE: string;
  ADD_TODO: string;
  DELETE_TODO: string;
  UPDATE_TODO: string;
  TOGGLE_DISPLAY_COMPLETE: string;
}

const mutations: Mutations = {
  UPDATE_USER: "updateUser",
  LOAD_TODOS: "loadTodos",
  CLEAR_TODOS: "clearTodos",
  UPDATE_LOADING_STATE: "updateLoadingState",
  ADD_TODO: "addTodo",
  DELETE_TODO: "deleteTodo",
  UPDATE_TODO: "updateTodo",
  TOGGLE_DISPLAY_COMPLETE: "toggleDisplayComplete",
};

const initialState: State = {
  todos: [],
  loadingState: "loading",
  settings: {
    userName: "",
    displayComplete: false,
  },
};

const store = new Vuex.Store({
  state: initialState,

  getters: {
    todos: (state) => {
      const incompleteTodos = state.todos.filter((todo) => !todo.complete);
      const completeTodos = state.todos.filter((todo) => todo.complete);
      return state.settings.displayComplete
        ? incompleteTodos.concat(completeTodos)
        : incompleteTodos;
    },
    displayComplete: (state) => state.settings.displayComplete,
    loadingState: (state) => state.loadingState,
  },

  mutations: {
    updateUser(state, userName) {
      state.settings.userName = userName;
    },
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
      state.settings.displayComplete = !state.settings.displayComplete;
    },
    updateLoadingState(state, newState) {
      state.loadingState = newState;
    },
    clearTodos(state) {
      state.todos = [];
    },
  },

  actions: {
    initUser({ commit }) {
      axios
        .get(apiRoot + "user")
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            commit(mutations.UPDATE_USER, res.data);
          } else {
            throw new Error(res.statusText);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      commit(mutations.UPDATE_LOADING_STATE, "complete");
    },
    setUser({ commit }, userName) {
      commit(mutations.UPDATE_USER, userName);
    },
    loadTodos({ commit, state }) {
      commit(mutations.CLEAR_TODOS);
      axios
        .get(apiRoot + `todos/${state.settings.userName}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            res.data.forEach((todo: Todo) => {
              commit(mutations.ADD_TODO, todo);
            });
            commit(mutations.UPDATE_LOADING_STATE, "complete");
          } else {
            throw new Error(res.statusText);
          }
        })
        .catch((err) => {
          console.error(err);
          commit(mutations.UPDATE_LOADING_STATE, "failed");
        });
    },
    addTodo({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(apiRoot + "todos", data)
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
    deleteTodo({ commit, state }, todoID) {
      axios
        .delete(apiRoot + `todos/${state.settings.userName}/${todoID}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            commit(mutations.DELETE_TODO, todoID);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateTodo({ commit, state }, todo) {
      axios
        .post(apiRoot + `todos/${state.settings.userName}/${todo.id}`, todo)
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

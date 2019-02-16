import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid";
import axios from "axios";

import { Todo } from "../types/todo";

interface State {
  todos: Todo[];
}
interface Mutations {
  LOAD_TODOS: string;
  ADD_TODO: string;
  DELETE_TODO: string;
  UPDATE_TODO: string;
}

const mutations: Mutations = {
  LOAD_TODOS: "loadTodos",
  ADD_TODO: "addTodo",
  DELETE_TODO: "deleteTodo",
  UPDATE_TODO: "updateTodo",
};

Vue.use(Vuex);

const initialState: State = {
  todos: [],
};

const store = new Vuex.Store({
  state: initialState,

  mutations: {
    addTodo(state, data) {
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
  },
});

export default store;

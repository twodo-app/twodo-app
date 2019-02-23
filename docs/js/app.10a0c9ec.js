(function(t){function e(e){for(var s,i,r=e[0],c=e[1],d=e[2],u=0,p=[];u<r.length;u++)i=r[u],n[i]&&p.push(n[i][0]),n[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);l&&l(e);while(p.length)p.shift()();return a.push.apply(a,d||[]),o()}function o(){for(var t,e=0;e<a.length;e++){for(var o=a[e],s=!0,r=1;r<o.length;r++){var c=o[r];0!==n[c]&&(s=!1)}s&&(a.splice(e--,1),t=i(i.s=o[0]))}return t}var s={},n={app:0},a=[];function i(e){if(s[e])return s[e].exports;var o=s[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=s,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/twodo-app/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var d=0;d<r.length;d++)e(r[d]);var l=c;a.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("cd49")},"034f":function(t,e,o){"use strict";var s=o("64a9"),n=o.n(s);n.a},2717:function(t,e,o){"use strict";var s=o("f857"),n=o.n(s);n.a},"64a9":function(t,e,o){},6959:function(t,e,o){"use strict";var s=o("e074"),n=o.n(s);n.a},b694:function(t,e,o){},cd49:function(t,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("f751"),o("097d");var s=o("2b0e"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("div",{attrs:{id:"nav"}},[o("router-link",{staticClass:"todos-link",attrs:{to:t.username?{name:"user",params:{id:t.username}}:"/"}},[o("img",{staticClass:"app-icon",attrs:{src:"android-chrome-192x192.png"}}),t._v("\n      Todos")]),o("router-link",{staticClass:"settings-link fas fa-cog",attrs:{to:"/settings"}})],1),o("router-view")],1)},a=[],i=(o("a481"),o("f559"),o("28a5"),{computed:{username:function(){return this.$store.state.settings.userName}},mounted:function(){var t=document.cookie.split(";").filter(function(t){return t.trim().startsWith("username=")});this.$router.params&&this.$router.params.id?(console.log(this.$router.params.id),this.$store.dispatch("setUser",this.$router.params.id),this.$store.dispatch("loadTodos")):t.length?(this.$store.dispatch("setUser",t[0].split("=")[1]),this.$router.replace({name:"user",params:{id:t[0].split("=")[1]}}),this.$store.dispatch("loadTodos")):this.$store.dispatch("initUser")},watch:{$route:function(t,e){this.$route.params.id&&(this.$store.dispatch("setUser",this.$route.params.id),this.$store.dispatch("loadTodos"))}}}),r=i,c=(o("034f"),o("2877")),d=Object(c["a"])(r,n,a,!1,null,null,null),l=d.exports,u=o("8c4f"),p=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home"},[o("todo-list")],1)},f=[],m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-list"},[o("div",{staticClass:"input-box-wrapper"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodoTitle,expression:"newTodoTitle"},{name:"focus",rawName:"v-focus"}],staticClass:"new-todo-input",attrs:{type:"text",placeholder:"Enter new todo..."},domProps:{value:t.newTodoTitle},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodoTitle=e.target.value)}}}),o("i",{staticClass:"new-todo-input_submit fas fa-angle-right",class:{"valid-input-text":""!==t.newTodoTitle.trim()},on:{click:t.addTodo}}),o("div",{staticClass:"toggle-complete-button",on:{click:t.toggleDisplayComplete}},[o("span",[t._v("Show complete")]),o("i",{staticClass:"fa-check-square toggle-complete_checkbox",class:{"toggle-complete_show fas":t.displayComplete,far:!t.displayComplete}})])]),"loading"===t.loadingState?o("div",{staticClass:"loading-message"},[t._v("Loading todos...")]):t._e(),"failed"===t.loadingState?o("div",{staticClass:"failed-loading-message"},[t._v("Failed to load todos.")]):t._e(),o("div",{directives:[{name:"show",rawName:"v-show",value:"complete"===t.loadingState,expression:"loadingState === 'complete'"}]},t._l(t.todos,function(t){return o("TodoItem",{key:t.id,attrs:{todo:t}})}),1)])},h=[],g=o("0a0d"),v=o.n(g),T=o("cebc"),_=o("2f62"),b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-item"},[o("div",{staticClass:"todo-checkbox fas",class:{"todo-checkbox_checked fa-check":t.todo.complete,"todo-checkbox_unchecked":!t.todo.complete},attrs:{value:t.todo.complete},on:{click:function(e){return t.toggleComplete(t.todo)}}}),o("div",{staticClass:"todo-title",class:{"todo-title_complete":t.todo.complete}},[t._v(t._s(t.todo.title))]),o("div",{staticClass:"created-time",attrs:{title:t.getLongDate(t.todo.created)}},[t._v("\n    "+t._s(t.getShortDate(t.todo.created))+"\n  ")]),o("div",{staticClass:"button button-delete fas fa-times",on:{click:function(e){return t.deleteTodo(t.todo.id)}}})])},w=[],D=o("5176"),C=o.n(D),O=o("1315"),y={props:["todo"],methods:{toggleComplete:function(t){var e=C()(t,{complete:!t.complete});this.$store.dispatch("updateTodo",e)},getShortDate:function(t){return O["DateTime"].fromMillis(t).toFormat("HH:mm d MMM")},getLongDate:function(t){return O["DateTime"].fromMillis(t).toLocaleString(O["DateTime"].DATETIME_FULL)},deleteTodo:function(t){this.$store.dispatch("deleteTodo",t)}}},E=y,k=(o("6959"),Object(c["a"])(E,b,w,!1,null,null,null)),S=k.exports,x=s["a"].extend({data:function(){return{newTodoTitle:""}},components:{TodoItem:S},computed:Object(T["a"])({},Object(_["b"])(["todos","displayComplete","loadingState"])),methods:{addTodo:function(){var t=this;""!==this.newTodoTitle.trim()&&this.$store.dispatch("addTodo",{title:this.newTodoTitle,created:v()(),description:"",priority:0,due:0,estimated:0,userid:this.$store.state.settings.userName}).then(function(e){t.newTodoTitle=""}).catch(function(t){alert(t)})},toggleDisplayComplete:function(){this.$store.dispatch("toggleDisplayComplete")}},directives:{focus:{inserted:function(t){return t.focus()}}}}),$=x,A=(o("ed30"),Object(c["a"])($,m,h,!1,null,null,null)),L=A.exports,U=s["a"].extend({name:"home",components:{TodoList:L}}),P=U,N=Object(c["a"])(P,p,f,!1,null,null,null),j=N.exports,M=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"settings"},[o("h1",[t._v("Settings")]),o("p",[t._v("User ID: "),o("span",{staticClass:"monospace"},[t._v(t._s(t.userName))])]),o("div",{staticClass:"cookie-button",on:{click:t.saveCookie}},[t._v("Save this username as a cookie for a day.")]),o("div",{staticClass:"app-description"},[t._v("This username is randomly generated, and all todos saved under this\n    user will be deleted daily. The app is just a prototype, so feel free to fork it and run your\n    own server that stores todos more permanently.\n  ")]),t._m(0)])},G=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"links-container"},[o("a",{staticClass:"github-link",attrs:{href:"https://github.com/twodo-app/twodo-app/",target:"_blank"}},[o("i",{staticClass:"fab fa-github"}),t._v("View client source on Github")]),o("a",{staticClass:"github-link",attrs:{href:"https://github.com/twodo-app/twodo-server/",target:"_blank"}},[o("i",{staticClass:"fab fa-github"}),t._v("View server source on Github")])])}],I={computed:{userName:function(){return this.$store.state.settings.userName}},methods:{saveCookie:function(){var t=(new Date).setTime((new Date).getTime()+864e5);document.cookie="username=".concat(this.userName,"; expires=").concat(t),alert("Username ".concat(this.userName," saved as a cookie for one day."))}}},R=I,F=(o("2717"),Object(c["a"])(R,M,G,!1,null,"bee24c16",null)),H=F.exports;s["a"].use(u["a"]);var J=new u["a"]({base:"/twodo-app/",routes:[{path:"/",name:"home",component:j},{path:"/settings",name:"settings",component:H},{path:"/:id",name:"user",component:j}]}),V=o("795b"),Y=o.n(V),q=(o("ac6a"),o("bc3a")),W=o.n(q);s["a"].use(_["a"]);var z="https://twodo-app-server.herokuapp.com/api/v1/",B={UPDATE_USER:"updateUser",LOAD_TODOS:"loadTodos",CLEAR_TODOS:"clearTodos",UPDATE_LOADING_STATE:"updateLoadingState",ADD_TODO:"addTodo",DELETE_TODO:"deleteTodo",UPDATE_TODO:"updateTodo",TOGGLE_DISPLAY_COMPLETE:"toggleDisplayComplete"},K={todos:[],loadingState:"loading",settings:{userName:"",displayComplete:!1}},Q=new _["a"].Store({state:K,getters:{todos:function(t){var e=t.todos.filter(function(t){return!t.complete}),o=t.todos.filter(function(t){return t.complete});return t.settings.displayComplete?e.concat(o):e},displayComplete:function(t){return t.settings.displayComplete},loadingState:function(t){return t.loadingState}},mutations:{updateUser:function(t,e){t.settings.userName=e},addTodo:function(t,e){t.todos=t.todos.filter(function(t){return e.id!==t.id}),t.todos.push(e)},deleteTodo:function(t,e){t.todos=t.todos.filter(function(t){return t.id!==e})},updateTodo:function(t,e){t.todos=t.todos.map(function(t){return t.id===e.id?e:t})},toggleDisplayComplete:function(t){t.settings.displayComplete=!t.settings.displayComplete},updateLoadingState:function(t,e){t.loadingState=e},clearTodos:function(t){t.todos=[]}},actions:{initUser:function(t){var e=t.commit;W.a.get(z+"user").then(function(t){if(!(t.status>=200&&t.status<300))throw new Error(t.statusText);e(B.UPDATE_USER,t.data)}).catch(function(t){console.error(t)}),e(B.UPDATE_LOADING_STATE,"complete")},setUser:function(t,e){var o=t.commit;o(B.UPDATE_USER,e)},loadTodos:function(t){var e=t.commit,o=t.state;e(B.CLEAR_TODOS),W.a.get(z+"todos/".concat(o.settings.userName)).then(function(t){if(!(t.status>=200&&t.status<300))throw new Error(t.statusText);t.data.forEach(function(t){e(B.ADD_TODO,t)}),e(B.UPDATE_LOADING_STATE,"complete")}).catch(function(t){console.error(t),e(B.UPDATE_LOADING_STATE,"failed")})},addTodo:function(t,e){var o=t.commit;t.state;return new Y.a(function(t,s){W.a.post(z+"todos",e).then(function(e){if(!(e.status>=200&&e.status<300))throw new Error(e.statusText);o(B.ADD_TODO,e.data),t(e)}).catch(function(t){console.error(t),s(t)})})},deleteTodo:function(t,e){var o=t.commit,s=t.state;W.a.delete(z+"todos/".concat(s.settings.userName,"/").concat(e)).then(function(t){t.status>=200&&t.status<300&&o(B.DELETE_TODO,e)}).catch(function(t){console.error(t)})},updateTodo:function(t,e){var o=t.commit,s=t.state;W.a.post(z+"todos/".concat(s.settings.userName,"/").concat(e.id),e).then(function(t){if(!(t.status>=200&&t.status<300))throw new Error(t.statusText);o(B.UPDATE_TODO,t.data)}).catch(function(t){console.error(t)})},toggleDisplayComplete:function(t){var e=t.commit;e(B.TOGGLE_DISPLAY_COMPLETE)}}}),X=Q;s["a"].config.productionTip=!1,new s["a"]({router:J,store:X,render:function(t){return t(l)}}).$mount("#app")},e074:function(t,e,o){},ed30:function(t,e,o){"use strict";var s=o("b694"),n=o.n(s);n.a},f857:function(t,e,o){}});
//# sourceMappingURL=app.10a0c9ec.js.map
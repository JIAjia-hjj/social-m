import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	tel:'',
  },
  mutations: {
    setTel(state,payload){
      state.tel=payload
    }
  },
  actions: {
  }
});

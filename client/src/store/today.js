import axios from 'axios';
const apiRoot = process.env.VUE_APP_API_URL;

const state = {
  today: null
};

const getters = {
  TODAY: (state) => {
    return state.today;
  },
};

const mutations = {
  SET_TODAY: (state, payload) => {
    state.today = payload;
  },
};

let date = new Date();

const actions = {
  CREATE_TODAY: (context) => {
    axios.post(`${apiRoot}/days`, { date }).then((res) => {
      context.commit('SET_TODAY', res.data);
    });
  },
  GET_TODAY: (context) => {
    axios.get(`${apiRoot}/days/today`).then((res) => {
      context.commit('SET_TODAY', res.data.day);
    });
  },
  EDIT_TODAY: (context, payload) => {
    axios.put(`${apiRoot}/days/${payload._id}`, payload).then((res) => {
      context.commit('SET_TODAY', res.data);
    });
  },
  ADD_TODAY_TASK: (context, payload) => {
    axios.post(`${apiRoot}/days/${context.state.today._id}/tasks`, payload).then((res) => {
      context.commit('SET_TODAY', res.data);
    });
  },
  REMOVE_TODAY_TASK: (context, payload) => {
    axios.delete(`${apiRoot}/days/${context.state.today._id}/tasks`, payload).then((res) => {
      context.commit('SET_TODAY', res.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};

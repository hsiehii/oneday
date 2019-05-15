import axios from 'axios';

const apiRoot = process.env.VUE_APP_API_URL;

const state = {
  backlogs: null,
};

const getters = {
  BACKLOGS: (state) => {
    return state.backlogs;
  },
};

const mutations = {
  SET_BACKLOGS: (state, p) => {
    state.backlogs = p;
  },
  ADD_BACKLOG: (state, p) => {
    state.backlogs.push(p);
  },
  SWAP_BACKLOGS: (state, p) => {
    const i = state.backlogs.indexOf(p);
    state.backlogs.splice(i, 1);
    state.backlogs.splice(0, 0, p);
  },
  UPDATE_BACKLOG: (state, p) => {
    for (let i = 0; i < state.backlogs.length; i++) {
      if (p._id == state.backlogs[i]._id) {
        for (let k in p) {
          state.backlogs[i][k] = p[k];
        }
        return;
      }
    }
  },
};

const actions = {
  GET_BACKLOGS: (context) => {
    axios.get(`${apiRoot}/backlogs?getTasks=true`).then((res) => {
      context.commit('SET_BACKLOGS', res.data.backlogs);
    });
  },
  CREATE_BACKLOG: (context, p) => {
    axios.post(`${apiRoot}/backlogs`, p).then((res) => {
      context.commit('ADD_BACKLOG', res.data.backlog);
    });
  },
  SELECT_BACKLOG: (context, p) => {
    context.commit('SWAP_BACKLOGS', p);
  },
  ADD_TASK: (context, p) => {
    axios.post(`${apiRoot}/backlogs/${p.backlog}/tasks`, p.task).then((res) => {
      context.commit('UPDATE_BACKLOG', res.data);
    });
  },
  REMOVE_TASK: (context, p) => {
    axios.delete(`${apiRoot}/tasks/${p.task._id}`).then((res) => {
      const t = res.data;
      const b = p.backlog;
      for (let i = 0; i < b.tasks.length; i++) {
        if (t._id == b.tasks[i]._id) {
          b.tasks.splice(i, 1);
          break;
        }
      }
      context.commit('UPDATE_BACKLOG', b);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};

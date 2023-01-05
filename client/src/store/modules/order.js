import { orders } from "@/data/front-end-data.json.js";

export default {
  mutations: {
    updateOrders(state, orders) {
      state.orders = orders;
    },
  },
  state: {
    orders,
  },
  getters: {
    orders(state) {
      return state.orders;
    },
  },
};

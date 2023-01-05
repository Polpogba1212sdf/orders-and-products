import { products } from "@/data/front-end-data.json";

export default {
  state: {
    products,
  },
  getters: {
    products(state) {
      return state.products;
    },
  },
};

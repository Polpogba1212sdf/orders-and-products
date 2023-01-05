import { createStore } from "vuex";
import order from "./modules/order";
import product from "./modules/product";

export default createStore({
  modules: {
    order,
    product,
  },
});

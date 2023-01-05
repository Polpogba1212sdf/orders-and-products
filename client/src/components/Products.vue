<template>
  <div class="wrapper">
    <div class="d-flex title">
      <div class="d-flex align-items-center">
        <h1 class="fw-bold">Products / 25</h1>
        <span>Type:</span>
        <div class="form-floating d-flex">
          <select
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            @change="(value) => changeSelect(value)"
          >
            <option selected>Choose the type</option>
            <option
              :value="option.value"
              v-for="option in this.OPTIONS"
              :key="option"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <section v-if="filteredProducts.length">
      <div
        v-for="product in filteredProducts"
        :key="product"
        class="d-flex justify-content-between align-items-center table table-orders-big border"
        role="button"
      >
        <div class="name text-decoration-underline">
          {{ product.title }}
        </div>
        <div class="name">
          {{ product.type }}
        </div>
        <div>
          <div>{{ shortDate(product.date) }}</div>
          <div class="fw-bold full-date">
            {{ fullDate(product.date) }}
          </div>
        </div>
        <div class="d-flex flex-column guarantee-date">
          <span>from</span>
          <span>to</span>
        </div>
        <div class="d-flex flex-column">
          <span>{{ getDate(product.guarantee.start) }}</span>
          <span>{{ getDate(product.guarantee.end) }}</span>
        </div>
        <div class="price">
          <div class="usd">
            {{ numberWithSpaces(price(product.price, "USD")) }} $
          </div>
          <div class="fw-bold">
            {{ numberWithSpaces(price(product.price, "UAH")) }} UAH
          </div>
        </div>
        <div>
          {{ orderName(product) }}
        </div>
        <div
          class="delete"
          role="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="sendDataToModal(product)"
        ></div>
      </div>
    </section>
    <section v-else>No selected products</section>
  </div>
</template>

<script>
import { orders } from "@/data/front-end-data.json";
import { months } from "@/data/months";
import { mapGetters } from "vuex";
export const OPTIONS = [
  {
    value: "Monitors 1",
    name: "Monitors",
  },
  {
    value: "Computers",
    name: "Computers",
  },
];
export default {
  data: () => ({
    orderTitle: "",
    filteredProducts: [],
  }),
  created() {
    this.OPTIONS = OPTIONS;
    this.filteredProducts = this.products;
  },
  computed: mapGetters(["products"]),
  methods: {
    changeSelect({ target }) {
      if (target.value === "Choose the type") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (product) => product.type === target.value
        );
      }
    },
    getDate(date) {
      const newDate = new Date(date);
      return (
        this.day(date) +
        " / " +
        this.monthInDigits(date) +
        " / " +
        newDate.getFullYear()
      );
    },
    orderName(product) {
      orders.forEach((item) => {
        item.products.forEach((item2) => {
          if (item2.id === product.id) {
            this.orderTitle = item.title;
          }
        });
      });
      return this.orderTitle;
    },
    monthInSymbols(date) {
      return months[new Date(date).getMonth()];
    },
    day(date) {
      const day = new Date(date).getDate();
      if (day < 10) {
        return "0" + day;
      }
      return day;
    },
    shortYear(date) {
      return new Date(date).getFullYear().toString().slice(2, 4);
    },
    monthInDigits(date) {
      const month = new Date(date).getMonth() + 1;
      if (month < 10) {
        return "0" + month;
      }
      return month;
    },
    shortDate(date) {
      return this.monthInDigits(date) + " / " + this.shortYear(date);
    },
    sendDataToModal(product) {
      console.log(product);
    },
    numberWithSpaces(number) {
      let parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    },
    price(prices, currency) {
      let sum = 0;
      prices.forEach((price) => {
        if (price.symbol === currency) {
          sum += price.value;
        }
      });
      return sum;
    },
    fullDate(date) {
      return (
        this.day(date) +
        " / " +
        this.monthInSymbols(date) +
        " / " +
        this.year(date)
      );
    },
    year(date) {
      return new Date(date).getFullYear();
    },
  },
};
</script>

<style scoped>
.wrapper {
  font-size: 12px;
  padding-left: 326px;
  padding-top: 90px;
}
.wrapper h1 {
  margin-right: 15px;
}
.wrapper .form-select {
  padding: 0 5px;
  height: 30px;
  width: 330px;
  font-size: 13px;
  font-weight: bold;
  margin-left: 10px;
}
.wrapper .title {
  margin-bottom: 60px;
}
.wrapper .table {
  height: 70px;
  margin-bottom: 10px;
  color: #546e7a;
  padding-left: 33px;
}
.wrapper .table {
  padding-right: 33px;
  width: 1437px;
}
.wrapper .table .guarantee-date {
  text-align: left;
  margin-right: -147px;
}
.wrapper .table .price {
  text-align: left;
}
.wrapper .table .delete {
  background: url("../assets/delete.png") no-repeat;
  width: 13px;
  height: 15px;
}
</style>

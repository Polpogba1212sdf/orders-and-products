<template>
  <section class="d-flex">
    <div v-show="!showOrders">
      <div
        v-for="(order, index) in orders"
        :key="order"
        class="d-flex justify-content-between align-items-center table-orders table-orders-small border"
        v-bind:class="index !== orderIndex && 'not-active-order'"
      >
        <div class="products-count-block d-flex">
          <div class="list-img"></div>
          <div class="products-count">
            <div class="fw-bold">{{ order.products.length }}</div>
            <span>products</span>
          </div>
        </div>
        <div>
          <div class="short-date">{{ shortDate(order.date) }}</div>
          <div class="fw-bold full-date">
            {{ fullDate(order.date) }}
          </div>
        </div>
        <div class="order-pointer" v-show="orderIndex === index"></div>
      </div>
    </div>
    <div class="modal fade" v-bind:class="!showOrders && 'custom-modal-open'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold">
              {{ this.selectedOrderProps.title }}
            </h1>
            <div>
              <img
                src="../assets/green-plus.png"
                alt="add product"
                class="green-plus"
              />
              <span>Add product</span>
            </div>
            <div class="close-button rounded-circle">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="$emit('hideModal')"
              ></button>
            </div>
          </div>
          <div
            class="modal-body d-flex align-items-center border-bottom"
            v-for="product in this.products"
            :key="product.id"
          >
            <div class="green-circle rounded-circle"></div>
            <img
              :src="require(`@/assets/${product.photo}`)"
              alt="product image"
            />
            <div class="product-name">
              <div class="fw-bold text-decoration-underline product-title">
                {{ product.title }}
              </div>
              <div class="text-decoration-underline">
                SN-{{ product.serialNumber }}
              </div>
            </div>
            <span class="free">Free</span>
            <span @click="deleteProduct(product.id)" role="button">
              <img src="../assets/delete.png" alt="bin" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { months } from "@/data/months";
import { mapGetters } from "vuex";

export default {
  name: "SelectedOrder",
  props: {
    selectedOrderProps: {},
    showOrders: Boolean,
    orderIndex: Number,
    products: [],
  },
  data: () => ({
    selectedOrder: {},
  }),
  computed: mapGetters(["orders"]),
  methods: {
    deleteProduct(id) {
      this.$emit("deleteProduct", id);
    },
    monthInDigits(date) {
      const month = new Date(date).getMonth() + 1;
      if (month < 10) {
        return "0" + month;
      }
      return month;
    },
    shortYear(date) {
      return new Date(date).getFullYear().toString().slice(2, 4);
    },
    shortDate(date) {
      return this.monthInDigits(date) + " / " + this.shortYear(date);
    },
    day(date) {
      const day = new Date(date).getDate();
      if (day < 10) {
        return "0" + day;
      }
      return day;
    },
    monthInSymbols(date) {
      return months[new Date(date).getMonth()];
    },
    year(date) {
      return new Date(date).getFullYear();
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
  },
};
</script>

<style scoped>
.table-orders {
  height: 70px;
  margin-bottom: 10px;
  color: #546e7a;
  padding-left: 33px;
}
.table-orders-small {
  width: 466px;
}
.table-orders-small.not-active-order {
  padding-right: 144px;
}
.table-orders .list-img {
  background: url("../assets/list.png") no-repeat;
  width: 43px;
  height: 42px;
  margin-right: 21px;
}
.table-orders-small .order-pointer {
  width: 45px;
  height: 100%;
  background: url("../assets/pointer.png") center center #cfd8dc no-repeat;
}
.modal.custom-modal-open {
  opacity: 1;
  display: block;
}
.modal {
  --bs-modal-width: 950px;
  margin-top: -61px;
  margin-left: 358px;
}
.modal .modal-header {
  flex-direction: column;
  align-items: baseline;
}
.modal .green-plus {
  margin-right: 10px;
}
.modal .green-plus + span,
.modal .modal-body > span {
  color: #8bc34a;
}
.modal .close-button {
  width: 40px;
  height: 40px;
  box-shadow: 1px 1px 5px;
  position: absolute;
  left: 931px;
  top: -21px;
  background: white;
}
.modal .close-button button {
  padding-top: 22px;
  padding-left: 21px;
  margin: 0;
}
.modal .modal-header,
.modal .modal-body {
  padding-left: 37px;
}
.modal .modal-body .green-circle {
  background: #8bc34a;
  width: 10px;
  height: 10px;
  margin-right: 32px;
}
.modal .modal-body img {
  margin-right: 33px;
}
.modal .modal-body .product-name {
  text-align: left;
  margin-right: 465px;
}
.modal .modal-body .free {
  margin-right: 158px;
}
</style>

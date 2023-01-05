<template>
  <div
    class="modal fade custom-modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">
            Are you sure you want to delete this order?
          </h1>
          <div class="close-button rounded-circle">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div
          class="modal-body d-flex align-items-center"
          v-for="product in this.order.products"
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
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary discard-btn"
            data-bs-dismiss="modal"
          >
            DISCARD
          </button>
          <button
            type="button"
            class="btn btn-primary delete-btn rounded-pill border-0 bg-white fw-bold"
            data-bs-dismiss="modal"
            @click="deleteOrder"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "DeleteModal",
  computed: mapGetters(["orders"]),
  props: {
    order: {},
  },
  methods: {
    ...mapMutations(["updateOrders"]),
    deleteOrder() {
      this.updateOrders(
        this.orders.filter((item) => item.id !== this.order.id)
      );
    },
  },
};
</script>

<style scoped>
.custom-modal {
  --bs-modal-width: 792px;
}
.modal .modal-content {
  margin-top: -136px;
}
.modal .close-button {
  width: 40px;
  height: 40px;
  box-shadow: 1px 1px 5px;
  position: absolute;
  left: 766px;
  top: -21px;
  background: white;
}
.modal .close-button button {
  padding-top: 22px;
  padding-left: 21px;
  margin: 0;
}
.modal .modal-header {
  height: 90px;
}
.modal .modal-body {
  padding-left: 43px;
  border-bottom: 1px solid #cfd8dc;
}
.modal .modal-body .green-circle {
  background: #8bc34a;
  width: 10px;
  height: 10px;
  margin-right: 38px;
}
.modal .modal-body img {
  margin-right: 70px;
}
.modal .modal-body .product-name {
  text-align: left;
}
.modal .modal-body .product-name .product-title {
  font-size: 14px;
}
.modal .modal-footer {
  background: #84bc46;
  height: 110px;
  padding-right: 37px;
}
.modal .modal-footer .discard-btn {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: bold;
}
.modal .modal-footer .delete-btn {
  width: 170px;
  color: #e8364f;
  font-size: 12px;
  background: url("../assets/red-bin.png") 50px 8px no-repeat;
  padding-top: 8px;
  padding-left: 26px;
}
</style>

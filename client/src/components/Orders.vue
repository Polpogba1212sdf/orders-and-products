<template>
  <div class="wrapper">
    <div class="d-flex title">
      <div class="plus"></div>
      <div>
        <h1 class="fw-bold">Orders / 25</h1>
      </div>
    </div>
    <OrdersList />
  </div>
</template>

<script>
import OrdersList from "@/components/OrdersList.vue";

export default {
  components: { OrdersList },
};
</script>

<style scoped>
.wrapper {
  font-size: 12px;
  padding-left: 326px;
  padding-top: 90px;
}
.wrapper .plus {
  background: url("../assets/plus.png") no-repeat;
  width: 40px;
  height: 40px;
}
.wrapper .title {
  margin-bottom: 60px;
}
.wrapper h1 {
  font-size: 23px;
  margin-left: 22px;
  margin-top: 5px;
}
</style>

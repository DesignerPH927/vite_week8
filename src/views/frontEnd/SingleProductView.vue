<template>
  <VLoading :active="isLoading" />
  <ToastMessages></ToastMessages>
  <div class="singleProduct">
    <div class="singleProductHeader"></div>
    <div class="container">
      <div class="py-5">
        <div class="row gx-md-6 g-3">
          <div class="col-lg-6">
            <img :src="remoteSingleProduct.imageUrl"
            class="img-fluid">
          </div>
          <div class="col-lg-5">
            <nav
              style="--bs-breadcrumb-divider: '>';"
              aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <RouterLink to="/productsPage">產品列表</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{remoteSingleProduct.category}}
                </li>
              </ol>
            </nav>
            <h4 class="badge bg-danger fs-5 mb-3">
              {{remoteSingleProduct.category}}
            </h4>
            <p class="card-title fs-4">
              {{remoteSingleProduct.title}}
            </p>
            <div class="mt-5">
              <p class="fs-4 fw-bold">
                曾經榮獲
              </p>
              <ul class="award">
                <li v-for="award in remoteSingleProduct.content"
                :key="award" class="d-inline-block"
                >{{award}}</li>
              </ul>
              <p class="text-end fw-bold text-danger
              fs-3">
                NT$ {{remoteSingleProduct.price}}
              </p>
            </div>
            <div class="mb-3">
              <div class="d-flex gap-3">
                <select id="qty" class="form-select"
                v-model="qty">
                  <option
                  v-for="i in 50" :key="i"
                  :value="i">{{i}}</option>
                </select>
                <button class="btn btn-lilac w-100"
                @click="addCart(remoteSingleProduct, qty)"
                type="button">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5">
          <hr style="border:3px solid #9966cc;
          opacity: .7;
          border-radius: 50px;">
        </div>
        <div class="mb-1">
          <h3 class="fw-bold fs-3 text-center
          mb-5">
            相關商品
          </h3>
          <Vue3Marquee
            :pause-on-hover="true"
            :clone="true"
            :duration="25">
            <div class="me-4 h-100"
            v-for="pItem in remoteProducts"
            :key="pItem.id">
              <div class="card h-100" style="width: 20rem;">
                <i class="bi bi-heart loveIcon"></i>
                <div class="itemWrap">
                  <img :src="pItem.imageUrl"
                  class="bg-cover w-100" height="200px">
                </div>
                <div class="card-body d-flex flex-column">
                  <h4 class="d-flex mb-4">
                    <span
                    style="letter-spacing: 2px;"
                    >{{pItem.title}}</span>
                    <span class="badge text-bg-danger ms-auto">
                      {{ pItem.category }}
                    </span>
                  </h4>
                  <h5 class="text-muted text-center mb-3">
                    {{pItem.description}}
                  </h5>
                  <div class="d-flex justify-content-between
                  align-items-center mb-3">
                    <del class="text-muted">${{pItem.origin_price}}</del>
                    <p class="fs-5 text-danger mb-0">
                      NT$ {{pItem.price}}
                    </p>
                  </div>
                  <button class="btn btn-outline-lilac
                  w-100 fw-bold mt-auto"
                  @click.prevent="clickProduct(pItem)"
                  >
                    <i class="bi bi-cart-plus-fill"></i>
                    立即預約
                  </button>
                </div>
              </div>
            </div>
          </Vue3Marquee>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import ToastMessages from '../../components/ToastMessage.vue';
import userToastMessageStore from '../../stores/statusStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      id: '',
      remoteSingleProduct: {},
      remoteProducts: [],
      qty: 1,
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getProducts() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/products`)
        .then((res) => {
          this.isLoading = false;
          this.remoteProducts = res.data.products;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得產品失敗',
            content: err.response.data.message,
          });
        });
    },
    getProduct() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/product/${this.id}`)
        .then((res) => {
          this.isLoading = false;
          this.remoteSingleProduct = res.data.product;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得產品失敗',
            content: err.response.data.message,
          });
        });
    },
    clickProduct(item) {
      this.id = item.id;
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/product/${this.id}`)
        .then((res) => {
          this.isLoading = false;
          this.remoteSingleProduct = res.data.product;
          window.scrollTo(0, 250);
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得產品失敗',
            content: err.response.data.message,
          });
        });
    },
    addCart(product, qty = 1) {
      const item = {
        product_id: product.id,
        qty,
      };
      this.isLoading = true;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: item })
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功加入購物車',
            content: res.data.message,
          });
          this.$router.push('/carts/confirm');
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '失敗加入購物車',
            content: err.response.data.message,
          });
          this.$router.push('/productsPage');
        });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProduct();
    this.getProducts();
  },
};
</script>

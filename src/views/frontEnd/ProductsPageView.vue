<template>
  <VLoading :active="isLoading" />
  <ToastMessages></ToastMessages>
  <div class="product">
    <div class="productHeader"></div>
    <div class="container">
      <div class="py-7">
      <div class="row justify-content-md-center
          gx-3 gy-6 g-md-6">
          <div class="col-md-3 px-4">
            <div class="list-group text-center">
              <RouterLink to="/productsPage" class="list-group-item
                list-group-item-action" aria-current="true">
                全部
              </RouterLink>
              <RouterLink
                v-for="category in categories"
                :key="category"
                :to="`/productsPage?category=${category}`"
                class="list-group-item
                list-group-item-action"
                >
                {{category}}
              </RouterLink>
            </div>
          </div>
          <div class="col-md-9">
            <div class="row row-cols-md-1 row-cols-lg-2
            row-cols-xl-3
            row-cols-1 g-3 g-md-4">
              <div v-for="pItem in remoteProducts"
              :key="pItem.id"
                class="col d-flex justify-content-center">
                <div class="card" style="width: 25rem;">
                  <!-- <i class="bi bi-heart loveIcon"></i> -->
                  <div class="itemWrap">
                    <img :src="pItem.imageUrl"
                    class="bg-cover w-100"
                    height="250px;">
                  </div>
                  <div class="card-body d-flex flex-column">
                    <h5 class="d-flex">
                      <span
                      style="letter-spacing: 2px;"
                      >{{pItem.title}}</span>
                      <span class="badge text-bg-danger ms-auto">
                        {{pItem.category}}
                      </span>
                    </h5>
                    <p class="text-muted text-center">
                      {{pItem.description}}
                    </p>
                    <div class="d-flex justify-content-between
                    align-items-center mb-3">
                      <del class="text-muted">$ {{pItem.origin_price}}</del>
                      <p class="fs-5 text-danger mb-0">
                        NT$ {{pItem.price}}
                      </p>
                    </div>
                    <div class="d-flex gap-2 mt-auto">
                      <RouterLink :to="`/product/${pItem.id}`"
                      class="btn btn-outline-lilac w-100 fw-bold
                      ">
                        立即預約
                      </RouterLink>
                      <button class="btn btn-outline-lilac
                      w-100 fw-bold"
                      @click.prevent="addCart(pItem)">
                        <i class="bi bi-cart-plus-fill"></i>
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaginationComponent
          class="mt-6"
          :pages="pagination"
          :get-products="getProducts"
          @change-page="getProducts"
        ></PaginationComponent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import ToastMessages from '../../components/ToastMessage.vue';
import userToastMessageStore from '../../stores/statusStore';
import PaginationComponent from '../../components/PaginationView.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      remoteProducts: [],
      pagination: [],
      categories: ['攝影師', '新娘秘書', '主持人', '婚宴場', '禮車', '音樂', '道具'],
    };
  },
  components: {
    PaginationComponent,
    ToastMessages,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getProducts(pagination = 1) {
      this.isLoading = true;
      const { category = '' } = this.$route.query;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${pagination}`)
        .then((res) => {
          // console.log('取得客戶產品', res);
          this.isLoading = false;
          this.remoteProducts = res.data.products;
          this.pagination = res.data.pagination;
          window.scrollTo(0, 250);
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
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
  watch: {
    '$route.query': {
      handler() {
        this.getProducts();
      },
      deep: true,
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.list-group-item {
  color: #513791 !important;
}
</style>

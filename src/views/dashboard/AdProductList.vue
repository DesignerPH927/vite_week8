<template>
  <VLoading :active="isLoading" />
  <ToastMessages></ToastMessages>
  <!-- ProductList -->
  <ProductListModal
    ref="pList"
    :product-modal="tempProduct"
    :is-status="isStatus"
    :update-product="updateProduct"
  ></ProductListModal>
  <!-- delModal -->
  <DelModal
    ref="dModal"
    :item-modal="tempProduct"
    :del-product="delProduct"
  ></DelModal>
  <div class="container">
    <div class="p-lg-4 py-4 px-2">
      <div class="card">
        <div class="card-header bg-transparent p-3">
          <div class="row row-cols-lg-2 row-cols-1 g-3
          align-items-center">
            <div class="col">
              <div class="card-title fw-bold">
                關鍵字搜尋：
              </div>
              <div class="row row-cols-lg-4 px-2
              row-cols-3 text-nowrap">
              <div class="col p-0">
                  <RouterLink
                    class="btn btn-outline-lilac w-100"
                    type="button"
                    to="/admin/adProducts/adProductList"
                    > 全部
                  </RouterLink>
                </div>
                <div class="col p-0"
                  v-for="categoryItem in categories"
                  :key="categoryItem">
                  <RouterLink
                    class="btn btn-outline-lilac w-100"
                    type="button"
                    :to="`/admin/adProducts/adProductList?category=${categoryItem}`"
                    >{{categoryItem}}
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row p-2
              justify-content-end
              align-items-center">
                <div class="col-lg-5 col-8 p-0">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text bg-transparent
                    border border-end-0">
                      <i class="bi bi-search text-lilac"></i>
                    </span>
                    <input type="search" class="form-control
                    border border-start-0 ps-0 shadow-none"
                    placeholder="找無資料需換頁搜尋" v-model="search">
                  </div>
                </div>
                <div class="col-lg-3 col-4 d-flex justify-content-center p-0">
                  <button class="btn btn-lilac
                  text-nowrap btn-sm d-xl-none d-block"
                  type="button"
                  @click.prevent="openModal('new')"
                  >新增資訊</button>
                  <button class="btn btn-lilac
                  text-nowrap d-xl-block d-none
                  fw-bold" type="button"
                  @click.prevent="openModal('new')"
                  >新增資訊</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle text-nowrap
            text-center">
              <thead>
                <tr>
                  <th>縮圖</th>
                  <th>分類</th>
                  <th>名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pItem in filterData"
                :key="pItem.id">
                  <td
                    style="width: 200px;
                    min-width: 120px">
                    <div>
                      <img :src="pItem.imageUrl" alt="" class="img-thumbnail">
                    </div>
                  </td>
                  <th>
                    {{ pItem.category }}
                  </th>
                  <td>
                    {{ pItem.title }}
                  </td>
                  <td>{{ pItem.origin_price }}</td>
                  <td>{{ pItem.price }}</td>
                  <td>
                    <span v-if="pItem.is_enabled"
                      class="text-success">啟用</span>
                    <span v-else
                      class="text-danger">未啟用</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-outline-warning me-2
                      btn-sm" type="button"
                      @click.prevent="openModal('edit', pItem)"
                      >
                        <i class="bi bi-pen-fill"></i>
                        編輯
                      </button>
                      <button class="btn btn-outline-danger
                      btn-sm" type="button"
                      @click.prevent="openModal('delete', pItem)">
                        <i class="bi bi-trash-fill"></i>
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer bg-transparent p-3">
          <PaginationComponent
            :pages="pagination"
            :get-products="getProducts"
            @change-page="getProducts"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import ToastMessages from '../../components/ToastMessage.vue';
import userToastMessageStore from '../../stores/statusStore';
import PaginationComponent from '../../components/PaginationView.vue';
import ProductListModal from '../../components/ProductListModal.vue';
import DelModal from '../../components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    ToastMessages,
    PaginationComponent,
    ProductListModal,
    DelModal,
  },
  data() {
    return {
      isLoading: false,
      categories: ['攝影師', '新娘秘書', '主持人', '婚宴場', '禮車', '音樂', '道具'],
      remoteProducts: [],
      search: '',
      isStatus: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: [],
    };
  },
  // 必須使用深層監聽
  watch: {
    '$route.query': {
      handler() {
        this.getProducts();
      },
      deep: true,
    },
  },
  computed: {
    filterData() {
      return this.remoteProducts.filter((item) => item.category.match(this.search));
    },
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getProducts(pagination = 1) {
      // console.log(this.$route); // eslint-disable-line no-console
      // category可以自訂名稱
      // 為啥要category = ''，原因是因為預設值是undefined，所以必須給空值才會呈現產品
      const { category = '' } = this.$route.query;
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/products?page=${pagination}&category=${category}`)
        .then((res) => {
          // console.log('取得產品', res); // eslint-disable-line no-console
          this.remoteProducts = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功取得產品',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '無法取得產品',
            content: err.responsive.data.message,
          });
        });
    },
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isStatus = true;
        this.$refs.pList.show();
      } else if (status === 'edit') {
        this.tempProduct = { ...product };
        this.isStatus = false;
        this.$refs.pList.show();
      } else if (status === 'delete') {
        this.tempProduct = { ...product };
        this.$refs.dModal.show();
      }
    },
    updateProduct(product) {
      this.tempProduct = product;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
      let http = 'post';
      let productStatus = '新增產品';

      if (!this.isStatus) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        http = 'put';
        productStatus = '編輯產品';
      }

      this.isLoading = true;
      this.$http[http](url, { data: this.tempProduct })
        .then((res) => {
          // console.log('已更新', res); // eslint-disable-line no-console
          this.isLoading = false;
          this.$refs.pList.hide();
          this.getProducts();
          this.pushMessage({
            style: 'success',
            title: productStatus,
            content: res.data.message,
          });
        })
        .catch((err) => {
          // console.log('未更新', err.response); // eslint-disable-line no-console
          this.isLoading = false;
          this.$refs.pList.hide();
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
    delProduct(product) {
      this.tempProduct = product;
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.isLoading = false;
          this.$refs.dModal.hide();
          this.getProducts();
          this.pushMessage({
            style: 'success',
            title: '刪除成功',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.dModal.hide();
          this.pushMessage({
            style: 'success',
            title: '刪除失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

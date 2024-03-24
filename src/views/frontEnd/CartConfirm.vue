<template>
  <VLoading :active="isLoading" />
  <ToastMessages></ToastMessages>
  <div class="row justify-content-center">
    <div class="col-lg-10">
      <div class="card me-auto
      border border-lilac"
      style="background: #ffeeff;">
        <div class="card-body">
          <div class="text-end p-3">
            <button class="btn btn-outline-danger"
            @click.prevent="deleteCarts"
            type="button">刪除購物車</button>
          </div>
          <div class="table-responsive">
            <table class="table align-middle text-nowrap">
              <thead>
                <tr class="text-center">
                  <th>縮圖</th>
                  <th>商品</th>
                  <th width="300px;">數量</th>
                  <th>單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cItem in remoteCarts.carts"
                :key="cItem.id"
                  class="text-center">
                  <td style="max-width: 200px;">
                    <div>
                      <img :src="cItem.product.imageUrl"
                      class="img-thumbnail">
                    </div>
                  </td>
                  <th><span>{{cItem.product.category}}</span></th>
                  <td>
                    <div class="input-group input-group-sm">
                      <button v-if="cItem.qty > 1"
                        class="btn btn-outline-lilac
                        p-1"
                        type="button"
                        @click.prevent="cItem.qty--;
                        changeCartQty(cItem, cItem.qty)"
                        >
                        <i class="bi bi-dash-lg"></i>
                      </button>
                      <button v-else
                        class="btn btn-outline-danger
                        p-1"
                        type="button"
                        @click.prevent="delCart(cItem.id)"
                        >
                        <i class="bi bi-trash3-fill
                        text-danger"></i>
                      </button>
                      <input
                        type="number"
                        class="form-control
                        bg-transparent shadow-none
                        text-center" readonly
                        v-model="cItem.qty"
                        >
                      <button
                        class="btn btn-outline-lilac
                        p-1"
                        type="button"
                        @click.prevent="cItem.qty++;
                        changeCartQty(cItem, cItem.qty)"
                        >
                        <i class="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </td>
                  <td>${{ cItem.total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4"
                  class="text-end fw-bold fs-4 p-4">
                    <span>
                      總價
                      <i class="bi bi-currency-dollar"></i>
                      {{remoteCarts.total}}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="d-flex justify-content-between">
              <button class="btn btn-lilac"
              type="button"
              @click.prevent="backProducts"
              >
                <i class="bi bi-arrow-left"></i>
                繼續購物
              </button>
              <button class="btn btn-lilac"
              type="button"
              @click.prevent="fillInInfo"
              >
                確認結帳
              <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
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
      remoteCarts: [],
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getCarts() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.isLoading = false;
          // console.log('顯示cart', res);
          this.remoteCarts = res.data.data;
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
    delCart(cardId) {
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${cardId}`)
        .then(() => {
          this.isLoading = false;
          this.getCarts();
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
    deleteCarts() {
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功訊息',
            content: res.data.message,
          });
          this.getCarts();
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
    changeCartQty(product, qty = 1) {
      const item = {
        product_id: product.id,
        qty,
      };
      this.isLoading = true;
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/cart/${product.id}`, { data: item })
        .then(() => {
          this.isLoading = false;
          this.getCarts();
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
    backProducts() {
      this.$router.push('/productsPage');
    },
    fillInInfo() {
      this.$router.push('/carts/fillIn');
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>

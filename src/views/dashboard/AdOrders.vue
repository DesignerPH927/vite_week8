<template>
  <VLoading :active="isLoading" />
  <!-- orderModal -->
  <orderModal
    ref="orderModal"
    :orderData="tempOrder"
    :update-order-modal="updateOrder"
  ></orderModal>
  <!-- delModal -->
  <DelModal
    ref="delModal"
    :item-modal="tempOrder"
    :del-product="delOrder"
  ></DelModal>
  <div class="container">
    <div class="p-lg-4 py-4 px-2">
      <div class="card">
        <div v-if="remoteOrders.length > 10"
          class="deleteAll position-absolute top-0 end-0">
          <button class="btn btn-outline-danger" type="button"
          @click.prevent="delOrders">
            刪除全訂單
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle text-nowrap">
              <thead>
                <tr>
                  <th>購買時間</th>
                  <th>信箱</th>
                  <th>購買款項</th>
                  <th>應付金額</th>
                  <th>是否付款</th>
                  <th class="text-center">編輯</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="oItem in remoteOrders" :key="oItem.id">
                  <tr v-if="remoteOrders.length"
                  :class="{'text-secondary' : !oItem.is_paid}">
                    <td>{{ $filters.date(oItem.create_at) }}</td>
                    <td>{{oItem.user.email}}</td>
                    <td>
                      <ul class="list-unstyled">
                        <li v-for="oProduct in oItem.products" :key="oProduct.id"
                        >{{oProduct.product.title}} 數量：{{oProduct.qty}}
                        {{oProduct.product.unit}}</li>
                      </ul>
                    </td>
                    <td>{{oItem.total}}</td>
                    <td>
                      <div class="form-check form-switch">
                        <!-- 1. 雙向綁定
                        2. id、for綁定對應
                        3. 更新is_paid狀態 -->
                        <input class="form-check-input"
                          type="checkbox"
                          v-model="oItem.is_paid"
                          @change="updateOrder(oItem)"
                          :id="`${oItem.id}`">
                        <label class="form-check-label"
                          :for="`${oItem.id}`">
                            <span v-if="oItem.is_paid"
                              class="text-success">已付款</span>
                            <span v-else
                              class="text-danger">未付款</span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex justify-content-center">
                        <button class="btn btn-outline-warning btn-sm
                        me-2" type="button"
                        @click.prevent="openModal('view', oItem)">
                          <i class="bi bi-eye"></i>
                          檢視
                        </button>
                        <button class="btn btn-outline-danger btn-sm" type="button"
                        @click.prevent="openModal('delete', oItem)">
                          <i class="bi bi-trash-fill"></i>
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer bg-transparent p-3">
          <PaginationComponent
            :pages="pagination"
            :get-products="getOrders"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'pinia';
import userToastMessageStore from '../../stores/statusStore';
import orderModal from '../../components/OrderModal.vue';
import DelModal from '../../components/DelModal.vue';
import PaginationComponent from '../../components/PaginationView.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    orderModal,
    DelModal,
    PaginationComponent,
  },
  data() {
    return {
      isLoading: false,
      remoteOrders: [],
      tempOrder: {},
      pagination: [],
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getOrders(pagination = 1) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${pagination}`)
        .then((res) => {
          this.isLoading = false;
          // console.log('取得訂單', res); // eslint-disable-line no-console
          this.remoteOrders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得失敗',
            content: err.response.data.message,
          });
        });
    },
    openModal(status, order) {
      if (status === 'view') {
        this.tempOrder = { ...order };
        this.$refs.orderModal.show();
      } else {
        this.tempOrder = { ...order };
        this.$refs.delModal.show();
      }
    },
    updateOrder(order) {
      this.tempOrder = order;
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`;
      const paid = {
        is_paid: this.tempOrder.is_paid,
      };
      this.isLoading = true;
      this.$http.put(url, { data: paid })
        .then((res) => {
          this.isLoading = false;
          this.$refs.orderModal.hide();
          this.getOrders();
          this.pushMessage({
            style: 'success',
            title: '訂單狀態',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.orderModal.hide();
          this.pushMessage({
            style: 'danger',
            title: '訂單狀態',
            content: err.response.data.message,
          });
        });
    },
    delOrder(order) {
      this.tempOrder = order;
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`)
        .then(() => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.getOrders();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
    delOrders() {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/orders/all`)
        .then(() => {
          Swal.fire('訂單已全部刪除囉!')
            .then(() => {
              this.getOrders();
            });
        })
        .catch(() => {
          Swal.fire('訂單刪除失敗唷!');
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

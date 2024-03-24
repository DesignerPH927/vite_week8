<template>
  <VLoading :active="isLoading" />
  <!-- couponModal -->
  <CouponModal
    ref="couponModal"
    :is-status="isStatus"
    :coupon-modal="tempCoupon"
    :update-coupon="updateCoupon"
  ></CouponModal>
  <!-- delModal -->
  <DelModal
  :item-modal="tempCoupon"
  :del-product="delCoupon"
  ref="delModal"
  ></DelModal>
  <div class="container">
    <div class="p-lg-4 py-4 px-2">
      <div class="card">
        <div class="card-header bg-transparent text-end">
          <button class="btn btn-lilac fw-bold" type="button"
          @click.prevent="openModal('new')"
          >
            新增優惠卷
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle text-nowrap
            text-center">
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>折扣百分比</th>
                  <th>到期日</th>
                  <th>是否啟用</th>
                  <th>編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="couponItem in remoteCoupons"
                :key="couponItem.id">
                  <td>{{couponItem.title}}</td>
                  <td>{{couponItem.percent}}</td>
                  <td>{{$filters.date(couponItem.due_date)}}</td>
                  <td>
                    <span v-if="couponItem.is_enabled"
                      class="text-success">啟用</span>
                    <span v-else
                      class="text-danger">未啟用</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-outline-warning me-2
                      btn-sm" type="button"
                      @click.prevent="openModal('edit', couponItem)"
                      >
                        <i class="bi bi-pen-fill"></i>
                        編輯
                      </button>
                      <button class="btn btn-outline-danger
                      btn-sm" type="button"
                      @click.prevent="openModal('delete', couponItem)"
                      >
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
            :get-products="getCoupons"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '../../stores/statusStore';
import CouponModal from '../../components/CouponModal.vue';
import DelModal from '../../components/DelModal.vue';
import PaginationComponent from '../../components/PaginationView.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    CouponModal,
    DelModal,
    PaginationComponent,
  },
  data() {
    return {
      isLoading: false,
      remoteCoupons: [],
      tempCoupon: {
        title: '',
        is_enabled: '',
        percent: 100,
        code: '',
      },
      isStatus: false,
      pagination: [],
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    openModal(status, coupon) {
      if (status === 'new') {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          // html輸入為1秒轉成毫秒需除已1000
        };
        this.isStatus = true;
        this.$refs.couponModal.show();
      } else if (status === 'edit') {
        this.tempCoupon = { ...coupon };
        this.isStatus = false;
        this.$refs.couponModal.show();
      } else if (status === 'delete') {
        this.tempCoupon = { ...coupon };
        this.$refs.delModal.show();
      }
    },
    updateCoupon(coupon) {
      this.tempCoupon = coupon;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
      let http = 'post';
      let couponMessage = '成功新增優惠卷';

      if (!this.isStatus) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`;
        http = 'put';
        couponMessage = '成功編輯優惠卷';
      }
      this.isLoading = true;
      this.$http[http](url, { data: this.tempCoupon })
        .then((res) => {
          this.isLoading = false;
          this.$refs.couponModal.hide();
          this.getCoupons();
          this.pushMessage({
            style: 'success',
            title: couponMessage,
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
    getCoupons(pagination = 1) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${pagination}`)
        .then((res) => {
          this.isLoading = false;
          // console.log('取得優惠卷', res);
          this.remoteCoupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
    delCoupon(coupon) {
      this.tempCoupon = coupon;
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '刪除優惠卷',
            content: res.data.message,
          });
          this.$refs.delModal.hide();
          this.getCoupons();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '刪除優惠卷',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>

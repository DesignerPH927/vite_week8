<template>
  <div class="row g-3">
    <div class="col-md-6">
      <div class="card bg-transparent border-lilac">
        <div class="card-body">
          <table class="table align-middle text-nowrap">
            <thead class="table-dark text-center">
              <tr>
                <th colspan="3">
                  <p class="mb-0 fw-bold fs-5">
                    訂購清單
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orderItem in remoteOrders.products"
              :key="orderItem.id">
                <th class="text-center"
                width="150px;">{{orderItem.product.category}}</th>
                <td class="text-center">{{orderItem.product.num}} /
                {{orderItem.product.unit}}</td>
                <td class="text-end fw-bold"
                style="width: 150px;">
                  <i class="bi bi-currency-dollar"></i>
                  {{orderItem.total}}
                </td>
              </tr>
            </tbody>
          </table>
          <p class="fw-bold fs-4 text-end mb-0">
            總價
            <i class="bi bi-currency-dollar"></i>
            {{remoteOrders.total}}
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card bg-transparent border-lilac">
        <div class="card-body">
          <table class="table align-middle">
            <thead class="table-dark text-center">
              <tr>
                <th colspan="2">
                  <p class="mb-0 fw-bold fs-5">
                    訂購資訊
                  </p>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>姓名</th>
                <td>{{remoteOrders.user.name}}</td>
              </tr>
              <tr>
                <th>取貨地址</th>
                <td>{{remoteOrders.user.address}}</td>
              </tr>
              <tr>
                <th>手機號碼</th>
                <td>{{remoteOrders.user.tel}}</td>
              </tr>
              <tr>
                <th>電子信箱</th>
                <td>{{remoteOrders.user.email}}</td>
              </tr>
              <tr>
                <th>支付方式</th>
                <td>{{remoteOrders.user.paid}}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="remoteOrders.is_paid"
                    class="fw-bold
                    fs-5 text-success">已付款</span>
                  <span v-else
                    class="fw-bold
                    fs-5 text-danger">未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-end mt-5">
            <button class="btn btn-lilac w-50"
            type="button"
            @click.prevent="payFor"
            >確認付款</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'pinia';
import userToastMessageStore from '../../stores/statusStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      remoteOrders: {
        user: {},
      },
      paidId: '',
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getOrder() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/order/${this.paidId}`)
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.remoteOrders = res.data.order;
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得訂單失敗',
            content: err.response.data.message,
          });
        });
    },
    payFor() {
      this.isLoading = true;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${this.paidId}`)
        .then(() => {
          this.isLoading = false;
          this.getOrder();
          Swal.fire({
            title: '付款成功',
            text: '我們已收到您的訂單，感謝您的支持!',
            imageUrl: 'https://media.istockphoto.com/id/1471121446/photo/consumers-rate-their-satisfaction-5-stars-customer-experience-survey-concepts-for-services.jpg?s=2048x2048&w=is&k=20&c=Jxuv6Yj1i0ChZGHNR3i5H7kPByrudNUl_sxM_TCyFHI=',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#cc99ff',
            confirmButtonText: `
              <i class="bi bi-hand-thumbs-up"></i>
              確認
              <i class="bi bi-emoji-smile"></i>
            `,
            confirmButtonAriaLabel: 'Thumbs up, 確認!',
          }).then(() => {
            setTimeout(() => {
              this.$router.push('/productsPage');
            }, 3000);
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '付款失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.paidId = this.$route.params.paidId;
    this.getOrder();
  },
};
</script>

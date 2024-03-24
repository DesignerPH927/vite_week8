<template>
  <div class="d-flex overflow-hidden">
    <aside class="sideBar vh-100 border-end bg-white d-flex flex-column">
      <!-- 1. 後台名稱 -->
      <div class="px-4 text-center bg-lilac py-2
      position-relative">
        <small class="fw-bold fs-5 text-white">結
          <strong class="text-danger
          fs-4">好</strong>
          婚
        </small>
        <div class="position-absolute top-15 end-5 closeBtn d-none">
          <button class="btn btn-outline-danger
          btn-sm" type="button" id="closeBtn">
            <i class="bi bi-x-lg fw-bold"></i>
          </button>
        </div>
      </div>
      <!-- 2.選單 -->
      <div class="overflow-auto">
        <ul class="productList">
          <li>
            <RouterLink to="/admin/adProducts/adProductList"
            id="routerLink">
              <i class="bi bi-card-list me-2"></i>
              產品列表
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/adProducts/adOrders"
            id="routerLink">
              <i class="bi bi-list-ol me-2"></i>
              訂單列表
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/adProducts/adCoupons"
            id="routerLink">
              <i class="bi bi-currency-exchange me-2"></i>
              優惠卷
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/adProducts/adArticle"
            id="routerLink">
              <i class="bi bi-clipboard-plus-fill me-2"></i>
              貼文
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 3.登出 -->
      <a href="#" class="px-4 fs-3
      mt-auto py-2 bg-lilac logout text-white"
      @click.prevent="logout">
        <i class="bi bi-door-open-fill"></i>
        <small class="fs-5">登出</small>
      </a>
    </aside>
    <div class="adMain">
      <div class="bg-white w-100 border-bottom border-lilac d-flex align-items-center">
        <a href="#" class="px-3 py-2 d-inline-block border-end border-lilac" id="toggle-btn">
          <i class="bi bi-list text-lilac fs-2"></i>
        </a>
        <h3 class="fw-bold fs-2 mb-0 mx-auto">
          <i class="bi bi-stars"></i>
          後台管理
          <i class="bi bi-stars"></i>
        </h3>
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '../../stores/statusStore';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    logout() {
      this.$http.post(`${VITE_URL}/logout`)
        .then((res) => {
          this.pushMessage({
            style: 'success',
            title: '登出成功',
            content: res.data.message,
          });
          this.$router.push('/login');
          this.$cookies.remove('getMarried');
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '登出失敗',
            content: err.response.data.message,
          });
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    const toggleBtn = document.querySelector('#toggle-btn');
    const closeBtn = document.querySelector('#closeBtn');
    const body = document.querySelector('body');
    const routerLinks = document.querySelectorAll('#routerLink');
    routerLinks.forEach((routerLink) => {
      routerLink.addEventListener('click', () => {
        routerLink.classList.toggle('adActive');
        body.classList.remove('sideBar-toggled');
      });
    });
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.toggle('sideBar-toggled');
    });
    closeBtn.addEventListener('click', () => {
      body.classList.remove('sideBar-toggled');
    });
  },
};
</script>

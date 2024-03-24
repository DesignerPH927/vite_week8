<template>
  <VLoading :active="isLoading"></VLoading>
  <ToastMessages></ToastMessages>
  <div class="loginBG">
    <div class="container">
      <div class="loginWrap">
        <div class="card m-4
        border border-0 loginBlur
        bg-transparent"
        style="width:20rem; min-width: 15rem;">
          <div class="card-body">
            <h3 class="fw-bold fs-3
            text-center my-4">
              後台管理
            </h3>
            <div class="form-floating mb-4">
              <input type="text" class="form-control
              rounded-0 bg-transparent" placeholder="email address"
              id="email"
              v-model.trim="user.username">
              <label for="email" class="form-label fw-bold">
                帳號
              </label>
            </div>
            <div class="form-floating mb-4">
              <input type="password" class="form-control
              rounded-0 bg-transparent" placeholder="password"
              id="password"
              v-model="user.password">
              <label for="password" class="form-label fw-bold">
                密碼
              </label>
            </div>
            <div class="mb-3 d-flex gap-3">
              <button class="btn btn-outline-dark
              w-100 fw-bold rounded-0"
              type="button"
              @click="HomePage">
                <i class="bi bi-house-fill fs-4"></i>
              </button>
              <button class="btn btn-outline-dark
              w-100 fw-bold rounded-0 fs-5"
              type="button"
              @click.prevent="loginAdmin">
                登入
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

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isLoading: true,
      user: {
        username: 'getmarried@gmail.com',
        password: 'getmarried',
      },
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    loginAdmin() {
      this.isLoading = true;
      this.$http.post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          this.isLoading = false;
          const { token, expired } = res.data;
          document.cookie = `getMarried=${token}; expires=${new Date(expired)};`;
          this.$router.push('/admin/adProducts/adProductList');
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '登入失敗',
            content: err.response.data.message,
          });
          this.$router.push('/login');
        });
    },
    HomePage() {
      this.$router.push('/');
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    // 進入網頁時會刷新一次
    window.onload = () => {
      if (window.location.href.indexOf('#reloaded') === -1) {
        window.location.href += '#reloaded';
        window.location.reload();
      }
    };
    window.onload();
  },
};
</script>

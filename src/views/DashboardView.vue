<template>
  <ToastMessages></ToastMessages>
  <RouterView v-if="status"></RouterView>
</template>

<script>
import { mapActions } from 'pinia';
import ToastMessages from '../components/ToastMessage.vue';
import userToastMessageStore from '../stores/statusStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      status: false,
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)getMarried\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;

      this.$http.post(`${VITE_URL}/api/user/check`)
        .then((res) => {
          this.status = true;
          this.pushMessage({
            style: 'success',
            title: '驗證成功',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.$router.push('/');
          this.pushMessage({
            style: 'danger',
            title: '驗證失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>

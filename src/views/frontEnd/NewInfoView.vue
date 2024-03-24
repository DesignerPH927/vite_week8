<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="info">
    <!-- NewsModal -->
    <NewsModal
      ref="news"
      :article-modal="tempArticle"
    ></NewsModal>
    <div class="infoHeader"></div>
    <div class="container">
      <h3 class="text-center
        textTitle">
        <span>♥</span>最新資訊<span>♥</span>
          <small class="d-block textSmall">
            NEWS
          </small>
        </h3>
      <div class="position-relative pt-3 pb-5">
        <div class="mb-7"
          v-for="item in remoteArticles"
          :key="item.id">
          <div class="row justify-content-center
            g-3 g-md-6">
            <div class="col-md-5">
              <img :src="item.imageUrl" alt=""
              class="rounded-3 bg-cover w-100"
              height="350px;">
            </div>
            <div class="col-md-6 d-flex flex-column
            justify-content-center">
              <h3 class="fw-bold text-center mb-4 fs-2">
                {{item.title}}
              </h3>
              <p class="text-truncate fs-3 text-center">
                {{item.description}}
              </p>
              <button class="btn btn-outline-lilac
              fw-bold mx-auto
              text-nowrap px-md-5 px-3" type="button"
              @click.prevent="openInfo(item)"
              >
                詳細內容
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsModal from '../../components/NewInfoModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    NewsModal,
  },
  data() {
    return {
      isLoading: true,
      remoteArticles: [],
      tempArticle: {},
    };
  },
  methods: {
    getArticles() {
      this.$http(`${VITE_URL}/api/${VITE_PATH}/articles`)
        .then((res) => {
          // console.log('res', res);
          this.remoteArticles = res.data.articles;
        });
    },
    openInfo(news) {
      this.tempArticle = news;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/article/${this.tempArticle.id}`)
        .then((res) => {
          this.tempArticle = res.data.article;
          this.$refs.news.show();
        });
    },
  },
  mounted() {
    this.getArticles();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

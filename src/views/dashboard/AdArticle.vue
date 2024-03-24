<template>
  <VLoading :active="isLoading" />
  <!-- ArticleModal -->
  <ArticleModal
    ref="articleModal"
    :is-status="isStatus"
    :article-modal="tempArticle"
    :update-article="updateArticle"
  ></ArticleModal>
  <!-- delModal -->
  <DelModal
    ref="delModal"
    :item-modal="tempArticle"
    :del-product="delArticle"
  ></DelModal>
  <div class="container">
    <div class="p-lg-4 py-4 px-2">
      <div class="card">
        <div class="card-header bg-transparent text-end">
          <button class="btn btn-lilac fw-bold" type="button"
          @click.prevent="openModal('new')">
            新增貼文
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle text-nowrap
            text-center">
              <thead>
                <tr>
                  <th width="150px;">標題</th>
                  <th width="150px;">作者</th>
                  <th>描述</th>
                  <th width="150px;">建立時間</th>
                  <th width="150px;">是否公開</th>
                  <th width="200px;">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="article in remoteArticles"
                :key="article.id">
                  <td>{{article.title}}</td>
                  <td>{{article.author}}</td>
                  <td>{{article.description}}</td>
                  <td>{{$filters.date(article.create_at)}}</td>
                  <td>
                    <span v-if="article.isPublic"
                      class="text-success">已上架</span>
                    <span v-else
                      class="text-danger">未上架</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-outline-warning me-2
                      btn-sm" type="button"
                      @click.prevent="openModal('edit', article)"
                      >
                        <i class="bi bi-pen-fill"></i>
                        編輯
                      </button>
                      <button class="btn btn-outline-danger
                      btn-sm" type="button"
                      @click.prevent="openModal('delete', article)">
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
            :get-products="getArticles"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '../../stores/statusStore';
import ArticleModal from '../../components/ArticleModal.vue';
import DelModal from '../../components/DelModal.vue';
import PaginationComponent from '../../components/PaginationView.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    ArticleModal,
    DelModal,
    PaginationComponent,
  },
  data() {
    return {
      isLoading: false,
      remoteArticles: [],
      pagination: [],
      isStatus: false,
      tempArticle: {},
    };
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    getArticles(pagination = 1) {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/admin/articles?page=${pagination}`)
        .then((res) => {
          this.isLoading = false;
          this.remoteArticles = res.data.articles;
          this.pagination = res.data.pagination;
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
    getArticle(article) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${article.id}`;
      this.isLoading = true;
      this.$http(url)
        .then((res) => {
          this.isLoading = false;
          this.tempArticle = {
            ...res.data.article,
          };
          this.isStatus = false;
          this.$refs.articleModal.show();
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
    openModal(status, article) {
      if (status === 'new') {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isStatus = true;
        this.$refs.articleModal.show();
      } else if (status === 'edit') {
        this.getArticle(article);
      } else if (status === 'delete') {
        this.tempArticle = { ...article };
        this.$refs.delModal.show();
      }
    },
    updateArticle(article) {
      this.tempArticle = article;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`;
      let http = 'post';
      let articleMessage = '新增貼文';

      if (!this.isStatus) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`;
        http = 'put';
        articleMessage = '編輯貼文';
      }
      this.isLoading = true;
      this.$http[http](url, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false;
          this.$refs.articleModal.hide();
          this.getArticles();
          this.pushMessage({
            style: 'success',
            title: articleMessage,
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.articleModal.hide();
          this.pushMessage({
            style: 'danger',
            title: '錯誤訊息',
            content: err.response.data.message,
          });
        });
    },
    delArticle(article) {
      this.tempArticle = article;
      this.isLoading = true;
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`)
        .then((res) => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.getArticles();
          this.pushMessage({
            style: 'success',
            title: '刪除貼文',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$refs.delModal.hide();
          this.pushMessage({
            style: 'danger',
            title: '刪除貼文',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>

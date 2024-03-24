<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div v-if="isStatus"
          class="modal-header bg-lilac">
          <h1 class="modal-title fs-5 text-white"
            id="exampleModalLabel">
            新增貼文
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div v-else
          class="modal-header bg-warning">
          <h1 class="modal-title fs-5 text-white"
            id="exampleModalLabel">
            編輯貼文
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs row" id="myTab" role="tablist">
            <li class="nav-item col-md-6" role="presentation">
              <button class="nav-link active w-100 text-dark"
                id="home-tab" data-bs-toggle="tab"
                data-bs-target="#theme" type="button"
                role="tab" aria-controls="home"
                aria-selected="true">
                  貼文主題
              </button>
            </li>
            <li class="nav-item col-md-6" role="presentation">
              <button class="nav-link w-100 text-dark" id="profile-tab"
                data-bs-toggle="tab" data-bs-target="#content"
                type="button" role="tab" aria-controls="profile"
                aria-selected="false">
                  貼文內容
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active"
              id="theme" role="tabpanel"
              aria-labelledby="home-tab">
              <div class="card my-4 mx-auto"
                style="max-width: 35rem;">
                <div class="card-body">
                  <div class="mb-3">
                    <label for="img" class="form-label">
                      輸入圖片網址
                    </label>
                    <input type="text" class="form-control"
                    placeholder="請輸入圖片網址" id="img"
                    v-model="tempArticleModal.imageUrl">
                    <img v-if="tempArticleModal.imageUrl"
                      :src="tempArticleModal.imageUrl"
                      class="img-thumbnail d-block mx-auto"
                      style="width: 100%; height: 300px;">
                  </div>
                  <div class="mb-3">
                      <label for="title" class="form-label">
                        標題
                      </label>
                      <input type="text" class="form-control"
                      placeholder="請輸入標題" id="title"
                      v-model="tempArticleModal.title"
                      >
                  </div>
                  <div class="mb-3">
                      <label for="author" class="form-label">
                        作者
                      </label>
                      <input type="text" class="form-control"
                      placeholder="請輸入作者" id="author"
                      v-model="tempArticleModal.author"
                      >
                  </div>
                  <div class="mb-3">
                      <label for="date" class="form-label">
                        文章建立日期
                      </label>
                      <input type="date" class="form-control"
                      id="date"
                      v-model="create_at"
                      >
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="content"
              role="tabpanel"
              aria-labelledby="profile-tab">
                <div class="card my-4 mx-auto">
                  <div class="card-header bg-transparent">
                    <div class="mb-3">
                      <h6>標籤</h6>
                      <div class="row g-1">
                        <div class="col-md-2"
                          v-for="(tag, key) in tempArticleModal.tag"
                          :key="key">
                          <div class="input-group input-group-sm">
                            <input type="text" class="form-control"
                            placeholder="輸入標籤"
                            v-model="tempArticleModal.tag[key]">
                            <button class="btn btn-outline-danger"
                            type="button"
                            @click.prevent="
                            tempArticleModal.tag.splice(key, 1)">
                              <i class="bi bi-x-lg"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <button
                            v-if="!tempArticleModal.tag.length ||
                            tempArticleModal.tag[tempArticleModal.tag.length - 1]"
                            class="btn btn-outline-lilac
                            px-4 btn-sm" type="button"
                            @click.prevent="tempArticleModal.tag.push('')"
                            >新增標籤
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label for="description" class="form-label">
                        文章描述
                      </label>
                      <textarea id="description" rows="3"
                      class="form-control"
                      placeholder="請輸入文章描述"
                      v-model="tempArticleModal.description"
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <ckeditor
                        :editor="editor"
                        :config="editorConfig"
                        v-model="tempArticleModal.content"
                        ></ckeditor>
                    </div>
                    <div class="mb-3 d-flex justify-content-end">
                      <div class="form-check">
                        <input type="checkbox"
                        class="form-check-input"
                        id="public"
                        v-model="tempArticleModal.isPublic"
                        :true-value=true
                        :false-value=false
                        >
                        <label for="public" class="form-check-label">
                          是否公開
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
            data-bs-dismiss="modal">取消</button>
          <button v-if="isStatus"
            type="button" class="btn btn-lilac text-white"
            @click.prevent="updateArticle(tempArticleModal)"
            >
            新增
          </button>
          <button v-else
            type="button" class="btn btn-warning"
            @click.prevent="updateArticle(tempArticleModal)"
            >
            編輯
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import modalMixins from '../mixins/modal';

export default {
  props: ['articleModal', 'isStatus', 'updateArticle'],
  mixins: [modalMixins],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'link', 'uploadImage',
          '|', 'bulletedList', 'numberedList'],
      },
      tempArticleModal: {
        tag: [''],
      },
      create_at: 0,
    };
  },
  watch: {
    articleModal() {
      this.tempArticleModal = {
        ...this.articleModal,
        tag: this.articleModal.tag || [],
        isPublic: this.articleModal.isPublic || false,
      };
      [this.create_at] = new Date(this.tempArticleModal.create_at * 1000).toISOString().split('T');
    },
    create_at() {
      this.tempArticleModal.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
};
</script>

<style lang="scss">
.ck-editor__editable {
  height: 200px;
}
</style>

<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div v-if="isStatus"
          class="modal-header bg-lilac">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
            新增產品
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-else
          class="modal-header bg-warning">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
            編輯產品
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body pb-0">
          <ul class="nav nav-tabs row" id="myTab" role="tablist">
            <li class="nav-item col-md-6" role="presentation">
              <button class="nav-link active w-100 text-dark" id="home-tab"
                data-bs-toggle="tab" data-bs-target="#itemContent" type="button"
                role="tab" aria-controls="home"
                aria-selected="true">商品內容</button>
            </li>
            <li class="nav-item col-md-6" role="presentation">
              <button class="nav-link w-100 text-dark" id="profile-tab"
                data-bs-toggle="tab" data-bs-target="#itemImg"
                  type="button" role="tab" aria-controls="profile"
                  aria-selected="false">商品圖片</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="itemContent"
              role="tabpanel" aria-labelledby="home-tab">
              <div class="my-4">
                <div class="row">
                  <div class="col-md-10">
                    <div class="mb-3">
                      <label for="category" class="form-label d-flex
                      align-items-start">
                        分類<i class="bi bi-asterisk text-danger ms-1"
                        style="font-size: 8px;"></i>
                      </label>
                      <input type="text" class="form-control"
                      id="category" placeholder="請輸入分類"
                      v-model="tempProductModal.category"
                      >
                    </div>
                  </div>
                  <div class="col-md-2 d-flex align-items-end">
                    <div class="form-check mb-3 d-none d-lg-block">
                      <input type="checkbox" class="form-check-input"
                      id="enabled"
                      v-model="tempProductModal.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      >
                      <label for="enabled" class="form-check-label">
                        是否啟用
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="title" class="form-label d-flex
                        align-items-start">
                        標題<i class="bi bi-asterisk text-danger ms-1"
                        style="font-size: 8px;"></i>
                      </label>
                      <input type="text" class="form-control"
                      id="title" placeholder="請輸入標題"
                      v-model="tempProductModal.title"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="unit" class="form-label d-flex
                        align-items-start">
                        單位<i class="bi bi-asterisk text-danger ms-1"
                        style="font-size: 8px;"></i>
                      </label>
                      <input type="text" class="form-control"
                      id="unit" placeholder="請輸入單位"
                      v-model="tempProductModal.unit"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="origin_price" class="form-label d-flex
                        align-items-start">
                        原價<i class="bi bi-asterisk text-danger ms-1"
                        style="font-size: 8px;"></i>
                      </label>
                      <input type="number" class="form-control"
                      id="origin_price" placeholder="請輸入原價"
                      min="0"
                      v-model.number="tempProductModal.origin_price"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="price" class="form-label d-flex
                        align-items-start">
                        售價<i class="bi bi-asterisk text-danger ms-1"
                        style="font-size: 8px;"></i>
                      </label>
                      <input type="number" class="form-control"
                      id="price" placeholder="請輸入售價"
                      min="0"
                      v-model.number="tempProductModal.price"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="description" class="form-label">
                        產品描述
                      </label>
                      <textarea id="description" rows="3"
                        class="form-control"
                        v-model="tempProductModal.description"
                        ></textarea>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="content" class="form-label">
                        產品內容
                      </label>
                      <textarea id="content" rows="3"
                      class="form-control"
                      v-model="tempProductModal.content"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-md-12 d-block d-lg-none
                  d-flex justify-content-end">
                    <div class="form-check mb-3 ">
                      <input type="checkbox" class="form-check-input"
                      id="enabled"
                      v-model="tempProductModal.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      >
                      <label for="enabled" class="form-check-label">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="itemImg" role="tabpanel"
              aria-labelledby="profile-tab">
              <div class="my-4">
                <div class="row g-md-4 g-3">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="majorImg" class="form-label">
                            輸入主要圖片網址
                          </label>
                          <input type="text" class="form-control"
                          id="majorImg" placeholder="輸入圖片網址"
                          v-model="tempProductModal.imageUrl"
                          >
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="upImg" class="form-label">
                            或 上傳圖片
                          </label>
                          <input type="file" class="form-control"
                          id="upImg" ref="inputFile"
                          @change="uploadFile">
                        </div>
                      </div>
                    </div>
                    <img v-if="tempProductModal.imageUrl"
                      :src="tempProductModal.imageUrl"
                      class="img-thumbnail">
                  </div>
                  <div class="col-md-6">
                    <div v-if="Array.isArray(tempProductModal.imagesUrl)">
                      <button
                        v-if="!tempProductModal.imagesUrl.length ||
                        tempProductModal.imagesUrl[tempProductModal.imagesUrl.length - 1]"
                        class="btn btn-sm btn-outline-lilac w-100"
                        @click.prevent="tempProductModal.imagesUrl.push('')"
                        type="button">新增多圖片
                      </button>
                      <div class="my-3">
                        <div class="row g-3">
                          <div class="col-md-6"
                          v-for="(img, key) in tempProductModal.imagesUrl"
                            :key="key">
                            <input type="text" class="form-control"
                            placeholder="輸入圖片網址"
                            v-model="tempProductModal.imagesUrl[key]"
                            >
                            <img v-if="img"
                              :src="img" alt="" class="img-thumbnail">
                            <button
                              class="btn btn-sm btn-outline-danger w-100"
                              @click.prevent="tempProductModal.imagesUrl.splice(key, 1)"
                              type="button">刪除圖片
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
            data-bs-dismiss="modal">
            取消
          </button>
          <button v-if="isStatus"
            type="button" class="btn btn-lilac text-white"
            @click.prevent="updateProduct(tempProductModal)"
            >
            新增
          </button>
          <button v-else
            type="button" class="btn btn-warning text-white"
            @click.prevent="updateProduct(tempProductModal)"
            >
            編輯
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import userToastMessageStore from '../stores/statusStore';
import modalMixins from '../mixins/modal';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['productModal', 'isStatus', 'updateProduct'],
  mixins: [modalMixins],
  data() {
    return {
      tempProductModal: {},
    };
  },
  watch: {
    productModal() {
      this.tempProductModal = this.productModal;
    },
  },
  methods: {
    ...mapActions(userToastMessageStore, ['pushMessage']),
    uploadFile(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);

      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
        .then((res) => {
          this.tempProductModal.imageUrl = res.data.imageUrl;
          this.$refs.inputFile.value = '';
          this.pushMessage({
            style: 'success',
            title: '圖片上傳結果',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '圖片上傳結果',
            content: err.response.data.message,
          });
        });
    },
  },
};
</script>

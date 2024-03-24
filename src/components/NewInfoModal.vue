<template>
  <div class="modal fade" id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-dialog-scrollable
    modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-lilac">
          <h1 class="modal-title fs-5 text-white"
            id="exampleModalLabel">
            {{tempArticleModal.title}}
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
          <small class="d-block text-center mb-3"
          style="color: #9999cc;">
            {{$filters.date(tempArticleModal.create_at)}}
          </small>
          <div class="card bg-transparent border-0">
            <img :src="tempArticleModal.imageUrl" class="rounded-3
            bg-cover" height="350px;">
            <div class="card-body">
              <p class="card-text mb-0"
              style="color: #9966cc;
              text-align:justify;"
              v-html="tempArticleModal.content"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../mixins/modal';

export default {
  props: ['articleModal'],
  mixins: [modalMixins],
  data() {
    return {
      tempArticleModal: {},
    };
  },
  watch: {
    articleModal() {
      this.tempArticleModal = this.articleModal;
    },
  },
};
</script>

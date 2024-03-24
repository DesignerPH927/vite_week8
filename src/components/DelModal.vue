<template>
<!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
            刪除產品
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            是否刪除
            <strong v-if="tempProductModal.title"
              class="text-danger fw-bold">
              『 {{tempProductModal.title}} 』
            </strong>
            <strong class="text-danger fw-bold">
              (刪除後將無法恢復)。
            </strong>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-outline-dark"
          @click.prevent="delProduct(tempProductModal)"
          >刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../mixins/modal';

export default {
  props: ['itemModal', 'delProduct'],
  mixins: [modalMixins],
  data() {
    return {
      tempProductModal: {},
    };
  },
  watch: {
    itemModal() {
      this.tempProductModal = this.itemModal;
    },
  },
};
</script>

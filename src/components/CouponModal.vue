<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div v-if="isStatus"
          class="modal-header bg-lilac">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
            新增優惠卷
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div v-else
          class="modal-header bg-warning">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
            編輯優惠卷
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">
              標題
            </label>
            <input type="text" class="form-control"
              placeholder="請輸入標題" id="title"
              v-model="tempCoupon.title"
              >
          </div>
          <div class="mb-3">
            <label for="code" class="form-label">
              優惠碼
            </label>
            <input type="text" class="form-control"
              placeholder="請輸入優惠碼" id="code"
              v-model="tempCoupon.code"
              >
          </div>
          <div class="mb-3">
            <label for="dueDate" class="form-label">
              到期日
            </label>
            <input type="date" class="form-control"
              id="dueDate"
              v-model="due_date"
              >
          </div>
          <div class="mb-3">
            <label for="percent" class="form-label">
              折扣百分比
            </label>
            <input type="number" class="form-control"
              placeholder="請輸入折扣百分比" id="percent"
              min="0"
              v-model.number="tempCoupon.percent"
              >
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input"
              id="enabled"
              v-model="tempCoupon.is_enabled"
              :true-value="1"
              :false-value="0"
              >
              <label for="enabled" class="form-check-label">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
            data-bs-dismiss="modal">取消</button>
          <button v-if="isStatus"
            type="button" class="btn btn-lilac text-white"
            @click.prevent="updateCoupon(tempCoupon)"
            >
            新增
          </button>
          <button v-else
            type="button" class="btn btn-warning text-white"
            @click.prevent="updateCoupon(tempCoupon)"
            >
            編輯
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../mixins/modal';

export default {
  props: ['isStatus', 'couponModal', 'updateCoupon'],
  mixins: [modalMixins],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  watch: {
    couponModal() {
      this.tempCoupon = this.couponModal;
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
};
</script>

<template>
  <div class="toast-container position-fixed p-3 top-0 end-0">
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true" ref="toast">
      <div class="toast-header">
        <i
          v-if="msg.style === 'success'"
          :class="`text-${msg.style}`"
          class="bi bi-emoji-grin-fill me-2 fs-4"></i>
        <i
          v-else
          :class="`text-${msg.style}`"
          class="bi bi-emoji-tear-fill me-2 fs-4"></i>
        <strong class="me-auto">
          <span v-if="msg.style === 'success'" class="text-success">
            {{ msg.title }}
          </span>
          <span v-else class="text-danger">
            {{ msg.title }}
          </span>
        </strong>
        <button type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="toastClear(key)"
          ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
// import Toast from 'bootstrap';
import { mapState, mapActions } from 'pinia';
import userToastMessage from '../stores/statusStore';

export default {
  computed: {
    ...mapState(userToastMessage, ['messages']),
  },
  methods: {
    ...mapActions(userToastMessage, ['toastClear']),
  },
};
</script>

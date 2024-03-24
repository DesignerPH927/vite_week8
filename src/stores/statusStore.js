import { defineStore } from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    messages: [],
  }),
  actions: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    toastClear(index) {
      this.messages.splice(index, 1);
    },
    pushMessage(data) {
      const { style = 'success', title, content } = data;
      this.messages.push({
        style,
        title,
        content,
      });
      this.toastShow();
    },
  },
});

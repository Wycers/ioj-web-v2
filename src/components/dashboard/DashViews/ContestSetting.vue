<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)
      v-card(width="90%" max-width="1024" class="mx-auto my-5" outlined)
        iframe( ref="iframe" :src="src" style="width:100%;height: 800px" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes")
        v-btn( @click="sendMessage") 向 iframe 发送信息
</template>

<script>
export default {
  data() {
    return {
      src: 'http://10.20.67.48:3000/settings',
      iframeWin: {},
      headers: [
        {
          text: 'Problem ID',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Action', value: 'action' },
      ],
      contests: [
        {
          id: 1,
        },
      ],
    };
  },
  mounted() {
    this.iframeWin = this.$refs.iframe.contentWindow;
    this.$nextTick(() => {
      window.addEventListener('message', this.handleMessage);
    });
  },
  destroyed() {
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
    sendMessage() {
      this.iframeWin.postMessage(
        {
          cmd: 'doSomething',
          params: {},
        },
        '*'
      );
    },
    handleMessage(event) {
      const data = event.data;
      switch (data.cmd) {
        case 'ready-for-receiving':
          break;
      }
    },
  },
};
</script>

<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)
      v-flex(md12)
        h1(class="title") Enter the Problem ID
          v-row(align="center" justify="space-around")
            v-form
              v-row
                v-text-field(v-model="pid" label="Problem ID" required)
              v-row(justify="space-around")
                v-btn(color="primary" v-on:click="rejudgeButton()") Rejudge
</template>
<script>
import { rejudge } from '@/api/submission';

export default {
  data() {
    return {
      pid: '',
    };
  },
  methods: {
    rejudgeButton() {
      alert(this.pid);
      rejudge(parseInt(this.pid));
    },
  },
};
</script>

<style>
.title {
  text-align: center;
}
</style>

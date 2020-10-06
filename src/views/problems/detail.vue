<template lang="pug">
v-container(grid-list-xl align-center)
  v-layout(row wrap)

    PostCard(:id="data.id" :html="data.descriptionHtml" :title="data.title" :memory="data.memoryLimit" :time="data.timeLimit")
    CodeEditor(
      :code="codeValue"
      :pid="pid",
      :type="data.type"
    )
</template>
<script>
import PostCard from '@/components/problems/PostCard.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import { getProblem } from '@/api/problem';
export default {
  components: {
    PostCard,
    CodeEditor,
  },

  data() {
    return {
      codeValue: `var a = 10;`,
      problem: {},
      data: {},
    };
  },
  computed: {
    pid() {
      return this.$route.params.pid;
    },
  },
  mounted() {
    getProblem(this.$route.params.pid).then(res => (this.data = res));
  },
};
</script>

<template lang="pug">
v-container(grid-list-xl, align-center)
  v-layout(row, wrap)
    PostCard(:name='name', :shadowZ='14', :layout='"post"')
    //- CodeEditor(
    //-   :code="codeValue"
    //-   :name="name",
    //-   :type="data.type"
    //- )
    Upload(:name='name')
</template>
<script>
import PostCard from '@/components/problems/PostCard.vue';
import Upload from '@/components/problems/Upload.vue';
// import CodeEditor from '@/components/CodeEditor.vue';
import { getProblem } from '@/api/problem';
export default {
  components: {
    PostCard,
    Upload,
    // CodeEditor,
  },

  data() {
    return {
      codeValue: `var a = 10;`,
      problem: {},
      data: {},
    };
  },
  computed: {
    name() {
      return this.$route.params.name;
    },
  },
  mounted() {
    getProblem(this.name).then(res => (this.data = res));
  },
};
</script>

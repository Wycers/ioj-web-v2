<template lang="pug">
  v-card(
    width="90%"
    max-width="1024"
    class="mx-auto my-5"
    :class="cardClass"
    tag="article")
    v-card-title(class="justify-center") Discussion of {{ problem.title }}
      div(v-for="item in tree.children"  width="100%" max-width="896" class="diss")
        tree(:id="item.id",
                    :user="item.user"
                    :children="item.children"
                    :content="item.content",
                    :depth="0"
                    :pid="problem.id"
                    :timestamp="item.timestamp")

    div(class="diss2")
      v-textarea(
        solo
        v-model="textfield"
        name="textfield"
        label="Write your reply"
      )

      v-btn(color="primary" v-on:click="clickSubmit()") Submit

</template>

<script>
import Recursion from '@/components/Recursion';
import { getDiscussion, getProblem, createReply } from '@/api/problem';
export default {
  components: {
    tree: Recursion,
  },
  data() {
    return {
      id: 0,
      tree: {},
      problem: {},
      textfield: '',
    };
  },
  created() {
    this.id = this.$route.params.pid;
  },
  mounted() {
    getProblem(this.id).then(res => (this.problem = res));
    getDiscussion(this.id).then(res => {
      this.tree = res;
      this.tree.children.sort((a, b) => {
        return parseInt(a.timestamp) - parseInt(b.timestamp);
      });
    });
  },
  methods: {
    clickSubmit() {
      createReply(this.id, null, this.textfield)
        .then(res => {
          alert('Reply success');
          this.$router.go(0);
        })
        .catch(res => alert('Reply failed'));
    },
  },
};
</script>

<style>
.diss {
  width: 896px;
}
.diss2 {
  padding: 20px;
}
</style>

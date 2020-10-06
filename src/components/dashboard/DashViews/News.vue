<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)
      v-flex(md12)
        v-dialog(v-model="dialog" height="1000" width="1000")
          template(v-slot:activator="{ on }")
            v-container
                v-textarea(
                    solo
                    v-model="textfield"
                    name="textfield"
                    label="Too young too simple"
                )
                v-btn(color="primary" v-on:click="clickUpdate()") I am angry

</template>

<script>
// import { getNews, updateNews } from '@/api/news'
export default {
  data() {
    return {
      dialog: false,
      textfield: '',
    };
  },
  // mounted() {
  //   getNews().then(res => this.textfield = res)
  // },
  // methods: {
  //   clickUpdate() {
  //     updateNews(this.textfield)
  //       .then(res => {
  //         alert('Update successfully')
  //       })
  //   }
  // }
};
</script>

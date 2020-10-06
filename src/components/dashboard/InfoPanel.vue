<template>
  <v-card>
    <v-card-title><h4>Information</h4></v-card-title>
    <v-divider />
    <v-list dense>
      <v-list-item>
        <v-list-item-content>Submitter:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.user
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Problem:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.problem
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Language:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.language
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Submit At:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.submitAt
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Score:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.score
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Total Time:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.totalTime
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Peak Memory:</v-list-item-content>
        <v-list-item-content class="align-end">{{
          infor.peakMemory
        }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { getSubmission } from '@/api/submission';
export default {
  props: {
    infor: {
      type: Object,
      default: () => ({
        user: 233,
        language: 'shits',
        problem: 233,
        status: 'shit',
        peakMemory: 233,
        score: 233,
        totalTime: 666,
      }),
    },
  },
  data: function() {
    return {
      // item: this.result,
      name: 'Information',
    };
  },
  // async created() {
  //   this.load();
  // }
  // methods: {
  //   async load() {
  //     try {
  //       console.log("now we have loading ");
  //       console.log(this.result.user);

  //       console.log("wdnmd");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // query() {
  //   try {
  //     getSubmission(this.$route.params.sid).then(res => {
  //       console.log(res);
  //       this.item.submitter = res.user;
  //       this.item.problem = res.problem;
  //       this.item.language = res.language;
  //       this.item.timestamp = res.timestamp;

  //       this.item.cases = res.cases;
  //       return "fine";
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  // calInfor() {
  //   try {
  //     var tmpCnt = 0;
  //     var tmpTime = 0;
  //     var memory = 0;
  //     for (var i in this.item.cases) {
  //       if (this.item.cases[i].status == "ACCEPTED") {
  //         tmpCnt += 1;
  //       }
  //       tmpTime += this.item.cases[i].timeUsage;

  //       memory = Math.max(memory, this.item.cases[i].memoryUsage);
  //     }
  //     this.item.score = (tmpCnt / this.item.cases.length) * 100;

  //     this.item.totalTime = tmpTime;
  //     this.item.peakMemory = memory;
  //     this.item.submitAt = new Date(parseInt(this.item.timestamp) * 1000)
  //       .toLocaleString()
  //       .replace(/:\d{1,2}$/, " ");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // }
};
</script>

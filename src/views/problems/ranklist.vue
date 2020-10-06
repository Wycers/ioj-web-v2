<template lang="pug">
  v-layout(row wrap)
    v-card(width="90%" max-width="1024" class="mx-auto my-5")
      v-card-title(class="display-1 mb-3 justify-center" ) RankList
      div
         v-data-table(:headers="headers"
                  :items="rankData"
                  :items-per-page="10"
                  class="elevation-1")

</template>

<script>
import { getProblemRanklist } from '@/api/problem';

export default {
  data() {
    return {
      id: 0,
      rankData: [],
      headers: [
        {
          text: 'Submission ID',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'User ID',
          align: 'center',
          sortable: false,
          value: 'user',
        },
        {
          text: 'Language',
          align: 'center',
          sortable: false,
          value: 'language',
        },

        { text: 'Time (ms)', align: 'center', sortable: true, value: 'time' },
        {
          text: 'Memory(MB) ',
          align: 'center',
          sortable: true,
          value: 'memory',
        },
      ],
    };
  },
  created() {
    this.id = this.$route.params.pid;
  },
  mounted() {
    getProblemRanklist(this.id).then(res => {
      this.rankData = res;
      for (const sub of this.rankData) {
        if (sub.cases.length > 0) {
          sub.memory = (sub.cases[0].memoryUsage * 1.0) / 1000.0;
          sub.time = sub.cases[0].timeUsage;
        } else {
          sub.memory = sub.time = '--';
        }
      }
    });
  },
  methods: {},
};
</script>

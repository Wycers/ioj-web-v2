<template lang="pug">
v-layout(row, wrap)
  v-card.mx-auto.my-5(width='90%', max-width='1024')
    v-card-title.display-1.mb-3.justify-center RankList {{ title }}
    div
      v-data-table.elevation-1(
        :headers='headers',
        :items='items',
        :sort-by='sortBy',
        :sort-desc='sortDesc',
        :hide-default-footer='true',
        multi-sort
      )
        template(v-slot:item.rank='{ index }') {{ index + 1 }}
</template>

<script>
import { getRanklist } from '@/api/ranklist';

export default {
  data() {
    return {
      ranklist: {
        metrics: [],
      },
      error: '',
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    title() {
      return this.ranklist.title;
    },
    metrics() {
      const metrics = this.ranklist.metrics;
      metrics.sort(function(a, b) {
        return a.priority - b.priority;
      });
      return metrics;
    },
    sortBy() {
      return this.metrics.map(metric => metric.key);
    },
    sortDesc() {
      return this.metrics.map(metric => metric.order !== 'inc');
    },
    headers() {
      let res = [
        {
          text: 'Rank',
          align: 'center',
          sortable: false,
          value: 'rank',
        },
        {
          text: 'User',
          align: 'center',
          sortable: false,
          value: 'user',
        },
      ];
      res = res.concat(
        this.metrics.map(metric => ({
          text: metric.key,
          align: 'center',
          sortable: true,
          value: metric.key,
        }))
      );
      return res;
    },
    items() {
      const records = this.ranklist?.records;
      if (!records) return [];
      const mp = {};
      records.forEach(record => {
        const name = record?.account?.name;
        if (!name) {
          return;
        }
        if (!(name in mp)) {
          mp[name] = [];
        }
        mp[name].push(record);
      });
      return Object.keys(mp)
        .map(key => ({
          user: key,
          records: mp[key],
        }))
        .map(tmp => {
          const res = {};
          res.user = tmp.user;
          tmp.records.forEach(record => (res[record.key] = record.value));
          return res;
        });
    },
  },

  beforeRouteEnter(to, from, next) {
    getRanklist(to.params.id).then(res => {
      next(vm => vm.setData(res));
    });
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    this.ranklist = null;
    getRanklist(to.params.id, (err, ranklist) => {
      this.setData(err, ranklist);
      next();
    });
  },
  methods: {
    setData(ranklist) {
      this.ranklist = ranklist;
    },
  },
};
</script>

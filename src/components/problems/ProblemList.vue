<template lang="pug">
v-card
  v-card-title
    | Problems
    v-spacer
    v-text-field(
      v-model='search',
      append-icon='mdi-magnify',
      label='Search',
      single-line,
      hide-details
    )
  v-data-table.elevation-1(
    loading-text='Loading... Please wait',
    hide-default-footer='',
    item-key='name',
    sort-by='status',
    :sort-desc='true',
    :headers='headers',
    :items='problems',
    :page.sync='page',
    :search='search',
    :items-per-page='itemsPerPage',
    :loading='loading',
    @page-count='pageCount = $event'
  )
    //- template(v-slot:header.likes='{ header }')
    //-   v-icon(color='red') fa-heart
    //-   span {{ header.text }}
    //- template(v-slot:header.useful='{ header }')
    //-   v-icon(color='blue') fa-tools
    //-   span {{ header.text }}
    //- template(v-slot:header.easy='{ header }')
    //-   v-icon(color='green') fa-fish
    //-   span {{ header.text }}
    template(v-slot:item.name='{ item }')
      router-link(:to='`/p/${item.name}`') {{ item.title }}
    template(v-slot:item.status='{ item }')
      v-simple-checkbox(
        :value='item.status',
        :ripple='false',
        color='primary',
        @input='check(item)'
      )
  .text-center.pt-2
    v-pagination(:total-visible='7', v-model='page', :length='pageCount')
</template>
<script>
import { getProblems } from '@/api/problem';
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      search: '',
      loading: false,
      problems: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('problem.status'),
          value: 'status',
          align: 'center',
          width: '120px',
        },
        // { text: this.$t('problem.name'), value: 'name', width: '150px' },
        { text: this.$t('problem.name'), value: 'name', width: '380px' },
        // {
        //   text: this.$t('problem.ratings'),
        //   value: 'ratings',
        //   align: 'center',
        //   width: '200px',
        // },
        {
          text: this.$t('problem.acceptance'),
          value: 'likes',
          align: 'center',
          width: '120px',
        },
        {
          text: this.$t('problem.submissions'),
          value: 'useful',
          align: 'center',
          width: '140px',
        },
        // {
        //   text: this.$t('problem.esays'),
        //   value: 'easy',
        //   align: 'center',
        //   width: '120px',
        // },
      ];
    },
    // problems() {
    //   return this.rawproblems.map(problem => ({
    //     ...problem,
    //     status: this.statusproblems.indexOf(problem.name) > -1,
    //   }));
    // },
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        const res = await getProblems('');
        // this.rawproblems = res.data;
        // this.rawproblems.forEach(item => {
        //   item.ratings /= 5;
        // });
        this.problems = res;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    select(event) {
      console.log(event);
    },
    check(evt) {
      evt.status = !evt.status;
      if (evt.status) {
        this.$store.dispatch('user/addstatus', evt.name);
      } else {
        this.$store.dispatch('user/delstatus', evt.name);
      }
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="stylus">
table {
  font-family: google-sans;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

tr th {
  font-size: 18px !important;
}

td {
  font-size: 16px !important;
}

a {
  text-decoration: none;
}
</style>

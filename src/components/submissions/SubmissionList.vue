<template lang="pug">
v-card
  v-card-title
    | Submissions
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
    item-key='submissionId',
    sort-by='status',
    :sort-desc='true',
    :headers='headers',
    :items='submissions',
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
    template(v-slot:item.createdAt='{ item }')
      span {{ item.created_at | moment }}
    template(v-slot:item.name='{ item }')
      router-link(:to='`/s/${item.submissionId}`') {{ item.submissionId }}
    template(v-slot:item.status='{ item }')
      //- v-simple-checkbox(
      //-   :value='item.status',
      //-   :ripple='false',
      //-   color='primary',
      //-   @input='check(item)'
      //- )
      span {{ statusOf(item) }}
    template(v-slot:item.score='{ item }')
      span {{ scoreOf(item) }}
  .text-center.pt-2
    v-pagination(:total-visible='7', v-model='page', :length='pageCount')
</template>
<script>
import { getSubmissions } from '@/api/submission';
import moment from 'moment';
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      search: '',
      loading: false,
      submissions: [],
    };
  },
  computed: {
    headers() {
      return [
        // {
        //   text: this.$t('submission.status'),
        //   value: 'status',
        //   align: 'center',
        //   width: '120px',
        // },
        // { text: this.$t('submission.name'), value: 'name', width: '150px' },
        {
          text: this.$t('submission.createdAt'),
          value: 'createdAt',
          width: '240px',
        },
        {
          text: this.$t('submission.name'),
          value: 'name',
          width: '380px',
          sortable: false,
        },
        {
          text: this.$t('submission.status'),
          value: 'status',
          width: '120px',
          sortable: false,
        },
        {
          text: this.$t('submission.score'),
          value: 'score',
          width: '120px',
          sortable: false,
        },
        // {
        //   text: this.$t('submission.ratings'),
        //   value: 'ratings',
        //   align: 'center',
        //   width: '200px',
        // },
        // {
        //   text: this.$t('submission.acceptance'),
        //   value: 'likes',
        //   align: 'center',
        //   width: '120px',
        // },
        // {
        //   text: this.$t('submission.submissions'),
        //   value: 'useful',
        //   align: 'center',
        //   width: '140px',
        // },
        // {
        //   text: this.$t('submission.esays'),
        //   value: 'easy',
        //   align: 'center',
        //   width: '120px',
        // },
      ];
    },
    // submissions() {
    //   return this.rawsubmissions.map(submission => ({
    //     ...submission,
    //     status: this.statussubmissions.indexOf(submission.name) > -1,
    //   }));
    // },
  },

  filters: {
    moment: function(date) {
      return moment(date).format('MMM Do YY, hh:mm:ss');
    },
  },

  methods: {
    scoreOf(item) {
      if (item.judgements) {
        return item.judgements.length === 0 || item.judgements[0].score === -1
          ? '-'
          : item.judgements[0].score;
      }
      return '-';
    },
    statusOf(item) {
      if (item.judgements) {
        return item.judgements.length === 0
          ? 'Waiting'
          : item.judgements[0].status;
      }
      return 'Waiting';
    },
    moment: function() {
      return moment();
    },
    async fetch() {
      this.loading = true;
      try {
        const res = await getSubmissions();
        // this.rawsubmissions = res.data;
        // this.rawsubmissions.forEach(item => {
        //   item.ratings /= 5;
        // });
        this.submissions = res;
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
      // evt.status = !evt.status;
      // if (evt.status) {
      //   this.$store.dispatch('user/addstatus', evt.name);
      // } else {
      //   this.$store.dispatch('user/delstatus', evt.name);
      // }
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

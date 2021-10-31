<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col>
          <v-card
            min-height="80vh"
            rounded="lg"
            :class="cardClass"
            tag="article"
          >
            <v-card-title class="justify-center">
              {{ submission.submissionId }}
            </v-card-title>

            <v-card-subtitle class="subtitle-1">Submitted At</v-card-subtitle>
            <v-card-text class="font-weight-regular body-1 primary--text">
              {{ submission.created_at | moment }}
            </v-card-text>

            <v-card-subtitle class="subtitle-1">Content</v-card-subtitle>
            <v-card-text>
              <VolumeCard :name="submission.userVolume"></VolumeCard>
            </v-card-text>

            <v-card-subtitle class="subtitle-1">Judge</v-card-subtitle>
            <v-card-text class="font-weight-regular body-1 primary--text">
              <VolumeCard :name="judgementVolume"></VolumeCard>
            </v-card-text>
            <v-card-text class="content custom"> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
// import CodeEditor from '@/components/CodeEditor.vue';
import { getSubmission } from '@/api/submission';
import { mapGetters } from 'vuex';
import VolumeCard from '@/components/volumes/VolumeCard.vue';
import moment from 'moment';

export default {
  components: {
    VolumeCard,
  },

  data() {
    return {
      submission: {},
      shadowZ: 14,
    };
  },

  computed: {
    ...mapGetters({
      username: 'user/username',
    }),

    cardClass() {
      return [
        this.shadowZ ? `elevation-${this.shadowZ}` : '',
        `${this.layout}-card`,
      ];
    },

    name() {
      return this.$route.params.name;
    },

    judgement() {
      const judgements = this.submission?.judgements || [];
      if (judgements.length === 0) {
        return null;
      }
      return judgements[judgements.length - 1];
    },

    judgementVolume() {
      return this.judgement?.args?.volume || '';
    },
  },

  filters: {
    moment: function(date) {
      return moment(date).format('MMM Do YY, hh:mm:ss');
    },
  },

  beforeRouteEnter(to, from, next) {
    getSubmission(to.params.name).then(res => {
      next(vm => vm.setData(res));
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.submission = null;

    getSubmission(to.params.name).then(res => {
      this.setData(res);
      next();
    });
  },
  methods: {
    setData(submission) {
      this.submission = submission;
    },
  },
};
</script>

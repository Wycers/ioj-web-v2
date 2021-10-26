<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col>
          <PostCard
            v-if="!submissionToggle"
            :page="page"
            :shadowZ="14"
            :layout="'post'"
          ></PostCard>
          <Upload v-else :name="name"> </Upload>
        </v-col>
        <v-col cols="3">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-subheader>Ranklists</v-subheader>
              <v-list-item
                v-for="rank_list in problem.rank_lists"
                :key="rank_list.id"
                link
                :to="`/p/${problem.name}/ranklist/${rank_list.id}`"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ rank_list.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-subheader>Submit</v-subheader>
              <v-list-item link color="grey lighten-4">
                <v-list-item-content>
                  <v-list-item-title
                    v-if="!!username"
                    @click="submissionToggle = !submissionToggle"
                  >
                    {{ submissionToggle ? 'Exit' : 'Enter' }}
                  </v-list-item-title>
                  <v-list-item-title v-else>
                    Sign in to submit {{ username }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import PostCard from '@/components/problems/PostCard.vue';
import Upload from '@/components/problems/Upload.vue';
// import CodeEditor from '@/components/CodeEditor.vue';
import { getProblem, getPage } from '@/api/problem';
import { mapGetters } from 'vuex';
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
      page: {},
      submissionToggle: false,
    };
  },
  computed: {
    ...mapGetters({
      username: 'user/username',
    }),

    name() {
      return this.$route.params.name;
    },
  },

  beforeRouteEnter(to, from, next) {
    Promise.all([getProblem(to.params.name), getPage(to.params.name)]).then(
      res => {
        next(vm => vm.setData(res[0], res[1]));
      }
    );
  },

  beforeRouteUpdate(to, from, next) {
    this.problem = null;
    this.page = null;

    Promise.all([getProblem(to.params.name), getPage(to.params.name)]).then(
      res => {
        this.setData(res[0], res[1]);
        next();
      }
    );
  },
  methods: {
    setData(problem, page) {
      this.problem = problem;
      this.page = page;
    },
  },
};
</script>

<template>
  <v-main class="pa-0">
    <v-container fluid class="my-4">
      <v-row wrap align="center" justify="center" row fill-height class="">
        <v-col xs="12" md="10">
          <ProblemList />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import ProblemList from '@/components/problems/ProblemList.vue';
export default {
  metaInfo: () => ({
    title: 'Problems | IOJ',
  }),
  components: {
    ProblemList,
  },
};
</script>

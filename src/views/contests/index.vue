<template>
  <v-main class="pa-0">
    <v-container fluid class="my-4">
      <v-row wrap align="center" justify="center" row fill-height class="">
        <v-col xs="12" md="10">
          <ContestList />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import ContestList from '@/components/contests/ContestList.vue';
export default {
  components: {
    ContestList,
  },
};
</script>

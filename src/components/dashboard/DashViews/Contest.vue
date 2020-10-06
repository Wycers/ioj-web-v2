<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)
      v-flex(md12)
        v-btn(color="success") New contest
        v-data-table(
          :headers="headers"
          :items="contests"
          class="elevation-1")
          template(v-slot:item.action="{ item }")
            v-btn(:to="`/dashboard/contest/${item.id}`" color="primary") Modify
            v-btn(color="error") Delete
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Problem ID',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Action', value: 'action' },
      ],
      contests: [
        {
          id: 1,
        },
      ],
    };
  },
};
</script>

<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)
      v-flex(md12)
        v-data-table(
          :headers="headers"
          :items="desserts"
          class="elevation-1")
          template(v-slot:item.action="{ item }")
            v-btn(color="primary") Modify
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
      desserts: [
        {
          id: 1,
        },
      ],
    };
  },
};
</script>

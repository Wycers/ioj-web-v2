<template lang="pug">
v-row(dense="")
  v-col(cols="12")
    v-card(color="#385F73", dark="")
      v-card-title.headline Unlimited music now
      v-card-subtitle
        | Listen to your favorite artists and albums whenever and wherever, online and offline.
      v-card-actions
        v-btn(text="") Listen Now
  v-col(v-for="(item, i) in items", :key="i", cols="12")
    v-card(:color="item.color", dark="")
      .d-flex.flex-no-wrap.justify-space-between
        div
          v-card-title.headline(v-text="item.title")
          v-card-subtitle(v-text="item.artist")
        v-avatar.ma-3(size="125", tile="")
          v-img(:src="item.src")
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  }),
};
</script>

<template lang="pug">
v-content.fill-height.bkg
  v-container.fill-height(
    fluid
  )
    v-layout(
      align-center
      justify-center
    )
      v-flex(
        xs12
        sm8
        md4
      )
        router-view
</template>
<style lang="stylus" scoped>
.bkg
  background-image: url('~@/assets/bg_account.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100%;
  width: 100%;
.fill-height
  height: 100%
</style>

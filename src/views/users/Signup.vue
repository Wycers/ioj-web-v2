<template lang="pug">
v-hover(v-slot:default="{ hover }")
  v-card(
    :class="`elevation-${hover ? 12 : 6}`"
    style="background:white"
  )
    v-toolbar(
      color="primary"
      dark
    )
      v-toolbar-title {{ $t('page.signup') }}
      v-spacer
      v-btn(text to="/u/signin") {{ $t('page.signin') }}
      v-btn(icon to="/")
        v-icon fa-home
      v-menu(open-on-hover offset-y)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on" icon)
            v-icon fa-language
        v-list
          v-list-item(v-for="locale in locales" :key="locale.value" @click="setlocale(locale.value)")
            v-list-item-title {{ locale.text }}
    v-card-text.pt-4
      v-form(
        ref="form"
        v-model="valid"
        lazy-validation
      )
        v-icon
        v-text-field(
          v-model="username"
          autocomplete="off"
          prepend-icon="fa-user"
          required
          filled
          :label="$t('field.username')"
          :rules="usernameRules"
          @focus="onFocus"
        )
        v-text-field(
          v-model="password"
          autocomplete="new-password"
          prepend-icon="fa-lock"
          type="password"
          required
          filled
          :label="$t('field.password')"
          :rules="passwordRules"
        )
        v-text-field(
          v-model="rpassword"
          autocomplete="new-password"
          prepend-icon="fa-lock"
          type="password"
          required
          filled
          :label="$t('field.password')"
          :rules="rpasswordRules"
        )
        v-text-field(
          v-model="email"
          prepend-icon="mdi-email"
          required
          filled
          :label="$t('field.email')"
          :rules="emailRules"
        )
    v-expand-transition
      v-alert(v-show="toggle" :color="color" :icon="icon")
        div {{ message }}
    v-card-actions
      v-spacer
      v-btn(
        color="primary"
        :disabled="!valid"
        @click="onSubmit"
      ) submit
      v-spacer
</template>

<script>
import Vue from 'vue';
import { signup } from '@/api/user';
export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      rpassword: '',
      email: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && /^[\da-z]+$/i.test(v)) || 'Invalid character!',
        v => (v && v.length >= 6) || '6 characters at least',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || '6 characters at least',
      ],
      rpasswordRules: [
        v => !!v || 'Email is required',
        v => v === this.password || 'Not the same',
      ],
      //
      emailRules: [
        v => !!v || 'Password is required',
        v =>
          (v &&
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            )) ||
          'Invalid character!',
      ],
      color: 'info',
      icon: 'info',
      toggle: false,
      message: null,
      locales: ['en', 'zh-cmn-Hans', 'zh-cmn-Hant'].map(item => ({
        text: this.$t('locale', item),
        value: item,
      })),
    };
  },
  methods: {
    onFocus() {
      Vue.nextTick(() => {
        this.toggle = false;
      });
    },
    toggleOn() {
      Vue.nextTick(() => {
        this.toggle = true;
      });
    },
    setlocale(locale) {
      this.$i18n.locale = locale;
    },
    error(msg) {
      this.color = 'error';
      this.icon = 'mdi-alert';
      this.message = msg;
      this.toggleOn();
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const username = this.username;
        const password = this.password;
        const email = this.email;
        console.log(email);
        try {
          const res = await signup(username, password, email);
          console.log(res);
        } catch (err) {
          console.log(err);
          this.error('error');
          return;
        }
        try {
          await this.$store.dispatch('Signup', {
            username,
            password,
          });
          this.color = 'success';
          this.icon = 'check_circle';
          this.message = 'success';
          this.toggleOn();
          setTimeout(() => {
            this.$router.replace('/');
          }, 1000);
        } catch (err) {
          console.log(err);
          this.error('error');
          return;
        }
      }
    },
  },
};
</script>

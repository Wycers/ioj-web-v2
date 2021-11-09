<template lang="pug">
v-hover(v-slot:default='{ hover }')
  v-card(:class='`elevation-${hover ? 12 : 6}`', style='background: white')
    v-toolbar(color='primary', dark)
      v-toolbar-title {{ $t("page.reset") }}
      v-spacer
      v-btn(icon, to='/')
        v-icon mdi-home
      v-menu(open-on-hover, offset-y)
        template(v-slot:activator='{ on }')
          v-btn(v-on='on', icon)
            v-icon mdi-translate
        v-list
          v-list-item(
            v-for='locale in locales',
            :key='locale.value',
            @click='setlocale(locale.value)'
          )
            v-list-item-title {{ locale.text }}
    v-card-text.pt-4
      v-form(ref='form', v-model='valid', lazy-validation)
        v-icon
        v-text-field(
          v-model='username',
          disabled,
          autocomplete='off',
          prepend-icon='mdi-account',
          required,
          filled,
          :label='$t("field.username")',
          :rules='usernameRules',
          @focus='onFocus'
        )
        v-text-field(
          v-model='oldPassword',
          prepend-icon='mdi-lock',
          type='password',
          required,
          filled,
          :label='$t("field.old-password")',
          :rules='passwordRules'
        )
        v-text-field(
          v-model='password',
          autocomplete='new-password',
          prepend-icon='mdi-lock',
          type='password',
          required,
          filled,
          :label='$t("field.new-password")',
          :rules='passwordRules'
        )
        v-text-field(
          v-model='rpassword',
          autocomplete='new-password',
          prepend-icon='mdi-lock',
          type='password',
          required,
          filled,
          :label='$t("field.new-repassword")',
          :rules='rpasswordRules'
        )
    v-expand-transition
      v-alert(v-show='toggle', :color='color', :icon='icon')
        div {{ message }}
    v-card-actions
      v-spacer
      v-btn(color='primary', :disabled='!valid', @click='onSubmit') Reset
      v-spacer
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { updateCredential } from '@/api/user';
export default {
  computed: {
    ...mapGetters({
      links: 'links',
      username: 'user/username',
    }),
  },
  data() {
    return {
      valid: false,
      oldPassword: '',
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
        const oldPassword = this.oldPassword;
        const password = this.password;
        const email = this.email;
        console.log(email);
        try {
          await updateCredential(username, oldPassword, password);
          this.color = 'success';
          this.icon = 'mdi-check';
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

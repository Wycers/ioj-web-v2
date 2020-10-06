<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)
      v-flex(md12)
        v-dialog(v-model="createDialog" height="1000" width="1000")
          template(v-slot:activator="{ on }")
            v-btn(color="success" v-on="on") New user
          v-card
            v-card-title(class="headline grey lighten-2" primary-title) New User
            v-card-text
              v-container
                v-text-field(v-model="username" label="Username")
                v-text-field(v-model="password" label="Password")
                v-btn(color="primary" v-on:click="clickCreate()") CREATE
        v-dialog(v-model="updateDialog" height="1000" width="1000")
          v-card
            v-card-title(class="headline grey lighten-2" primary-title) Update User
            v-card-text
              v-container
                v-text-field(v-model="updateTitle" label="Problem Title")
        v-data-table(
          :headers="headers"
          :items="users"
          class="elevation-1")
          template(v-slot:item.action="{ item }")

            v-btn(color="error" v-on:click="clickDelete(item.id)") Delete
        v-dialog(v-model="createPriviligeDialog" height="1000" width="1000")
          template(v-slot:activator="{ on }")
            v-btn(color="success" v-on="on") New Privilige User
          v-card
            v-card-title(class="headline grey lighten-2" primary-title) New Privilige User
            v-card-text
              v-container
                v-text-field(v-model="priviligeUsername" label="Username")
                v-radio-group(v-model="radioGroup" row)
                  v-radio(v-for="item in type" :key="item" :label="item" :value="item")
                v-btn(color="primary" v-on:click="clickPriviligeCreate()") CREATE
        v-dialog(v-model="updatePrivilgeDialog" height="1000" width="1000")
          v-card
            v-card-title(class="headline grey lighten-2" primary-title) Update Privilige
            v-card-text
              v-container
                v-radio-group(v-model="radioGroupPrivilege" row)
                  v-radio(v-for="item in type" :key="item" :label="item" :value="item")
        v-data-table(
          :headers="headers2"
          :items="priviligeUsers"
          class="elevation-1")
          template(v-slot:item.action="{ item }")
            v-btn(color="primary" v-on:click="clickUpdatePrivilige(item)") Update
            v-btn(color="error" v-on:click="clickRemove(item.id)") Remove
</template>

<script>
import {
  setUserPrivilige,
  getUserID,
  getUsers,
  createUser,
  getPriviligeUsers,
} from '@/api/user';
export default {
  data() {
    return {
      priviligeUsers: [],
      radioGroup: 'admin',
      radioGroupPrivilege: 'admin',
      updateDialog: false,
      username: '',
      password: '',
      type: ['admin', 'editor'],
      headers: [
        {
          text: 'User ID',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Username',
          sortable: false,
          value: 'username',
        },

        { text: 'Action', sortable: false, value: 'action' },
      ],
      headers2: [
        {
          text: 'User ID',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Username',
          sortable: false,
          value: 'username',
        },
        { text: 'Role', sortable: false, value: 'role' },
        { text: 'Action', sortable: false, value: 'action' },
      ],
      users: [],
      updatePrivilgeDialog: false,
      updateTitle: '',
      createDialog: false,
      createPriviligeDialog: false,
      priviligeUsername: '',
    };
  },

  mounted() {
    this.fetchUsers();
    this.fetchPriviligeUsers();
  },
  methods: {
    async fetchUsers() {
      const res = await getUsers();
      this.users = res;
    },
    async fetchPriviligeUsers() {
      for (const access of this.type) {
        const res = await getPriviligeUsers(access);

        for (const user of res) {
          user.role = access;
          this.priviligeUsers.push(user);
        }
      }
    },

    clickCreate() {
      createUser(this.username, this.password)
        .then(res => {
          alert('Create user successfully');
          this.$router.go(0);
        })
        .catch(res => {
          alert('Create user failed');
        });
    },
    clickUpdate(item) {
      this.updateDialog = true;
    },
    clickUpdatePrivilige(item) {
      this.updatePrivilgeDialog = true;
    },
    clickDelete(id) {
      console.log('click delete');
    },
    clickRemove(id) {
      setUserPrivilige(id, '').then(res => {
        alert('Remove access successfully');
        this.$router.go(0);
      });
    },
    async clickPriviligeCreate() {
      const res = await getUserID(this.priviligeUsername);

      setUserPrivilige(res[0].id, this.radioGroup).then(res => {
        alert('Set access successfully');
        this.$router.go(0);
      });
    },
  },
};
</script>

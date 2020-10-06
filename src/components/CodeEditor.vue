<template>
  <v-card width="90%" max-width="1024" class="mx-auto my-5">
    <v-toolbar>
      <v-overflow-btn
        v-model="language"
        :items="dropdownLanguages"
        label="Select language"
        hide-details
        class="pa-0"
      />
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-spacer />
        <v-btn text color="info" @click="submit">Info</v-btn>
        <v-btn text color="success" @click.stop="dialog = true">Submit</v-btn>
      </template>
    </v-toolbar>
    <codemirror v-model="code" :options="cmOptions" />
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm to submit?</v-card-title>

        <v-card-text />

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="submit">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
// require component
import { codemirror } from 'vue-codemirror';
import { createSubmission } from '@/api/submission';

// require styles
import 'codemirror/lib/codemirror.css';

// theme css
import 'codemirror/theme/monokai.css';

export default {
  components: {
    codemirror,
  },
  props: {
    code: {
      type: String,
      default: '',
      required: false,
    },
    pid: {
      type: String,
      default: '',
      required: true,
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      language: 'Java',
      theme: 'monokai',
      covert: {
        c: 'gcc',
        cpp: 'g++',
        java: 'java',
        python: 'python',
        sql: 'sql',
      },
      dialog: false,
    };
  },
  computed: {
    dropdownLanguages: function() {
      if (this.type === 'algorithm') {
        return [
          { text: 'Java' },
          { text: 'C' },
          { text: 'CPP' },
          { text: 'Python' },
        ];
      }
      return [{ text: 'SQL' }];
    },
    cmOptions() {
      // codemirror options
      const styles = {
        C: import('codemirror/mode/clike/clike.js'),
        CPP: import('codemirror/mode/clike/clike.js'),
        Java: import('codemirror/mode/clike/clike.js'),
        Python: import('codemirror/mode/python/python.js'),
        SQL: import('codemirror/mode/sql/sql.js'),
        //    Golang: import('codemirror/mode/go/go.js')
      };
      // styles[this.language].then();

      const mode = {
        C: 'text/x-csrc',
        CPP: 'text/x-c++src',
        Java: 'text/x-java',
        Python: 'text/x-python',
        SQL: 'text/x-sql',
        //  Golang: 'text/x-go'
      };

      return {
        tabSize: 4,
        mode: mode[this.language],
        theme: this.theme,
        lineNumbers: true,
        line: true,
      };
    },
  },
  watch: {
    type() {
      if (this.type === 'algorithm') {
        this.language = 'Java';
      } else {
        this.language = 'SQL';
      }
    },
  },
  methods: {
    submit() {
      console.log(this.language);
      console.log(this.covert[this.language.toLowerCase()]);
      createSubmission(
        this.pid,
        this.code,
        this.covert[this.language.toLowerCase()]
      )
        .then(res => this.$router.push('/s/' + res))
        .catch(res => {
          alert('Submission failed');
          console.log(res);
        });
      this.dialog = false;
    },
  },
};
</script>
<style>
@import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.207/distr/fira_code.css);
.CodeMirror {
  font-family: 'Fira Code';
}
</style>

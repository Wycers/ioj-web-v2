<template lang="pug">
v-card
  v-card-title(class="headline grey lighten-2" primary-title) New Problem
  v-card-text
    v-container
      //- h4 Problem Type
      //- v-radio-group(v-model="radioGroup"  row)
      //-   v-radio(v-for="item in type" :key="item" :label="item" :value="item")
      //- v-row
        //- v-col
        //-   v-checkbox(v-model="checkbox" :label="`Special Judge`")
      //-   v-col
      //-     v-text-field(v-model="memory" label="Memory")
      //-   v-col
      //-     v-text-field(v-model="time" label="Time")
      v-text-field(v-model="title" label="Problem Title")
      codemirror(v-model="code" :options="cmOptions")
      mavon-editor.ma-5(ref="createEditor" style="height: 600px")
      v-btn(color="primary" @click="clickCreate()") CREATE
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'mavon-editor/dist/css/index.css';
export default {
  components: {
    mavonEditor,
    codemirror,
  },
  data() {
    return {
      memory: '',
      title: '',
      time: '',
      type: ['algorithm', 'database'],
      radioGroup: 'algorithm',
      description: '',
      checkbox: false,
      code: `var a = 10;`,
      cmOptions: {
        tabSize: 4,
        mode: 'application/json',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      },
    };
  },
};
</script>

<style>
@import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.207/distr/fira_code.css);
.CodeMirror {
  font-family: 'Fira Code';
}
</style>

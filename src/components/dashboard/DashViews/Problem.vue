<template lang="pug">
  v-container(fill-height fluid grid-list-xl)
    v-layout(justify-center wrap)

      v-flex(md12)
        v-dialog(v-model="createDialog" height="1000" width="1000")
          template(v-slot:activator="{ on }")
            v-btn(color="success" v-on="on") New problem
          create-card

        v-dialog(v-model="updateDialog" height="1000" width="1000")
          v-card
            v-card-title(class="headline grey lighten-2" primary-title) Update Problem
            v-card-text
              v-container
                //- v-text-field(v-model="updateTitle" label="Problem Title")
                //- v-row
                //-   v-col
                //-     v-text-field(v-model="memory" label="Memory")
                //-   v-col
                //-     v-text-field(v-model="time" label="Time")
                //- mavon-editor.ma-5(v-model="updateMarkdown" ref="updateEditor" style="height: 600px")
                //- v-btn(color="primary" v-on:click="clickUpdateInDialog()") Update

        v-dialog(v-model="dataDialog" height="1000" width="1000")
          v-card
            v-card-title(class="headline grey lighten-2" primary-title) Data
            v-card-text
              v-container
              h4 Upload Files
              v-file-input(chips multiple v-model="files" label="Choose Files")
              v-btn(color="primary" v-on:click="clickUpload()") Upload
              p {{ this.dataFiles}}
              h4 File list
              v-data-table(:headers="fileHeaders" :items="dataFiles" :items-per-page="5" class="elevation-1")
                template(v-slot:item.action="{ item }")
                  v-btn(color="error" v-on:click="clickDeleteFile(item)") Delete
        v-data-table(
          :headers="headers"
          :items="desserts"
          class="elevation-1")
          template(v-slot:item.action="{ item }")
            v-btn(color="warning" v-on:click="clickData(item)") Data
            v-btn(color="primary" v-on:click="clickUpdate(item)") Update
            v-btn(color="error" v-on:click="clickDelete(item.id)") Delete
          template(v-slot:item.special="{ item }")
            v-card-text {{ item.special }}
</template>

<script>
import { getProblems, deleteProblem, createProblem } from '@/api/problem';
import { uploadFile, getFiles, updateProblem, deleteFile } from '@/api/problem';

// require styles

import CreateCard from '@/components/dashboard/DashViews/problem/createCard';

export default {
  components: {
    'create-card': CreateCard,
  },
  data() {
    return {
      files: [],
      updateTitle: '',
      updateDescription: '',
      createDialog: false,
      updateDialog: false,
      dataDialog: false,
      dataFiles: [{ filename: '2.in' }],
      fileHeaders: [
        {
          text: 'File name',
          align: 'left',
          sortable: false,
          value: 'filename',
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
        },
      ],
      headers: [
        {
          text: 'Problem ID',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Problem Name',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Problem Type',
          sortable: false,
          value: 'type',
        },
        {
          text: 'Process',
          sortable: false,
          value: 'special',
        },
        { text: 'Action', value: 'action', sortable: false },
      ],
      desserts: [],
      updateMarkdown: '',
      updateItem: {},
    };
  },
  mounted() {
    getProblems(1, 10).then(res => (this.desserts = res));
  },
  methods: {
    clickCreate() {
      const markdown = this.$refs.createEditor.d_value;
      const html = this.$refs.createEditor.d_render;
      const re = new RegExp('^[1-9][0-9]*$');
      if (this.title.length === 0) {
        alert('Problem Title cannot be null.');
        return;
      }

      if (this.memory.length === 0) {
        alert('Memory cannot be null.');
        return;
      }

      if (re.test(this.memory) === false) {
        alert('Memory invalied');
      }

      if (this.time.length === 0) {
        alert('Memory cannot be null.');
        return;
      }

      if (re.test(this.time) === false) {
        alert('Time invalied');
      }

      createProblem(
        this.title,
        markdown,
        html,
        this.radioGroup,
        this.checkbox,
        this.time,
        this.memory
      )
        .then(res => {
          alert('Create successfully');
          this.$router.go(0);
        })
        .catch(res => {
          alert('Create fail');
        });
    },
    clickDelete(id) {
      deleteProblem(id)
        .then(res => {
          alert('Delete successfully');
          this.$router.go(0);
        })
        .catch(res => {
          alert('Delete failed');
        });
    },
    clickUpdate(item) {
      this.updateDialog = true;
      this.updateTitle = item.title;
      this.memory = item.memoryLimit;
      this.time = item.timeLimit;
      this.updateItem = item;
      this.updateMarkdown = item.description;
    },
    clickUpdateInDialog() {
      const markdown = this.$refs.updateEditor.d_value;
      const html = this.$refs.updateEditor.d_render;

      updateProblem(
        this.updateItem.id,
        this.updateTitle,
        markdown,
        html,
        this.updateItem.type,
        this.updateItem.special,
        this.time,
        this.memory
      )
        .then(res => {
          alert('Update successfully');
        })
        .catch(res => {
          alert('Update failed');
        });
      /*
      updateProblem(updateItem.id, this.updateTitle, this.updateDescription,
             markdown, html, updateItem.type, updateItem.special)
        .then(res => {
        alert("Update successfully")
        this.$router.go(0)
      }).catch(res =>{
        alert("Update  failed")

      })*/
    },
    clickData(item) {
      this.dataDialog = true;
      this.dataItem = item;
      this.dataFiles = [];
      getFiles(item.id).then(res => {
        if (typeof res === 'string') {
          const str = res.replace('[', '').replace(']', '');
          const files = str.split(',');

          for (const file of files) {
            this.dataFiles.push({ filename: file });
          }
        }
      });
    },
    clickDeleteFile(item) {
      deleteFile(this.dataItem.id, item.filename)
        .then(res => {
          alert('Delete file successfully');
        })
        .catch(res => {
          alert('Delte failed');
        });
    },
    async clickUpload() {
      console.log(this.files);
      for (const file of this.files) {
        const reader = new FileReader();

        reader.onload = blob => {
          uploadFile(this.dataItem.id, file.name, reader.result)
            .then(res => {
              alert('Upload successfully');
            })
            .catch(res => {
              alert('Upload failed');
            });
        };
        await reader.readAsBinaryString(file);
      }
    },
  },
};
</script>

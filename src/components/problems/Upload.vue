<template>
  <v-card
    min-height="80vh"
    rounded="lg"
    max-width="1024"
    :class="cardClass"
    tag="article"
  >
    <v-card-title class="justify-center"> Upload & Submit</v-card-title>

    <v-card-text class="content custom">
      <div v-if="currentFile">
        <div>
          <v-progress-linear
            v-model="progress"
            color="light-blue"
            height="25"
            reactive
          >
            <strong>{{ progress }} %</strong>
          </v-progress-linear>
        </div>
      </div>

      <v-row no-gutters justify="center" align="center">
        <v-col cols="8">
          <v-file-input
            show-size
            label="File input"
            @change="selectFile"
          ></v-file-input>
        </v-col>

        <v-col cols="4" class="pl-2">
          <v-btn color="success" dark small @click="upload">
            Upload
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-alert v-if="message" border="left" color="blue-grey" dark>
        {{ message }}
      </v-alert>

      <v-list v-if="fileInfos.length > 0">
        <v-subheader>List of Files</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(file, index) in fileInfos" :key="index">
            <a :href="file.url">{{ file.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <div class="large-12 medium-12 small-12 cell">
        <label
          >Files
          <input
            type="file"
            id="files"
            ref="files"
            multiple
            v-on:change="handleFilesUpload()"
          />
        </label>
      </div>

      <div class="large-12 medium-12 small-12 cell">
        <div v-for="(file, key) in files" :key="key" class="file-listing">
          {{ file.name }}
          <span class="remove-file" v-on:click="removeFile(key)">Remove</span>
        </div>
      </div>
      <br />
      <div class="large-12 medium-12 small-12 cell">
        <button v-on:click="addFiles()">Add Files</button>
      </div>
      <br />
      <div class="large-12 medium-12 small-12 cell">
        <button v-on:click="submitFiles()">Submit</button>
      </div>
    </v-card-text>
    <ConfirmDialog ref="confirm" />
  </v-card>
</template>

<style>
input[type='file'] {
  display: none;
}

div.file-listing {
  width: 200px;
}

span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>

<script>
import { createVolume, getVolume, createFile } from '@/api/volume';
import { createSubmission } from '@/api/submission';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },

  components: {
    ConfirmDialog: import('@/components/common/ConfirmDialog.vue'),
  },

  /*
      Defines the data used by the component
    */
  data() {
    return {
      files: [],
      shadowZ: '14',
      layout: 'post',
      currentVolumeName: '',
      currentFile: undefined,
      progress: 0,
      message: '',

      fileInfos: [],
    };
  },

  computed: {
    cardClass() {
      return [
        this.shadowZ ? `elevation-${this.shadowZ}` : '',
        `${this.layout}-card`,
      ];
    },
  },

  watch: {
    async currentVolumeName() {
      const res = [];
      try {
        const resp = await getVolume(this.currentVolumeName);
        console.log(resp);
      } catch (err) {
        console.log(err);
      }
      return res;
    },
  },

  /*
      Defines the method used by the component
    */
  methods: {
    /*
        Adds a file
      */
    addFiles() {
      this.$refs.files.click();
    },

    /*
        Submits files to the server
      */
    async submit() {
      try {
        if (this.currentVolumeName === '') {
          console.log('empty volume name');
        }

        const submitRes = await createSubmission(
          this.name,
          this.currentVolumeName
        );
        const submissionId = submitRes.submission.submissionId;
        this.$router.push(`/s/${submissionId}`);
      } catch (err) {
        console.log(err);
      }
    },

    /*
        Handles the uploading of files
      */
    handleFilesUpload() {
      const uploadedFiles = this.$refs.files.files;

      /*
          Adds the uploaded file to the files array
        */
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      this.files.splice(key, 1);
    },

    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },

    async upload() {
      if (!this.currentFile) {
        this.message = 'Please select a file!';
        return;
      }

      this.message = '';

      try {
        if (this.currentVolumeName === '') {
          const volumeData = await createVolume();
          const volumeName = volumeData?.name || '';

          if (volumeName === '') {
            return;
          }
          this.currentVolumeName = volumeName;
        }

        const formData = new FormData();
        formData.append('file', this.currentFile, this.currentFile.filename);
        const volumeFileData = await createFile(
          this.currentVolumeName,
          formData,
          event => {
            this.progress = Math.round((100 * event.loaded) / event.total);
          }
        );
        const volumeName = volumeFileData?.name || '';
        if (volumeName === '') {
          return;
        }
        this.currentVolumeName = volumeName;

        this.fileInfos.push({
          name: this.currentFile.filename,
        });
      } catch (err) {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      }

      // UploadService.upload(this.currentFile, event => {
      //   this.progress = Math.round((100 * event.loaded) / event.total);
      // })
      //   .then(response => {
      //     this.message = response.data.message;
      //     return UploadService.getFiles();
      //   })
      //   .then(files => {
      //     this.fileInfos = files.data;
      //   })
      //   .catch(() => {
      //     this.progress = 0;
      //     this.message = 'Could not upload the file!';
      //     this.currentFile = undefined;
      //   });
    },

    async delRecord() {
      if (
        await this.$refs.confirm.open(
          'Confirm',
          'Are you sure you want to delete this record?'
        )
      ) {
        this.deleteRecord();
      }
    },

    deleteRecord() {
      console.log('Record deleted.');
    },
  },
};
</script>

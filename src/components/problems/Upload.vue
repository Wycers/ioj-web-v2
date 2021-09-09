<template>
  <v-card
    width="90%"
    max-width="1024"
    class="mx-auto my-5"
    :class="cardClass"
    tag="article"
    rounded="lg"
  >
    <v-card-title class="justify-center"> Upload </v-card-title>

    <v-card-text class="content custom">
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
import { get } from 'js-cookie';

export default {
  props: {},

  /*
      Defines the data used by the component
    */
  data() {
    return {
      files: [],
      shadowZ: '14',
      layout: 'post',
      currentVolumeName: '',
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
    async submitFiles() {
      if (this.files.length === 0) {
        return;
      }

      try {
        if (this.currentVolumeName === '') {
          const volumeData = await createVolume();
          const volumeName = volumeData?.name || '';

          if (volumeName === '') {
            return;
          }
          this.currentVolumeName = volumeName;
        }
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];
          const formData = new FormData();
          formData.append('file', file, file.filename);
          const volumeFileData = await createFile(
            this.currentVolumeName,
            formData
          );
          const volumeName = volumeFileData?.name || '';
          if (volumeName === '') {
            return;
          }
          this.currentVolumeName = volumeName;
        }
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
  },
};
</script>

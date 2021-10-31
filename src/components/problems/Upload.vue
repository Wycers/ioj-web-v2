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

      <volume-card :name="currentVolumeName"></volume-card>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        color="primary"
        :disabled="currentVolumeName === ''"
        @click="submitConfirm"
      >
        Submit
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

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
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import { createVolume, createFile } from '@/api/volume';
import { createSubmission } from '@/api/submission';
import VolumeCard from '../volumes/VolumeCard.vue';

export default {
  components: {
    ConfirmDialog,
    VolumeCard,
  },

  props: {
    name: {
      type: String,
      default: '',
    },
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

        formData.append('file', this.currentFile, this.currentFile.name);
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
          name: this.currentFile.name,
          url: '?',
        });
      } catch (err) {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      }
    },

    async submitConfirm() {
      if (await this.$refs.confirm.open('Confirm', 'Are you sure to submit?')) {
        this.submit();
      }
    },

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
  },
};
</script>

<template>
  <v-list>
    <v-subheader>List of Files</v-subheader>
    <v-list-item-group color="primary" v-if="fileInfos.length > 0">
      <v-list-item
        v-for="(file, index) in fileInfos"
        :key="index"
        @click="download(file, index)"
      >
        <v-list-item-title>{{ file.name }}</v-list-item-title>
        <v-progress-circular
          v-if="file.progress !== -1"
          :value="file.progress"
          color="primary lighten-2"
        ></v-progress-circular>
      </v-list-item>
    </v-list-item-group>
    <v-list-item v-else>
      Empty
    </v-list-item>
  </v-list>
</template>
<script>
import { getVolume, getVolumeFile } from '@/api/volume';
export default {
  name: 'VolumeCard',

  props: {
    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      volume: {},
      progressMap: {},
      fileInfos: [],
    };
  },

  watch: {
    async name() {
      console.log('name changed', this.name);
      try {
        const resp = await getVolume(this.name);
        this.volume = resp;
        this.fileInfos =
          this.volume?.file_records?.map(record => ({
            name: record.file_path,
            progress: -1,
          })) || [];
      } catch (err) {
        console.log(err);
      }
    },
  },

  methods: {
    download(file, index) {
      // alert(file);
      this.fileInfos[index].progress = 0;
      getVolumeFile(this.name, file.name, event => {
        this.fileInfos[index].progress = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then(response => {
          const fileURL = window.URL.createObjectURL(new Blob([response]));
          const fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', file.name);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(console.error);

      // window.location.href = `/api/v1/volume/${this.name}/file?filename=${file.name}`;
    },
  },
};
</script>

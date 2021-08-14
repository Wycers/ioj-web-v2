<template>
  <v-card
    width="90%"
    max-width="1024"
    class="mx-auto my-5"
    :class="cardClass"
    tag="article"
  >
    <v-card-title class="justify-center"> {{ title }} </v-card-title>
    <!-- <v-card-title class="justify-center center">
      Memory : {{ memory }} Bytes Time : {{ time }} ms
    </v-card-title> -->

    <!-- <div class="description">
      <v-btn
        color="primary"
        @click="clickRank()"
      > Ranklist </v-btn>
      <v-btn
        color="success"
        @click="clickDisscussion()"
      > Discussion </v-btn>
    </div> -->

    <v-card-text class="content custom">
      <!-- <div v-html="html" /> -->
      <!-- description -->
      <vue-markdown :source="description"></vue-markdown>
      <!-- inputFormat -->
      <vue-markdown :source="inputFormat"></vue-markdown>
      <!-- outputFormat -->
      <vue-markdown :source="outputFormat"></vue-markdown>
      <!-- example -->
      <vue-markdown :source="example"></vue-markdown>
      <!-- hintAndLimit -->
      <vue-markdown :source="hintAndLimit"></vue-markdown>
    </v-card-text>
  </v-card>
</template>
<script>
// import Tag from "./Tag";
// import PostTime from "./PostTime";

const test = `

`;

import { getPage } from '@/api/problem';
export default {
  // components: {
  //   Tag,
  //   PostTime
  // },
  props: {
    name: {
      type: String,
      required: true,
      default: 'hello-world',
    },
    shadowZ: Number,
    layout: {
      type: String,
      required: true,
      default: 'layout',
    },
  },
  data: function() {
    return {
      title: '',
      description: '',
      inputFormat: '',
      outputFormat: '',
      example: test,
      hintAndLimit: '',
    };
  },
  mounted() {
    this.getPage();
  },
  computed: {
    cardClass() {
      return [
        this.shadowZ ? `elevation-${this.shadowZ}` : '',
        `${this.layout}-card`,
      ];
    },
  },
  methods: {
    async getPage() {
      try {
        const res = await getPage(this.name);
        this.title = res.title;
        this.description = res.description;
        this.inputFormat = res.input_format;
        this.outputFormat = res.output_format;
        this.example = res.example;
        this.hintAndLimit = res.hint_and_limit;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    clickRank() {
      this.$router.push({
        name: 'problemRank',
      });
    },
    clickDisscussion() {
      this.$router.push({
        name: 'problemDiscussion',
      });
    },
  },
};
</script>
<style lang="stylus">
// @import url('~@/assets/katex.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css');

.post-card {
  // padding: 0 16px 16px;
}

.list-card {
  .card__title {
    padding-bottom: 0;
  }
}

.post-title-link {
  position: relative;
  display: inline-block;
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: $primary-color;
    visibility: hidden;
    transform: scaleX(0);
    transition: 0.3s ease-in-out;
  }

  &:hover, &:active {
    &:after {
      visibility: visible;
      transform: scaleX(1);
    }
  }
}

$body-font-family = -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
$font-size-root = 14px;
$line-height-root = 1.5;
$card-border-radius = 4px;
$font-roboto = './fonts/roboto';
$font-code = Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
$container-max-width = 1000px;
$body-background = #f6f6f6;
$primary-color = #3F51B5;
$light-primary-color = lighten($primary-color, 50%);
$content-color = #4d4d4d;
$gray-color = #7e7e7e;
$custom-blocks = {
  tip: #4caf50,
  warning: #FF9800,
  danger: #ff5722
};
$code-languages = {
  js: 'js' 'javascript',
  html: 'html' 'markup',
  md: 'md' 'markdown',
  vue: 'vue',
  css: 'css',
  less: 'less',
  sass: 'sass',
  scss: 'scss',
  stylus: 'stylus',
  jsx: 'jsx',
  ts: 'ts' 'typescript',
  json: 'json',
  yaml: 'yaml',
  bash: 'bash',
  c: 'c',
  java: 'java',
  kotlin: 'kotlin',
  python: 'py' 'python',
  csharp: 'c#' 'csharp',
  go: 'go',
  sql: 'sql',
  cpp: 'cpp',
  dart: 'dart'
};
// colors
$accentColor = #3eaf7c;
$textColor = #2c3e50;
$borderColor = #eaecef;
$codeBgColor = #282c34;
$arrowBgColor = #ccc;
// layout
$navbarHeight = 3.6rem;
$sidebarWidth = 20rem;
$contentWidth = 740px;
// responsive breakpoints
$MQNarrow = 959px;
$MQMobile = 719px;
$MQMobileNarrow = 419px;

code, kbd, pre, samp {
  font-family: $font-code;
}

.content.custom {
  display: block;
  min-height: 150px;
  font-size: 16px;
  line-height: 1.8;
  color: $content-color;

  p {
    word-wrap: break-word;
  }

  h1, h2, h3, h4, h5, h6, ol, ul, pre, table, figure {
    margin-bottom: 1.2em;
  }

  h1, h2, h3, h4, h5, h6 {
    padding-top: 3em;
    margin-top: -1.8em;
    text-transform: capitalize;

    .header-anchor {
      margin-left: -1em;
      padding-right: 4px;
      color: $light-primary-color;
      opacity: 0;
      text-decoration: none;
    }

    &:hover {
      .header-anchor {
        opacity: 1;
      }
    }
  }

  a {
    position: relative;
    font-weight: 500;
    text-decoration: none;
    color: #3eaf7c;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      background: rgba($primary-color, 0.2);
      transition: height 200ms ease-in;
    }

    &:hover:after {
      height: 100%;
    }
  }

  blockquote {
    margin: 2em 0 2em 1em;
    padding: 4px 24px;
    font-style: italic;
    color: $gray-color;
    border-left: 0.375em solid $primary-color;

    p {
      margin-top: 0;

      &:last-child {
        margin-bottom: 0;
      }
    }

    footer {
      font-size: 80%;
    }
  }

  strong {
    font-weight: 600;
    margin: 0 0.2em;
  }

  code, kbd {
    display: inline;
    margin: 0 0.3em;
    padding: 0.125em 0.25em;
    box-shadow: none;
  }

  pre, pre[class*='language-'] {
    margin-left: -1.75em;
    margin-right: -1.75em;
    padding: 1.25em 1.75em;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.6;
    background: #3e3e3e;
  }

  pre[class*='language-'] {
    position: relative;

    &:before {
      position: absolute;
      top: 0.8em;
      right: 1em;
      font-size: 0.86em;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  pre {
    code {
      margin: 0;
      padding: 0;
      background-color: transparent;
      font-size: 0.86em;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);

      &:before, &:after {
        content: '';
        letter-spacing: 0;
      }
    }
  }

  ol, ul {
    padding-left: 2em;
  }

  table {
    width: 100%;
    border: 1px solid #dedede;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
      tr {
        background: #f8f8f8;
      }
    }

    tbody {
      tr {
        &:hover {
          background: #efefef;
        }
      }
    }

    td, th {
      border: 1px solid #dedede;
      padding: 0.375em 0.75em;
    }
  }

  video, audio {
    max-width: 100%;
  }

  .highlighted-line {
    display: block;
    margin: 0 -1.5rem;
    padding: 0 1.5rem;
    background-color: rgba(0, 0, 0, 66%);
  }

  *:first-child {
    margin-top: 0;
  }
}

for type, exts in $code-languages {
  pre {
    &.language-{exts[0]}:before {
      content: type;
    }

    if (exts[1]) {
      &.language-{exts[1]}:before {
        content: type;
      }
    }
  }
}

.custom-block {
  margin-bottom: 1.2em;
  padding: 1em 1.5em 0.2em;
  border-left-width: 0.375em;
  border-left-style: solid;
  border-radius: 4px;

  &-title {
    font-weight: 600;
  }

  for type, color in $custom-blocks {
    &.{type} {
      color: darken(color, 20%);
      border-color: color !important;
      background: lighten(color, 90%) !important;
    }
  }
}

.title {
  text-align: center;
}

.description {
  margin: 10px;
  text-align: center;
}
</style>

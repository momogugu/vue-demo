<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <caption>{{path}}</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-right">
              <button class="btn btn-danger btn-xs" @click="goBack()" v-if="path !== '/'">返回</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in sortedFiles">
            <td>
              <div class="file" v-if="file.type === 'file'">
                <i class="octicon octicon-file-text"></i>
                <a href="#">{{file.name}}</a>
              </div>
              <div class="firectory" v-if="file.type === 'dir'">
                <i class="octicon octicon-file-directory"></i>
                <a href="#" @click="changePath(file.path)">{{file.path}}</a>
              </div>
            </td>
            <td class="text-right">
              <a :href="file.download_url" download="file" v-if="file.type === 'file'">
                <span class="octicon octicon-cloud-download"></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import axios from 'axios'
  import Vue from "vue"
  import {Component, Watch} from "vue-property-decorator"
  import { Files } from '../types/model.ts'
  @Component({
    props: {
     username: String,
     repo: String
    }
  })
  export default class FileExplorer extends Vue {
    // props have to be declared
    username: String
    repo: String

    // initial data
    path: string = '/'
    files: Files[] = []

    // computed
    get fullRepoUrl() {
      return this.username + '/' + this.repo
    }
    get sortedFiles() {
      return this.files.slice(0).sort(function(a, b) {
        if (a.type !== b.type) {
          if (a.type == 'dir') {
            return -1
          } else {
            return 1
          }
        } else {
          if (a.name < b.name) {
            return -1
          } else {
            return 1
          }
        }
      })
    }

    // lifecycle hook
    created() {
      if (this.username && this.repo) {
        this.getFiles()
      }
    }

    // watch
    @Watch('repo')
    onRepoChanged(newVal: string, oldVal: string) {
      this.path = '/'
      this.getFiles()
    }

    // method
    getFiles() {
      axios.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path)
        .then(response => {
          this.files = response.data
      })
    }
    changePath(path:string) {
      this.path = '/' + path
      this.getFiles()
    }
    goBack() {
      this.path = this.path.split('/').slice(0, -1).join('/')
      if (this.path === '') {
        this.path = '/'
      }
      this.getFiles()
    }
  }
</script>
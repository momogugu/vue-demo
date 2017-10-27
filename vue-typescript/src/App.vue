<template>
  <div id="app">
    <github></github>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {Component} from "vue-property-decorator"
import Github from "./components/Github.vue"
@Component({
  components: {
    Github
  }
})
export default class App extends Vue {}
</script>

<template>
    <div id="container" class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <form id="changeRepoForm" class="form-inline" @submit.prevent="changeRepo()">
                    <div class="form-group">
                        <label for="fullRepoName">Full Repo Name:</label>
                        <input type="text" placeholder="momogugu/guagame" id="fullRepoName" v-model="fullRepoName" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">获取</button>
                </form>
                <hr>
                <file-explorer :username="username" :repo="repo"></file-explorer>
            </div>
        </div>
    </div>
</template>

<script>
import FileExplorer from "./FileExplorer.vue";
export default {
  name: "Github",
  data: function() {
    return {
      fullRepoName: "",
      username: "",
      repo: ""
    };
  },
  methods: {
    changeRepo: function() {
      var splitData = this.fullRepoName.split("/");
      this.username = splitData[0];
      this.repo = splitData[1];

      console.group("Vue Data");
      console.log("fullRepoName:", this.fullRepoName);
      console.log("username:", this.username);
      console.log("repo:", this.repo);
      console.groupEnd("Vue Data");
    }
  },
  components: {
    FileExplorer
  }
};
</script>


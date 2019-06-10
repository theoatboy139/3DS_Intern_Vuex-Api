<template>
    <div>
      <div v-if="!$store.state.users.isLoading">
        <h3 id='left'>Posts by user{{this.$route.params.userId}}</h3>
        <div id="cards" class="card" v-for="(post,index) in getPost" :key="index">
            <h3 text="bold" class="card-header">{{post.title}}</h3>
            <div class="card-body">
                <p class="card-text">Post ID: {{post.id}}</p>
                <hr>
                <p class="card-text">{{post.body}}}</p>
            </div>
        </div>
    </div>
      <div class="text-center" v-else>
        <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <h1>Loading...</h1>
      </div>
    </div>
</template>

<script>
import { postPerPage } from '@/config/config'
export default {
  mounted () {
    const userId = this.$route.params.userId
    this.$store.dispatch('users/get', userId)
  },
  computed: {
    getPost () {
      return this.$store.state.users.items
    }
  },
  watch: {
    $route (to, from) {
      this.$store.dispatch('users/get', to.params.userId)
    }
  }
}
</script>

<style>
div {
    margin: 0px
}
#divid{
    margin: 0px;
}
#cards {
  text-align: left;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 80%
}
#left {
    text-align: left;
    margin-left: 50px;
    margin-top: 15px;
}
</style>

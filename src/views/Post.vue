<template>
    <div>
      <div v-if="!$store.state.posts.isLoading">
        <h3 class='left'>Post</h3>
        <div id="cards" class="card" v-for="(post, id) in getPost" :key="'post' + id">
            <h4 text="bold" class="card-header">{{post.title}}</h4>
            <div class="card-body">
                <p class="card-text">started by <a href="#" @click.prevent="detailsOfUser(post.userId)">user{{post.userId}}</a></p>
                <hr>
                <p class="card-text">{{post.body}}</p>
            </div>
        </div>
        <h3 class='left'>Comments</h3>
        <div id="cards" class="card" v-for="(comment,index) in fetchComments" :key="index">
            <h4 text="bold" class="card-header">user: {{comment.name}}</h4>
            <div class="card-body">
                <p class="card-text">contact email: {{comment.email}}</p>
                <hr>
                <p class="card-text">{{comment.body}}</p>
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
    const postId = this.$route.params.postID
    this.$store.dispatch('comments/get', postId)
    this.$store.dispatch('posts/get', postId)
  },
  computed: {
    getPost () {
      return this.$store.state.posts.items
    },
    fetchComments () {
      return this.$store.state.comments.items
    }
  },
  methods: {
    detailsOfUser (ID) {
      this.$router.push({ path: '/board/user/' + ID })
    }
  }
}
</script>

<style>
  .card {
    text-align: left;
    margin: 20px auto;
    width: 75%;
  }
  .left {
      text-align: left;
      margin-left: 50px;
      margin-top: 15px;
  }
</style>

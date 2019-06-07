<template>
    <div>
        <h3 id='left'>Post</h3>
        <div id="cards" class="card" v-for="(post, id) in getPost" :key="'post' + id">
            <h4 text="bold" class="card-header">{{post.title}}</h4>
            <div class="card-body">
                <p class="card-text">started by <a href="#" @click.prevent="detailsOfUser(post.userId)">user{{post.userId}}</a></p>
                <hr>
                <p class="card-text">{{post.body}}}</p>
            </div>
        </div>
        <h3 id='left'>Comments</h3>
        <div id="cards" class="card" v-for="(comment,index) in fetchComments" :key="index">
            <h4 text="bold" class="card-header">user: {{comment.name}}</h4>
            <div class="card-body">
                <p class="card-text">contact email: {{comment.email}}</p>
                <hr>
                <p class="card-text">{{comment.body}}}</p>
            </div>
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

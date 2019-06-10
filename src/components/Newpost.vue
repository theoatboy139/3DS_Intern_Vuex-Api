<template>
  <div>
    <input type="text" name="fieldName" v-validate="'required'">
    <form id="newpost">
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="post.title" v-validate="'required'" name="Title">
        <span>{{ errors.first('Title') }}</span>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Content</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="post.body" v-validate="'required'" name="Content"></textarea>
        <span>{{ errors.first('Content') }}</span>
      </div>
      <button :disabled="!(post.body && post.title)" type="button" class="btn btn-outline-primary" @click="addPost">Add Post</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    addPost: function () {
      axios.post(`http://localhost:3000/posts`, {
        title: this.post.title,
        body: this.post.body,
        userId: Math.ceil(Math.random() * 10)
      }).then(response => {
        this.$store.dispatch('pages/add', response.data)
        console.log('status =', response.request.status)
      }).catch(err => {
        console.log(err)
      })
      this.post.title = ''
      this.post.body = ''
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
  #newpost{
    text-align: left;
    margin: 30px auto;
    width: 80%;
  }
</style>

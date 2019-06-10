<template>
  <div>
    <div class="form-inline">
      <div class="page-navigator">
        Page:
        <a
        href="#"
        type="link"
        v-for="(link, pageNumber) in pageLinks()"
        :key="pageNumber"
        @click.prevent="goToPage(link)"
      > {{ pageNumber + 1 }}</a
      >
        <p>
        <router-link :to="
            `/board/page/${
              parseInt(this.$route.params.page) == 1
                ? parseInt(this.$route.params.page)
                : parseInt(this.$route.params.page) - 1
            }`"
          >Previous</router-link
        >
        |
        <router-link
          :to="
            `/board/page/${
              parseInt(this.$route.params.page) == this.pageCount
                ? parseInt(this.$route.params.page)
                : parseInt(this.$route.params.page) + 1
            }`"
          :aria-disabled="parseInt(this.$route.params.page) == this.pageCount"
          >Next</router-link
        >
      </p>
      </div>
      <button type="button" class="btn btn-outline-primary" @click="newPost()">Add Post</button>
    </div>
    <div
        class="card"
        v-for="(post, index) in fetchPosts"
        :key="'post' + index"
      >
        <h4 text="bold" class="card-header">{{ post.title }}</h4>
        <div class="card-body">
          <p class="card-text">
            started by
            <a href="#" @click.prevent="detailsOfUser(post.userId)"
            >user{{ post.userId }}</a
            >
          </p>
          <hr />
          <p class="card-text">{{ post.body }}</p>
          <a
            href="#"
            class="btn btn-link"
            @click.prevent="detailsOfPost(post.id)"
          >Read more..</a
          >
        </div>
      </div>
<!--    <Newpost/>-->
  </div>
</template>

<script>
import { postPerPage } from '@/config/config'
import Layouts from '@/components/Layouts'
import Newpost from '@/components/Newpost.vue'
export default {
  data () {
    return {
      pageCount: 0
    }
  },
  components: {
    Layouts,
    Newpost
  },
  mounted () {
    const page = this.$route.params.page
    this.$store.dispatch('pages/get', page)
  },
  computed: {
    fetchPosts () {
      return this.$store.state.pages.items
    }
  },
  watch: {
    $route (to, from) {
      this.$store.dispatch('pages/get', to.params.page)
    }
  },
  methods: {
    goToPage (pageLink) {
      this.$router.push({ path: pageLink })
    },
    detailsOfPost (ID) {
      this.$router.push({ path: '/board/post/' + ID })
    },
    detailsOfUser (ID) {
      this.$router.push({ path: '/board/user/' + ID })
    },
    pageLinks () {
      const pageCount = Math.ceil(this.$store.state.pages.length / postPerPage)
      this.pageCount = pageCount
      let links = []
      for (let i = 1; i <= pageCount; i++) {
        links.push('/board/page/' + i)
      }
      return links
    },
    newPost () {
      this.$router.push({ path: '/board/newpost' })
    }
  }
}
</script>

<style scoped>
  .card {
    text-align: left;
    margin: 20px auto;
    width: 75%;
  }
  .page-navigator {
    margin: 0 auto;
  }
  .form-inline {
    margin: 20px auto 0px;
    width: 75%;
  }
</style>

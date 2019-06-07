<template>
  <div>
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
    <div
      id="cards"
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
        <p class="card-text">{{ post.body }}}</p>
        <a
          href="#"
          class="btn btn-link"
          @click.prevent="detailsOfPost(post.id)"
          >Read more..</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { postPerPage } from '@/config/config'
import Layouts from '@/components/Layouts'
export default {
  data () {
    return {
      pageCount: 0
    }
  },
  components: {
    Layouts
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
    }
  }
}
</script>

<style scoped>
#cards {
  text-align: left;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>

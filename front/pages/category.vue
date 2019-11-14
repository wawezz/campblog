<template>
  <div class="category-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="blog-title">קטגורית {{this.category.name}}</h1>
          <breadcrumbs v-if="bLinks.length > 0" :links="bLinks"/>
          <div class="post-item" v-for="post in posts" :key="post.id">
            <div class="row">
              <div class="col-md-4">
                <div class="tags-wrap">
                  <nuxt-link
                    v-for="tag in post.tags"
                    :to="'/tag/' + tag.title"
                    :key="tag.id"
                    class="blog-tag"
                  >{{tag.title}}</nuxt-link>
                </div>
                <div class="post-item-img">
                  <nuxt-link :to="'/post/' + post.title">
                    <img :src="post.imageUrl">
                  </nuxt-link>
                </div>
              </div>
              <div class="col-md-8">
                <nuxt-link :to="'/post/' + post.title" class="post-item-title">{{post.title}}</nuxt-link>
                <p>{{post.excerpt}}</p>
                <div class="clearfix">
                  <p class="post-details">
                    <span class="post-date">{{new Date(post.publishDate).yyyymmdd()}}</span>
                    <nuxt-link
                      :to="'/writer/' + post.writer.fullName"
                      class="post-writer"
                    >{{post.writer.fullName}}</nuxt-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <pagination
            v-if="postsCount"
            :total="postsCount"
            :current="currentPage"
            :size="postsPerPage"
            :prefix="'/category/'+category.name+'/'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumbs from "~/components/Breadcrumbs";
import pagination from "~/components/Pagination";
import { api, imageUrl } from "~/helpers/api";

export default {
  data() {
    return {
      postsCount: 0,
      postsPerPage: 4,
      currentPage: 1,
      bLinks: [],
      category: {
        id: 0,
        name: null
      },
      posts: []
    };
  },
  created() {
    this.category.name = this.$route.params.name
      ? this.$route.params.name
      : null;
    this.currentPage = this.$route.params.page ? this.$route.params.page : 1;
    this.init();
  },
  methods: {
    async init() {
      await this.getCategory();
      this.getPostsCount();
      this.getPosts(this.currentPage, this.postsPerPage);
      this.initLinks();
    },
    async getCategory() {
      if (!this.category.name) return;

      await api.get("/categories/" + this.category.name).then(response => {
        this.category = response.data;
      });
    },
    getPosts(page = 1, pageSize = 4) {
      if (!this.category.id) return;
      const params = {
        _start: (page - 1) * pageSize,
        _limit: pageSize,
        category: this.category.id
      };

      api.get("/posts", { params }).then(response => {
        this.posts = response.data.map(post => ({
          ...post,
          imageUrl: imageUrl(post.image)
        }));
      });
    },
    getPostsCount() {
      if (!this.category.id) return;
      const params = {
        category: this.category.id
      };
      api.get("/posts/count", { params }).then(response => {
        this.postsCount = response.data;
      });
    },
    initLinks() {
      if (this.category.name) {
        this.bLinks.push({
          title: this.category.name
        });
      }
    }
  },
  components: {
    breadcrumbs,
    pagination
  }
};
</script>
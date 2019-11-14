<template>
  <div class="category-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="blog-title">תגית "{{this.tag.title}}"</h1>
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
                <nuxt-link
                  :to="'/category/' + post.category.name"
                  class="post-category"
                >{{post.category.name}}</nuxt-link>
                <br>
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
            <pagination
              v-if="postsCount"
              :total="postsCount"
              :current="currentPage"
              :size="postsPerPage"
              :prefix="'/tag/'+tag.title+'/'"
            />
          </div>
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
      tag: {
        id: 0,
        title: null
      },
      posts: []
    };
  },
  created() {
    this.tag.title = this.$route.params.title ? this.$route.params.title : 1;
    this.currentPage = this.$route.params.page ? this.$route.params.page : 1;
    this.init();
  },
  methods: {
    async init() {
      await this.getTag();
      this.getPostsCount();
      this.getPosts(this.currentPage, this.postsPerPage);
      this.initLinks();
    },
    async getTag() {
      if (!this.tag.title) return;

      await api.get("/tags/" + this.tag.title).then(response => {
        this.tag = response.data;
      });
    },
    getPosts(page = 1, pageSize = 4) {
      if (!this.tag.id) return;
      const params = {
        _start: (page - 1) * pageSize,
        _limit: pageSize
      };

      api.get("posts/tag/+" + this.tag.id, { params }).then(response => {
        this.posts = response.data.map(post => ({
          ...post,
          imageUrl: imageUrl(post.image)
        }));
      });
    },
    getPostsCount() {
      if (!this.tag.id) return;

      api.get("/posts/tag/count/" + this.tag.id).then(response => {
        this.postsCount = response.data;
      });
    },
    initLinks() {
      if (this.tag.title) {
        this.bLinks.push({
          title: "תגית " + this.tag.title
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
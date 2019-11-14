<template>
  <div>
    <div
      v-if="topPost"
      class="main-post"
      :style="{ backgroundImage: `url(${topPost.imageUrl})` }"
      style="background: center top no-repeat; background-size: cover; max-width: 1140px; margin: 0 auto 30px;"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="feature-post">
              <nuxt-link
                :to="'category/' + topPost.category.name"
                class="post-category"
              >{{topPost.category.name}}</nuxt-link>
              <div class="blog-title-wrap">
                <h1 class="blog-title">
                  <nuxt-link :to="'post/' + topPost.title">{{topPost.title}}</nuxt-link>
                </h1>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="clearfix">
                    <p class="post-details">
                      <span class="post-date">{{new Date(topPost.publishDate).yyyymmdd()}}</span>
                      <nuxt-link
                        :to="'writer/' + topPost.writer.fullName"
                      >{{topPost.writer.fullName}}</nuxt-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="container hidden">
        <div class="row">
            <div class="col-md-12">
                <div class="align-center">
                    <button class="btn btn-main btn-lg btn-open-form collapsed" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        רוצים לשמוע עוד? הקליקו כאן!
                    </button>
                </div>
                <div class="collapse" id="collapseExample">
                    <div class="well">
                        ...
                    </div>
                </div>
            </div>
        </div>
    </div>-->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>פוסטים אחרונים:</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-6">
          <div class="post-item">
            <div class="post-item-img">
              <nuxt-link :to="'/post/' + post.title">
                <img :src="post.imageUrl">
              </nuxt-link>
            </div>
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
      </div>
      <pagination
        v-if="postsCount"
        :total="postsCount"
        :current="currentPage"
        :size="postsPerPage"
        :prefix="'/'"
      />
    </div>
  </div>
</template>

<script>
import pagination from "~/components/Pagination";
import { api, imageUrl } from "~/helpers/api";

export default {
  data() {
    return {
      postsCount: 0,
      postsPerPage: 4,
      currentPage: 1,
      posts: [],
      topPost: null
    };
  },
  created() {
    this.currentPage = this.$route.params.page ? this.$route.params.page : 1;
    this.initPosts();
  },
  methods: {
    async initPosts() {
      await this.getTopPost();
      this.getPostsCount();
      this.getPosts(this.currentPage, this.postsPerPage);
    },
    getPosts(page = 1, pageSize = 4) {
      const params = {
        _start: (page - 1) * pageSize,
        _limit: pageSize,
        id_ne: this.topPost.id
      };

      api.get("/posts", { params }).then(response => {
        this.posts = response.data.map(post => ({
          ...post,
          imageUrl: imageUrl(post.image)
        }));
      });
    },
    async getTopPost() {
      const params = {
        top: true,
        _limit: 1,
        _sort: "updated_at:DESC"
      };

      await api.get("/posts", { params }).then(response => {
        this.topPost = response.data[0];
        this.topPost.imageUrl = imageUrl(this.topPost.image);
      });
    },
    getPostsCount() {
      api.get("/posts/count").then(response => {
        this.postsCount = response.data;
      });
    }
  },
  components: {
    pagination
  }
};
</script>
<template>
  <div>
    <div
      class="post-top-bg"
      :style="{ backgroundImage: `url(${post.imageUrl})` }"
      style="background: center top no-repeat; background-size: cover;"
    >
      <div class="container">
        <div class="row" v-if="post.title">
          <div class="col-md-12">
            <nuxt-link
              :to="'/category/' + post.category.name"
              class="post-category"
            >{{post.category.name}}</nuxt-link>

            <h1>{{post.title}}</h1>
            <!--<p class="post-details">
                        <span class="post-date">
                            03/01/2018
                        </span>
                        <a href="writer" class="post-writer">
                            יהונתן שלג
                        </a>
            </p>-->
            <p class="post-tags">
              <nuxt-link
                v-for="tag in post.tags"
                :to="'/tag/' + tag.title"
                :key="tag.id"
                class="blog-tag"
              >{{tag.title}}</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <breadcrumbs v-if="bLinks.length > 0" :links="bLinks"/>
          <p class="post-details inner-post">
            <span class="post-date">{{new Date(post.publishDate).yyyymmdd()}}</span>
            <nuxt-link
              :to="'/writer/' + post.writer.fullName"
              class="post-writer"
            >{{post.writer.fullName}}</nuxt-link>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <div class="post-text" v-html="post.content"></div>

          <div>
            <p class="rate-it">דרג את המאמר:</p>
            <select id="example">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div class="col-md-1">&nbsp;</div>
        <div class="col-md-4">
          <img src="~assets/images/download.png">
          <div
            class="fb-like-box"
            data-href="https://www.facebook.com/summerofyourlife"
            data-width="326"
            data-colorscheme="light"
            data-show-faces="true"
            data-header="false"
            data-stream="false"
            data-show-border="false"
          ></div>

          <h3 class="blog-title side-bar-title">פוסטים אחרונים:</h3>
          <div class="latest-posts">
            <div class="latest-posts-item" v-for="latestPost in latestPosts" :key="latestPost.id">
              <div class="latest-posts-item-img-wrap">
                <img :src="latestPost.imageUrl">
              </div>
              <div class="latest-posts-item-info">
                <nuxt-link
                  :to="'/post/' + latestPost.title"
                  class="latest-post-item-title"
                >{{latestPost.title}}</nuxt-link>
                <p class="post-details">
                  <span class="post-date">{{new Date(latestPost.publishDate).yyyymmdd()}}</span>
                  <nuxt-link
                    :to="'/writer/' + latestPost.writer.fullName"
                    class="post-writer"
                  >{{latestPost.writer.fullName}}</nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumbs from "~/components/Breadcrumbs";
import { api, imageUrl } from "~/helpers/api";

export default {
  data() {
    return {
      post: {
        id: 0,
        title: null,
        category: {},
        writer: {}
      },
      bLinks: [],
      latestPosts: [],
      latestPostsSize: 4
    };
  },
  created() {
    this.post.title = this.$route.params.title
      ? this.$route.params.title
      : null;
    this.init();
  },
  methods: {
    async init() {
      await this.getPost();
      this.getLatestPosts();
      this.initLinks();
    },
    async getPost() {
      if (!this.post.title) return;

      await api.get("/posts/" + this.post.title).then(response => {
        this.post = response.data;
        this.post.imageUrl = imageUrl(this.post.image);
      });
    },
    getLatestPosts() {
      const params = {
        _limit: this.latestPostsSize,
        id_ne: this.post.id
      };

      api.get("/posts", { params }).then(response => {
        this.latestPosts = response.data.map(post => ({
          ...post,
          imageUrl: imageUrl(post.image)
        }));
      });
    },
    initLinks() {
      if (this.post.id) {
        this.bLinks.push({
          title: this.post.category.name,
          url: "/category/" + this.post.category.name
        });
        this.bLinks.push({
          title: this.post.title
        });
      }
    }
  },
  components: {
    breadcrumbs
  }
};
</script>

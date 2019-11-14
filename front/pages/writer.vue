<template>
  <div class="writer-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="blog-title">{{writer.fullName}}</h1>
          <breadcrumbs v-if="bLinks.length > 0" :links="bLinks"/>
          <div class="post-item">
            <div class="row" v-if="writer.id">
              <div class="col-md-5">
                <img :src="writer.imageUrl">
              </div>
              <div class="col-md-7">
                <span class="post-item-title">{{writer.fullName}}</span>
                <span v-html="writer.about"></span>
              </div>
            </div>
            <br>
            <br>
            <div class="row" v-if="posts.length > 0">
              <div class="col-md-12">
                <h2 class="blog-title">עוד פוסטים של {{writer.fullName}}:</h2>
              </div>
            </div>
            <br>
            <div class="row" v-if="posts.length > 0">
              <div class="col-md-12">
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
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <pagination
            v-if="postsCount"
            :total="postsCount"
            :current="currentPage"
            :size="postsPerPage"
            :prefix="'/writer/'+writer.fullName+'/'"
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
      writer: {
        id: 0,
        fullName: null
      },
      postsCount: 0,
      postsPerPage: 4,
      currentPage: 1,
      posts: [],
      bLinks: [{ title: "רשימת הכותבים", url: "/writers/" }]
    };
  },
  created() {
    this.writer.fullName = this.$route.params.name
      ? this.$route.params.name
      : 0;
    this.currentPage = this.$route.params.page ? this.$route.params.page : 1;
    this.init();
  },
  methods: {
    async init() {
      await this.getWriter();
      this.initLinks();
      this.getPosts(this.currentPage, this.postsPerPage);
      this.getPostsCount();
    },
    async getWriter() {
      if (!this.writer.fullName) return;

      await api.get("/writers/" + this.writer.fullName).then(response => {
        this.writer = response.data;
        this.writer.imageUrl = imageUrl(this.writer.avatar);
      });
    },
    getPosts(page = 1, pageSize = 4) {
      if (!this.writer.id) return;
      const params = {
        _start: (page - 1) * pageSize,
        _limit: pageSize,
        writer: this.writer.id
      };

      api.get("/posts", { params }).then(response => {
        this.posts = response.data.map(post => ({
          ...post,
          imageUrl: imageUrl(post.image)
        }));
      });
    },
    getPostsCount() {
      if (!this.writer.id) return;
      const params = {
        writer: this.writer.id
      };
      api.get("/posts/count", { params }).then(response => {
        this.postsCount = response.data;
      });
    },
    initLinks() {
      if (this.writer.fullName) {
        this.bLinks.push({
          title: this.writer.fullName
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
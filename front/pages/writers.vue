<template>
  <div class="all-writers-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="blog-title">רשימת כל הכותבים</h1>
          <breadcrumbs v-if="bLinks.length > 0" :links="bLinks"/>
          <div class="row">
            <div class="col-md-3 col-sm-6" v-for="writer in writers" :key="writer.id">
              <div class="post-item">
                <h3>
                  <nuxt-link :to="'/writer/' + writer.fullName">{{writer.fullName}}</nuxt-link>
                </h3>
                <div class="post-item-img">
                  <nuxt-link :to="'/writer/' + writer.fullName">
                    <img :src="writer.imageUrl">
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>

          <pagination
            v-if="writersCount"
            :total="writersCount"
            :current="currentPage"
            :size="writersPerPage"
            :prefix="'/writers/'"
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
      writersCount: 0,
      writersPerPage: 6,
      currentPage: 1,
      writers: [],
      bLinks: [{ title: "רשימת הכותבים" }]
    };
  },
  created() {
    this.currentPage = this.$route.params.page ? this.$route.params.page : 1;
    this.getWriters(this.currentPage, this.writersPerPage);
    this.getWritersCount();
  },
  methods: {
    getWriters(page = 1, pageSize = 6) {
      const params = {
        _start: (page - 1) * pageSize,
        _limit: pageSize
      };

      api.get("/writers", { params }).then(response => {
        this.writers = response.data.map(writer => ({
          ...writer,
          imageUrl: imageUrl(writer.avatar)
        }));
      });
    },
    getWritersCount() {
      api.get("/writers/count").then(response => {
        this.writersCount = response.data;
      });
    }
  },
  components: {
    breadcrumbs,
    pagination
  }
};
</script>
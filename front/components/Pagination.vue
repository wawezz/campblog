<template>
  <div class="row">
    <div class="col-md-12" v-if="pages.length > 1">
      <nav class="navigation pagination">
        <div class="nav-links">
          <nuxt-link v-if="pCurrent > 1" :to="lPrefix + (pCurrent - 1)" class="prev">הקודם</nuxt-link>
          <span v-if="pCurrent === 1" class="static prev disabled">הקודם</span>
          
          <span v-for="(page, index) in pages" :key="index">
            <nuxt-link
              v-if="page != pCurrent && page !== '...'"
              class="page-numbers"
              :to="lPrefix + page"
            >{{page}}</nuxt-link>

            <span
              v-if="page == pCurrent"
              aria-current="page"
              class="static page-numbers current"
            >{{pCurrent}}</span>
            
            <span v-if="page === '...'" class="static page-numbers dots">…</span>
          </span>

          <nuxt-link v-if="pCurrent < maxPage" :to="lPrefix + (pCurrent + 1)" class="next">הבא</nuxt-link>
          <span v-if="pCurrent === maxPage" class="static next disabled">הבא</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      maxPage: 0,
      pCurrent: parseInt(this.current),
      pSize: parseInt(this.size),
      pTotal: parseInt(this.total),
      lPrefix: this.prefix
    };
  },
  props: ["total", "current", "size", "prefix"],
  created() {
    this.maxPage = Math.ceil(this.pTotal / this.pSize);

    this.getPages();
  },
  methods: {
    getPages() {
      const { pCurrent, maxPage } = this;
      const pages = [];

      if (pCurrent > 3) {
        pages.push(1);
        if (pCurrent > 4) pages.push("...");
      }

      for (let page = pCurrent - 2; page <= pCurrent + 2; page++) {
        if (page > 0 && page <= maxPage) {
          pages.push(page);
        }
      }

      if (pCurrent < maxPage - 2) {
        if (pCurrent < maxPage - 3) pages.push("...");
        pages.push(maxPage);
      }
      this.pages = pages;
    }
  }
};
</script>
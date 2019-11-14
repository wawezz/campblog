<template>
  <ol class="breadcrumb">
    <li>
      <a href="#">ראשי</a>
    </li>
    <li>
      <nuxt-link :to="'/'">בלוג</nuxt-link>
    </li>
    <li
      v-for="(link, index) in cLinks"
      :key="index"
      :class="index === links.length - 1?'active':''"
    >
      <nuxt-link v-if="index !== links.length - 1" :to="link.url">{{link.title}}</nuxt-link>
      <span v-if="index === links.length - 1">{{link.title}}</span>
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      cLinks: this.links
    };
  },
  props: ["links"]
};
</script>
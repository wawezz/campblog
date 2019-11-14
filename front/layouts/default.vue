<template>
  <div>
    <appHeader/>
    <nuxt/>
    <contactStrip/>
    <appFooter/>
  </div>
</template>

<script>
import appHeader from "~/components/Header.vue";
import appFooter from "~/components/Footer.vue";
import contactStrip from "~/components/ContactStrip.vue";

export default {
  components: {
    appHeader,
    appFooter,
    contactStrip
  }
};
</script>

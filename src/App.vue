<template>
  <v-app class="dense">
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      notification: "getNotification"
    })
  },
  watch: {
    notification(val) {
      this.$toast.open({
        ...val,
        position: "top",
        dismissible: true
      });
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");

$body-font-family: "Montserrat";
$title-font: "Roboto";
.v-application {
  font-family: $body-font-family, sans-serif !important;
  background-image: url(/img/bg.jpg) !important;
  background-size: cover !important;
  background-position: bottom !important;
  font-weight: medium;
  .title {
    // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important;
  }
  [center] {
    text-align: center;
  }
}
</style>

import Vue from "vue";
import moment from "moment";

export default {
  register() {
    Vue.filter("format", function(val, f) {
      if (!isNaN(val)) {
        return String(val).replace(/(.)(?=(\d{3})+$)/g, "$1.");
      } else if (String(val).match(/\d{4}-\d{2}-\d{2}/)) {
        if (f == "fromNow") return moment(val).fromNow();
        else return moment(val).format(f ? f : "DD-MMM-YYYY");
      }
      return val;
    });
  }
};

import { getSetting } from "@/api/setting";
import titleController from "../utils/titleController"
export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const {data} = await getSetting();
      ctx.commit("setData", data);
      ctx.commit("setLoading", false);
      if (data.favicon) {
        // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
        let link = document.querySelector("link[rel='shortcut icon']");
        if (link) {
          return;
        }
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "images/x-icon";
        link.href = data.favicon;
        document.querySelector("head").appendChild(link);
      }
      if (data.siteTitle) {
        titleController.setSiteTitle(data.siteTitle);
      }
    },
  },
};

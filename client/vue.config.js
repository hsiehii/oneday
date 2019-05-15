module.exports = {
  devServer: {
    public: 'localhost:8080'
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_vars.scss";
          @import "@/assets/scss/_mixins.scss";
        `
      }
    }
  }
};

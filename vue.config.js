module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "styles/global.scss";
        `,
      },
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
};

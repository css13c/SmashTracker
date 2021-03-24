module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "styles/theme as theme";
        `,
        implementation: require("sass"),
        sassOptions: {
          fiber: require("fibers"),
        },
      },
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
};

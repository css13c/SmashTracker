module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "theme" as theme;
        `,
        implementation: require("sass"),
        sassOptions: {
          fiber: require("fibers"),
          includePaths: ["src/styles"],
        },
      },
    },
  },
  lintOnSave: process.env.NODE_ENV !== "production",
};

# Smash Tracker Dev Log

## The Problem
Last time, we did a lot of work to set up our color scheme and to make it easy to use across our application. But it left us with a problem. Every component now requires us to use this snippet if we want to access our color scheme mixins:
```scss
@use "styles/theme" as theme;
```

Not that big of a deal, but annoying. Now let's get rid of that annoyance using the power of automation!!

## It's Config Time
When I set up the project using the Vue CLI it did us a favor and auto installed the `sass-loader` package when I selected to use SCSS to handle styling. This package is what bundles up our scss code when the project is run. It also exposes options that will allow us to insert lines at the beginning of each scss section of our Vue components. All we need is a file named `vue.config.js` at the root of our project directory (it doesn't go in any project folder) that looks like this:
```js
// vue.config.js

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "theme" as theme;
        `,
        sassOptions: {
          includePaths: ["src/styles"]
        }
      }
    }
  }
};
```

Just to break this down, this is a configuration file that tells the Vue CLI how to set up webpack, css loaders, etc. It's a config file that configures other config files. Hurray for redundancy! For more information on the vue config file, [look here](https://cli.vuejs.org/guide/css.html#referencing-assets). For our purposes, setting up the scss loader, we only really care about the `prependData` and `sassOptions` fields. `prependData` just inserts the given string into the top of each scss file. There's a lot of fields in the `sassOptions`, but the `includePaths` field sets up load paths (see the "Load Paths" section at [this link](https://sass-lang.com/documentation/at-rules/use) for an explanation) for our project. So now if I want to create a scss module to re-use across the application, I don't need to include `src/styles` in each `@use` or `@import`.

## Wrap Up
That's it! Now instead of needing to import our theme file in each component, we can simply use our custom mixins! Next time I'll be start diving into creating a proper Vue component that will display player information across the application. Once again, check out the full SmashTracker code [right here](https://github.com/css13c/SmashTracker). See ya next time!
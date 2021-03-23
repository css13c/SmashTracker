# Smash Tracker Dev Log - Article 1

## Inspiration
The idea behind Smash Tracker was birthed while running my local Texas Esports Association chapter while in college. At the time, I was also attending local Super Smash Bros. tournaments. I wanted to create an application that could handle creating tournaments with seeding automatically decided based on previous results. So, after a lot of trying and failing, I decided to take another crack at it using the lessons I learned from the previous attempts with a new technology better suited to quickly create a beautiful UI. Enter Electron and Vue.

## Suiting up with Electron and Vue
Luckily, thanks to Vue CLI plugins (namely [electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)), setting up Electron with Vue is super easy. Just install the [Vue CLI](https://cli.vuejs.org/) and run
```
vue add electron-builder
```
and you're all set.

## Theming
All good apps need a color scheme, so first we need to sort out theming. I'm using SCSS to handle my styling needs, and so I decided on creating a mixin to grab the colors we need based on the [Material UI color system](https://material.io/design/color/the-color-system.html#color-theme-creation). And since I want to support a dark and a light theme, the mixin will need to grab the colors for the current theme. According to the Material UI specs, we will need:

* A primary color and at least 1 variant
* A secondary color and at least 1 variant
* A background color
* A surface color
* An error color
* "On" colors for each of the above
    * "On" colors are colors for text or elements that appear on top of each of the colors above

So I first made a file for the entire Material UI color palette (I plan on reusing this file across other applications that use SCSS, so it's worth the extra effort), it looks like this:
```scss
// styles/colors.scss

$black: #000000;
$white: #ffffff;
$red: (
    50: #FFEBEE,
    100: #FFCDD2,
    200: #EF9A9A,
    300: #E57373,
    //...
    contrast: (
        50: $black,
        100: $black,
        //...
    )
);
```

The contrast section defines our "on" colors for us, so that we don't need to figure it out for each shade.
Now that we have our palette to pick all our colors from, we can make a file that dictates our themes. For now, I'm going to just pick two colors to use since our setup here will allow us to easily swap our colors later. I'm starting with a color I stole from a Super Smash Bros Melee screenshot and its complimentary color. If you want help picking color palettes, I recommend checking out the [Material UI colors page](https://material.io/design/color/the-color-system.html#tools-for-picking-colors).
```scss
// styles/themes.scss

@use "sass:map";
@import "./colors";

$primary: #162EAE
$light-theme-primary: map-get($blue, 400);
$light-theme-secondary: #f66a29;
$light-theme-background: $white;
$light-theme-surface: $white;
```
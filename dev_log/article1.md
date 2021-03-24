# Smash Tracker Dev Log

## Inspiration
The idea behind Smash Tracker was birthed while running my local Texas Esports Association chapter while in college. At the time, I was also attending local Super Smash Bros. tournaments. I wanted to create an application that could handle creating tournaments with seeding automatically decided based on previous results. So, after a lot of trying and failing, I decided to take another crack at it using the lessons I learned from the previous attempts with a new technology better suited to quickly create a beautiful UI. Enter Electron and Vue.

## Quick Note
While writing these dev blogs, I will be discussing things that I learn, and tips and tricks I've picked up along the way. However, I will not be explaining the syntax for each language, as I'm assuming that readers will either be familiar with them or that they look that up on their own. Here are the technologies that I plan on using:

* [Vue JS v3](https://v3.vuejs.org/)
* [SCSS (specifically Dart-Sass)](https://sass-lang.com/documentation)
* [Typescript](https://www.typescriptlang.org/)

## Suiting up with Electron and Vue
Luckily, thanks to Vue CLI plugins (namely [electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)), setting up Electron with Vue is super easy. Just install the [Vue CLI](https://cli.vuejs.org/) and run
```
vue add electron-builder
```
and you're all set. It adds electron, and even sets up your scripts. Since I'm using yarn, I now just run `yarn electron:serve` and we're good to go!

## Theming
All good apps need a color scheme, so first we need to sort out theming. I'm using SCSS to handle my styling needs, and so I decided on creating a mixin to grab the colors we need based on the [Material UI color system](https://material.io/design/color/the-color-system.html#color-theme-creation). And since I want to support a dark and a light theme, the mixin will need to grab the colors for the current theme. According to the Material UI specs, we will need:

* A primary color and at least 1 variant
* A secondary color and at least 1 variant
* A background color
* A surface color
* An error color
* "On" colors for each of the above
    * "On" colors are colors for text or elements that appear on top of each of the colors above

### Colors
So I first made a file for the entire Material UI color palette (I plan on reusing this file across other applications that use SCSS, so it's worth the extra effort), it looks like this:
```scss
// styles/_colors.scss

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

The contrast section defines our "on" colors for us, so that we don't need to figure it out for each shade. Also, if you're following along, feel free to put these files anywhere for now. I've placed mine in a `styles` folder in my `src` directory.

### Theme Declaration
Now that we have our palette to pick all our colors from, we can make a file that declares our color scheme. For now, I'm going to just pick two colors to use since our setup here will allow us to easily swap our colors later. I'm starting with a color I stole from a Super Smash Bros Melee screenshot and its complimentary color. If you want help picking color palettes, I recommend checking out the [Material UI colors page](https://material.io/design/color/the-color-system.html#tools-for-picking-colors).
```scss
// styles/_theme.scss

@use "sass:map";
@use "sass:color";
@use "colors" as *;

$-primary-base: #162dae;
$-secondary-base: #ffb700;
$-dark-bg: #121212;

$-theme: (
    "light": (
        "primary": $-primary-base,
        "primary-variant": scale-color($-primary-base, $lightness: -20%),
        //...
    ),
    "dark": (
        "primary": scale-color($-primary-base, $lightness: 30%),
        "primary-variant": $-primary-base,
        // ...
    )
);
```

### Using our color scheme
Now that we have our color scheme set-up, I want to trivialize setting colors on elements using sass mixins. If you don't know how they work, [see here](https://sass-lang.com/documentation/at-rules/mixin) for an explanation. Our mixins will look something like this:
```scss
@mixin primary() {
    background-color: $primary-color;
    color: $on-primary-color;
}
```

so that styling elements with our colors is this easy:
```scss
// component.vue

@use "theme" as theme;

#element {
    @include theme.primary;
}
```

But we have both a light and dark color scheme to worry about, so our mixin needs to have an input parameter so that it can fetch the right color based on the color scheme. Since we will be create a re-used chunk of code, I went ahead and made a sass function to fetch the color we need from our theme map:
```scss
@function get-color($theme-name, $color-type) {
    @return map-get(map-get($-theme, $theme-name), $color-type);
}
```

So now we just add a parameter to our mixin and it looks like this:
```scss
// style/_theme.scss

@mixin primary($type:"light") {
    background-color: get-color($type, "primary");
    color: get-color($type, "on-primary");
}
```

Now we do a little copy paste for all of our colors, and we can easily use our color scheme anwhere! 

## Wrap Up
Next time, I'll be trying to do a little more wizardry to get rid of having to constantly rewrite `@use "styles/theme" as theme` all the time. Check out the [SmashTracker GitHub page](https://github.com/css13c/SmashTracker) for the full code!
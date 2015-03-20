

# Notes

## Fonts & CSS

### Ligatures, Sub-Pixel Rendering, and `@font-face`



```
/* ###################################################################################################### */
/* TAINT these settings interact with `@font-face` rules, at least with those concerning SunExt-A, Sun-ExtB
such that at least codepoints from the latter are displayed as thin white spaces. */
/* ###################################################################################################### */

// html
//   // text-rendering:                 optimizeLegibility
//   text-rendering:                 geometricPrecision
//   // font-variant-ligatures:         common-ligatures
//   // font-kerning:                   normal
//   -webkit-font-feature-settings:  "liga" 1, "dlig" 1
```


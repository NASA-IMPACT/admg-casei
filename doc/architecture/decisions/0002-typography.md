# 2. Implementing the typography design system

- Status: proposed
- Deciders: [@aliceR, @necoline]
- Date: 2021-02-02

## Context and Problem Statement

We started the project with simple inline styles. The goal was to keep the styles closely coupled with the components they apply to.

We use [TypographyJS](https://kyleamathews.github.io/typography.js/) and added our interpretation of the styles from the designs to the respective html elements as typography.js override styles. TypographyJS defines those styles as global css stylesheet. It is added to the Gatsby project via the `gatsby-plugin-typography`, which takes care of the integration into the build process.

We have inconsistencies in our designs, the design system, and implementation of those designs. As we update the designs to offer a consistent style guide, we need update the code. Ideally, our solution will be a combination of centralized base typography styles for general text, and component specific font styles that live next to their UI implementation.

## Decision Drivers

- Core styles should be easily identified and updated as needed (changes to font colors and weights should be done in one place)
- Components should use core styles and override them as needed
- Styled Components should be used in relationship to components - not stand alone styles in stylesheets

## Considered Options

- [Option 1]: Hold styles in a typography file and use the across the project [ex](https://github.com/developmentseed/admg-inventory/pull/193)
- [Option 2]: Continue using `typography.js` to manage styles for html elements that are overridden in component styles as necessary

## Decision Outcome

Chosen option: [Option 2], because encourages us to draw distinctions between core typography styles and component specific font styles and maintain integrity of our approach to styling. We will likely need to update our components that are slight offshoots of our core styles (like button text or banner text). These should be override of our base `<p>` or `<a>` styles. The fact that we hold them in the button or banner component should indicate that these overrides are specific to that component and are not intended to be applied to anything else.

### Links

[TypographyJS](https://kyleamathews.github.io/typography.js/),
[Miro Board](https://miro.com/app/board/o9J_lW2ssAE=/?moveToWidget=3074457353850170574&cot=14)
[Gatsby Typography.js Plugin](https://web.archive.org/web/20201025193022/https://www.gatsbyjs.com/docs/using-typography-js/)

### Related conversations
[Issue: Typography Update](https://github.com/developmentseed/admg-inventory/issues/156),
[PR: Clean up and tune typography #104](https://github.com/developmentseed/admg-inventory/pull/104)

# NUMBER. TITLE [short title of solved problem and solution]

- Status: proposed
- Deciders: [@aliceR, @necoline]
- Date: 2021-02-02

## Context and Problem Statement

We started the project with simple inline styles. The goal was to keep the styles closely coupled with the components they apply to.

We updated later added [TypographyJS](https://kyleamathews.github.io/typography.js/) and added our styles from the designs to the html elements within the typography js structure.

We have inconsistencies in our designs and implementation of those designs. As we update the designs to offer a consistent style guide, we need update the code. Ideally, our solution will be a combination of centralized core styles and component specific styles that live next to their components.

## Decision Drivers

- Core styles should be easily identified and updated as needed (changes to font colors and weights should be done in one place)
- Components should use core styles and override them as needed
- Styled Components should be used in relationship to components - not stand alone styles in stylesheets

## Considered Options

- [Option 1]: Hold styles in a typography file and use the across the project [ex](https://github.com/developmentseed/admg-inventory/pull/193)
- [Option 2]: Continue using `typography.js` to manage styles for html elements that are overridden in component styles as necessary

## Decision Outcome

Chosen option: [Option 2], because encourages us to draw distinctions between core styles and component specific styles and maintain integrity of our approach to styling. We will likely need to update our components that are slight offshoots of our core styles like button text or banner text. These should be override of our base `<p>` or `<a>` styles. The fact that we hold them in the button or banner component should indicate that these overrides are specific to that component and are not intended to be applied to anything else.

### Links

[TypographyJS](https://kyleamathews.github.io/typography.js/),
[Typography Update Issue](https://github.com/developmentseed/admg-inventory/issues/156),
[Miro Board](https://miro.com/app/board/o9J_lW2ssAE=/?moveToWidget=3074457353850170574&cot=14)

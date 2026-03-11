## Pages
- `index.html` - Home page (Hero, Features, Coaches)
- `classes.html` - Classes page (Schedule, Pricing)

## CSS Layout
- **CSS Grid** - `layout/_hero.scss`, `layout/_sections.scss`, `components/_schedule.scss`
- **Flexbox** - `layout/_header.scss`, `layout/_sections.scss`, `layout/_footer.scss`

## SASS/SCSS Features

| Feature | Location | Description |
|---------|----------|-------------|
| Variables | `abstracts/_variables.scss` | Store colors, fonts, and spacing |
| Custom Properties | `layout/_hero.scss` | Background color and height of Hero section |
| Nesting | All layout and component files | Write child element styles inside parent |
| Interpolation | `layout/_header.scss`, `components/_cards.scss` | Use variables to build class names |
| Placeholder Selectors | `abstracts/_placeholders.scss` | Shared base styles for cards and buttons |
| Mixins | `abstracts/_mixins.scss` | Package reusable groups of styles |
| Functions | `abstracts/_functions.scss` | Convert px to rem, lighten colors |
| @each | `layout/_header.scss` | Loop to generate nav item classes |
| @for | `components/_cards.scss` | Loop to set colors for each card type |
| @if/@else | `abstracts/_mixins.scss` | Choose breakpoint based on screen size |
| @keyframes | `utilities/_animations.scss` | Define fade-in animation |

## File Organization
- `abstracts/` - Variables, functions, mixins, placeholders
- `layout/` - Header, footer, hero, page sections
- `components/` - Buttons, cards, schedule
- `utilities/` - Reset styles, animations
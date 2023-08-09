# Sparx Design System

A React-based Design System created for Spyrothon.

# Usage

```shell
pnpm add @spyrothon/sparx @spyrothon/tokens
# Create the token definitions from a default template
pnpm sparx-tokens
# Run the generate script (you'll need a native typescript runner like esno or tsx)
pnpm esno ./design/generate.ts
```

Then in your project, import the generated `system.css` and `@spyrothon/sparx/dist/style.css` in
order near the root:

```css
// In some global CSS file
@import "./design/generated/system.css";
@import "@spyrothon/sparx/dist/style.css";
```

or in your JS

```typescript
import "./design/generated/system.css";
import "@spyrothon/sparx/dist/style.css";
```

Make sure these files aren't transpiled or clobbered by something like CSS Modules

If you're editing your tokens frequently, like when initially setting up the system, you'll probably
want to add the generation as an npm script, like:

```json
// in package.json
{
  "scripts": {
    "gen:tokens": "esno ./design/generate.ts"
  }
}
```

Then you can just run `pnpm gen:tokens` to regenerate them all.

# Roadmap

**Components**

- [x] Image
- [x] Code
- [x] Button
  - [x] Outline look
- [x] TextArea
- [x] DateTimeInput
  - [ ] Use a library for a better picker experience
- [x] TextInput variations (validators)
  - [x] Currency
  - [x] Email (can use native)
  - [x] Duration
  - [x] Phone
- [x] SelectInput
  - [x] Combobox
  - [ ] MultiSelect
- [x] FormControl
  - [x] Prefix
  - [x] Suffix
  - [x] Size options
  - [x] Validations
- [x] Callout
  - [x] Dismissable
- [x] ProgressBar
- [x] TabGroup
  - [x] Icons
  - [x] Badges
- [x] Layer
  - [x] Modal
  - [x] Popout
  - [x] Tooltip
- [ ] Effects (extrusion shadow)
- [ ] Table
- [ ] List
- [ ] NavBar
  - [ ] Dropdown
- [x] Box (like Card, but just an outline)
- [ ] Sequenced Content
  - [ ] Stepper
  - [ ] Slides

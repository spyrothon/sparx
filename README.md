# Sparx Design System

A React-based Design System created for Spyrothon.

# Usage

Add a `.design_system` folder to your project and create a `base_tokens.json` and `themes.json` file
to define your themes (see the example in `packages/docs/.design_system` as a reference).

Then, from the root of this repository, run
`python3 cli/generate_tokens.py <path/to/your/.design_system>`.

Then in your project, import the generated `DesignSystem.css` and `sparx/dist/style.css` in order
near the root:

```typescript
import "../.design_system/generated/DesignSystem.css";
import "sparx/dist/style.css";
```

# Unfinished

**Components**

- [x] Image
- [x] Code
- [x] Button
  - [x] Outline look
- [x] TextArea
- [x] Icons
  - [ ] Expose remainder of `react-unicons`
- [x] DateTimeInput
  - [ ] Use a library for a better picker experience
- [x] TextInput variations (validators)
  - [x] Currency
  - [x] Email (can use native)
  - [x] Duration
  - [x] Phone
- [x] SelectInput
  - [ ] Combobox
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
- [ ] Box (like Card, but just an outline)
- [ ] Sequenced Content
  - [ ] Stepper
  - [ ] Slides

**Generic**

- [x] Disabled states
- [ ] Consistent event handlers for inputs

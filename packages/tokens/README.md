# @spyrothon/tokens

Type-safe token generation system for the Sparx design system, managing colors, fonts, and more.

Define your design system's tokens and themes safely in typescript and generate client code for CSS
and more.

# Usage

```
# Install the package
pnpm add @spyrothon/tokens
# Create the token definitions from a default template
pnpm sparx-tokens
# Run the generate script (you'll need a native typescript runner)
pnpm esno ./design/generate.ts
```

You can edit `./design/tokens.tsx` to change tokens to match whatever you need. Note that the color
tokens defined by default are almost all required for Sparx to function and appear as intended.

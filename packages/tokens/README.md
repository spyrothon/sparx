# sparx-icons

Icons are largely taken from https://remixicon.com/. Rather than importing the library and trying to
wrap every icon component, we just copy the SVG directly (since it's available), and enable
standardized props to control them.

This also means we can add various other icons from different systems as needed (e.g., for specific
brand logos), and have better control over the icon props (e.g., adding accessibility props, like
`aria-hidden` by default).

All icons have their respective copyright license referenced at the top of the file.

## Usage

Every icon is available as its own component, and should be imported as such to avoid importing
additional icons unnecessarily.

```
import {ChevronDown} from '@spyrothon/sparx-icons/ChevronDown';
```

Eventually a common file might be introduced to support tree shaking.

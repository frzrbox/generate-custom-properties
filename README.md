# Generate Custom Properties

A utility for generating CSS Custom Properties from a JSON file

## Get Started

### Installation

`npm i -D generate-custom-properties`

Usage:

`$ generate-properties [flags]`

### Flags

**`--in`**

Input file that will be used as the configuration for the design tokens that are generated. Default file is `properties.config.json`.

**`--out`**

Output file that will be generated with the design tokens. Default file is `properties.css`.

### Configuration

The configuration file defaults to `properties.config.json` and can also be changes throught the `--in` flag.

At the moment the only supported configuration file type is `JSON`.

### Handling Output

#### :Root

Any content nested within `root` will be declared in the css file as `:root`

#### Utilities

By default all properties on the root level will create a new utlity class

Input:

```json
{
   "alternate":{
      "colors":{
         "primary":"orange"
      },
      "font-size":{
         "large":"5em"
      }
   }
}
```

Output:

```css
.alternate {
   --colors--primary: orange;
   --font-size--large: 5em;
}
```

#### Data Attributes

To create custom data attribute, separate the attribute name and the value with `:`

Example:
`attribute-name:value`

Input:

```json
{
   "theme:dark-mode":{
      "colors":{
         "primary":"black",
         "secondary":"white"
      }
   }
}
```

Output:

```css
[data-theme="dark-mode"] {
  --colors--primary: black;
  --colors--secondary: white;
}
```

### Example

`properties.config.json`

```json
{
   "root":{
      "colors":{
         "primary":"red",
         "secondary":"blue",
         "link":{
            "idle":"orange",
            "hovered":"tomato"
         }
      },
      "breakpoints":{
         "small":"768px",
         "medium":"1024px",
         "large":"1440px"
      },
      "font-size":{
         "h1":"48px",
         "h2":"36px",
         "h3":"24px"
      }
   },
   "winter":{
      "colors":{
         "primary":"green",
         "secondary":"white"
      }
   },
   "summer":{
      "colors":{
         "primary":"orange",
         "link":{
            "hovered":"purple"
         }
      }
   },
   "theme:dark-mode":{
      "colors":{
         "primary":"black",
         "secondary":"white"
      }
   },
   "theme:high-contrast":{
      "font-size":{
         "h1":"75px",
         "h2":"40px",
         "h3":"24px"
      }
   },
   "state:open":{
      "colors":{
         "primary":"blue"
      }
   }
}
```

`properties.css`

```css
:root {
  --colors--primary: red;
  --colors--secondary: blue;
  --colors--link--idle: orange;
  --colors--link--hovered: tomato;
  --breakpoints--small: 768px;
  --breakpoints--medium: 1024px;
  --breakpoints--large: 1440px;
  --font-size--h1: 48px;
  --font-size--h2: 36px;
  --font-size--h3: 24px;
}

.winter {
  --colors--primary: green;
  --colors--secondary: white;
}

.summer {
  --colors--primary: orange;
  --colors--link--hovered: purple;
}

[data-theme="dark-mode"] {
  --colors--primary: black;
  --colors--secondary: white;
}

[data-theme="high-contrast"] {
  --font-size--h1: 75px;
  --font-size--h2: 40px;
  --font-size--h3: 24px;
}

[data-state="open"] {
  --colors--primary: blue;
}
```

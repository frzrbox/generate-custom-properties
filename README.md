# Generate Custom Properties

A cli for generating CSS Custom Properties from a JSON file

## Get Started

### Installation

`npm i -D generate-custom-properties`

Usage:

`$ generate-properties [flag]`

### Flags

**`--in`**

Input file that will be used as the configuration for the design tokens that are generated. Default file is `properties.config.json`.

**`--out`**

Output file that will be generated with the design tokens. Default file is `properties.css`.

### Configuration

The configuration file defaults to `properties.config.json` and can also be changes throught the `--in` flag.

At the moment the only supported configuration file type is `JSON`.

All content **must be nested** within `properties`.

**Example:**

```json
{
 "properties": {
    "colors": {
        "blue": "blue",
        "link": {
            "idle": "orange",
            "hovered": "tomato",
            "alt": {
                "idle": "green",
                "hovered": "yellow"
            }
        }
    },
    "breakpoints": {
        "small": "768px",
        "medium": "1024px",
        "large": "1440px"
    },
    "font-size": {
        "h1": "48px",
        "h2": "36px",
        "h3": "24px"
    }
  }
}
```

### Output

The Custom Properties generated will be separated by their nested order in the configuration file.

**Example:**

Configuration

```json
{
    "properties" : {
        "colors" : {
            "primary" : "tomato",
            "link" : {
                "hover" : "orange",
                "cta" : "green"
            }
        },
        "breakpoints" : {
            "small" : "768px"
        }
    }
}
```

Output

```css
:root {
    --color--primary: tomato;
    --color--link--hover: orange;
    --color--link--cta: green;
    --breakpoints--small: 768px;
}
```

# Griderator

A simple grid generator module for node.js.

## Usage

Clone this repo:

```bash
§ git clone git@github.com:mateogianolio/griderator.git
```

Edit config and then run with

```bash
npm start
```

## Example

This config:

```json
{
  "width": "960px",
  "selectors": {
    "element": "div",
    "attribute": "data-grid"
  },
  "columns": 3
}
```

Yields this CSS code:

```css
*
{margin:0;
padding:0;
position:relative;
-webkit-box-sizing:border-box;
-moz-box-sizing:border-box;
box-sizing:border-box}

[size]
{width:960px;
display:inline-block;
*display:inline;
*zoom:1;
vertical-align:top;
overflow:hidden;
*overflow:visible}

.grid [size~="1/2"]
{width:480px}

.grid [size~="1/3"]
{width:320px}

.grid [size~="1/4"]
{width:240px}

.grid [size~="1/5"]
{width:192px}

.grid [size~="1/6"]
{width:160px}

.grid [size~="2/3"]
{width:640px}

.grid [size~="2/5"]
{width:384px}

.grid [size~="3/4"]
{width:720px}

.grid [size~="3/5"]
{width:576px}

.grid [size~="4/5"]
{width:768px}

.grid [size~="4/6"]
{width:640px}

.grid [size~="5/6"]
{width:800px}


```
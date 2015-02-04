# Griderator

A simple CSS grid generator for node.js that supports

* any width unit.
* any amount of columns.

## Installation

Install via ```npm```

```bash
$ npm install griderator
```

## Usage

Include in your project with

```javascript
var griderator = require('griderator');
```

Generate grid by calling

```javascript
griderator.css('/path/to/config.json', function(error, data, path) {
  if(error) throw error;
  
  console.log(data);
});

Callback parameters

* **data** -- Either a string or a javascript object (configurable in config.json) containing the generated css.

* **path** -- Path to output css (optional).
```

## Example

**config.json**
```json
{
  "width": "960px",
  "selectors": {
    "container": ".grid",
    "element": ""
  },
  "attribute": "size",
  "columns": 6,
  "file": "css/grid.css",
  "output": "css"
}

```

If no ```file``` is specified the code is output to ```stdout```.

Above configuration yields the following code

**css/grid.css**
```css
html
{font-size:100%}

*
{margin:0;
padding:0;
position:relative;
-webkit-box-sizing:border-box;
-moz-box-sizing:border-box;
box-sizing:border-box}

.grid
{width:960px;
margin:0 auto}

[data-size]
{width:960px;
display:inline-block;
*display:inline;
*zoom:1;
vertical-align:top;
overflow:hidden;
*overflow:visible}

[data-size~="1/2"]
{width:480px}

[data-size~="1/3"]
{width:320px}

[data-size~="1/4"]
{width:240px}

[data-size~="1/5"]
{width:192px}

[data-size~="1/6"]
{width:160px}

[data-size~="2/3"]
{width:640px}

[data-size~="2/5"]
{width:384px}

[data-size~="3/4"]
{width:720px}

[data-size~="3/5"]
{width:576px}

[data-size~="4/5"]
{width:768px}

[data-size~="4/6"]
{width:640px}

[data-size~="5/6"]
{width:800px}
```

## Todo

* Add optional ```padding``` attribute to config.
* Add responsive css
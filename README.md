# Griderator

A simple CSS grid generator for Node.js that supports

* any width unit (```px```, ```%```, ```em```, you name it).
* any amount of columns.
* gutters (currently in the form of ```padding```).
* collapsing at given width.

Generates CSS to a file, to a string or to a javascript array.

## Installation

Clone or install via ```npm```

```bash
$ npm install griderator
```

Test with

```bash
$ npm test
```

## Usage

Include in your project with

```javascript
var griderator = require('griderator');
```

This module consists of two high level functions:

```javascript
griderator.css = function(file, path, callback)
```

* **```file```**
    * Path to ```config.json```.

* **```path```** (optional)
    * Output path.

* **```callback(error, data, path)```**
    * ```error```
      * Error message or ```null```.
    * ```data```
      * A string with the generated CSS.
    * ```path```
      * Output path.

```javascript
griderator.js = function(file, callback)
```

* **```file```**
    * Path to ```config.json```.

* **```callback(error, data)```**
    * ```error```
      * Error message or ```null```.
    * ```data```
      * A javascript array containing the generated CSS.

Together with these lower level helper functions declared in ```tools.js```:

```javascript
/* @returns
 * an array containing the generated CSS. */
griderator.parse = function(config)
```

* **```config```**
    * A javascript array containing data from ```config.json```.

```javascript
/* @returns
 * an array of the loaded data */
griderator.load = function(file, callback)
```

* **```file```**
    * Path to ```config.json```.

* **```callback(error, data, path)```**
    * ```error```
      * Error message or ```null```.
    * ```data```
      * An array with the loaded data.

```javascript
/* @returns
 * path to saved data. */
griderator.save = function(file, data, callback)
```

* **```file```**
    * Output path.

* **```callback(error, path)```**
    * ```error```
      * Error message or ```null```.
    * ```path```
      * Output path.

## Example

**config.json**
```json
{
  "width": "960px",
  "gutter": "10px",
  "selectors": {
    "container": ".grid",
    "element": ""
  },
  "attribute": "data-size",
  "collapse": "960px",
  "columns": 6,
}

```

```collapse``` is optional. If set, a ```@media``` query will be added making the grid collapse at that width.

Above configuration yields the following CSS:

```css
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
padding-right:10px;
display:inline-block;
*display:inline;
*zoom:1;
vertical-align:top;
overflow:hidden;
*overflow:visible}

@media screen and (max-width: 960px)
{[data-size] {width:100% !important}}

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

Or this Javascript array:

```javascript
[ { html: { 'font-size': '100%' } },
  { '*': 
     { margin: 0,
       padding: 0,
       position: 'relative',
       '-webkit-box-sizing': 'border-box',
       '-moz-box-sizing': 'border-box',
       'box-sizing': 'border-box' } },
  { '.grid': { width: '960px', margin: '0 auto' } },
  { '[data-size]': 
     { width: '960px',
       'padding-right': '10px',
       display: 'inline-block',
       '*display': 'inline',
       '*zoom': 1,
       'vertical-align': 'top',
       overflow: 'hidden',
       '*overflow': 'visible' } },
  { '@media screen and (max-width: 960px)': { '[data-size]': [Object] } },
  { '[data-size~="1/2"]': { width: '480px' } },
  { '[data-size~="1/3"]': { width: '320px' } },
  { '[data-size~="1/4"]': { width: '240px' } },
  { '[data-size~="1/5"]': { width: '192px' } },
  { '[data-size~="1/6"]': { width: '160px' } },
  { '[data-size~="2/3"]': { width: '640px' } },
  { '[data-size~="2/5"]': { width: '384px' } },
  { '[data-size~="3/4"]': { width: '720px' } },
  { '[data-size~="3/5"]': { width: '576px' } },
  { '[data-size~="4/5"]': { width: '768px' } },
  { '[data-size~="4/6"]': { width: '640px' } },
  { '[data-size~="5/6"]': { width: '800px' } } ]
```

## Todo

* Add support for CSS preprocessors?

## Contribute

Feel free to submit pull requests :)

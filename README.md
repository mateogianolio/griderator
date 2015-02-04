# Griderator

A simple CSS grid generator for node.js that supports

* any width unit.
* any amount of columns.

## Usage

To get started clone this repository
```bash
$ git clone git@github.com:mateogianolio/griderator.git
```

or install via ```npm```:

```bash
$ npm install griderator
```

Edit ```config.json``` and then run with

```bash
npm start
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
  "file": "css/grid.css"
}

```

If no ```file``` is specified the code is output to ```stdout```.

```bash
$ npm start

> griderator@1.0.2 start /path/to/griderator
> node app.js

path: css/grid.css
size: 724 bytes
```

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
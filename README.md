# @phucbm/get-options-from-html-attr

![Test Status](https://github.com/phucbm/get-options-from-html-attr/actions/workflows/test.yml/badge.svg)
![NPM Publish](https://img.shields.io/github/actions/workflow/status/phucbm/get-options-from-html-attr/publish.yml?branch=main&label=npm%20publish&logo=npm)
![NPM Version](https://img.shields.io/npm/v/@phucbm/get-options-from-html-attr)


A utility function to parse options from a specified attribute of a target element, with support for default values, numeric conversion, and JSON validation.

## Installation

First, ensure you have Node.js and npm installed. Then, install the package using npm:

```bash
npm i @phucbm/get-options-from-html-attr
```

## Usage

### Importing the Function

```typescript
import { getOptionsFromAttribute } from '@phucbm/get-options-from-html-attr';
```

### Function Parameters

The `getOptionsFromAttribute` function accepts an object with the following properties:

| Parameter        | Type                     | Default Value | Description                                          |
|------------------|--------------------------|---------------|------------------------------------------------------|
| `target`         | `HTMLElement`            | `null`        | `null`                                               | The target HTML element.                            |
| `attributeName`  | `string`                 | `''`          | The name of the attribute to parse.                  |
| `defaultOptions` | `Record<string, any>`    | `{}`          | The default options to return if parsing fails.      |
| `numericValues`  | `string[]`               | `[]`          | An array of property names to convert to float.      |
| `onIsString`     | `(data: string) => void` | `undefined`   | A callback function to execute if value is not JSON. |
| `dev`            | `boolean`                | `false`       | Enable or disable development mode.                  |

### Example Usage

```typescript
import { getOptionsFromAttribute } from '@phucbm/get-options-from-html-attr';

const targetElement = document.getElementById('example-element');

const options = getOptionsFromAttribute({
  target: targetElement,
  attributeName: 'data-options',
  defaultOptions: { key: 'defaultValue' },
  numericValues: ['numericValue'],
  onIsString: (data) => { console.log('Not a JSON string:', data); },
  dev: true,
});

console.log(options);
```

### Example HTML

```html
<div id="example-element" data-options='{"key":"value", "numericValue":"123.45", "isTrue":"true", "isFalse":"false"}'></div>
```

### Expected Output

When the above HTML and JavaScript are used, the `options` object will be:

```javascript
{
  key: 'value',
  numericValue: 123.45,
  isTrue: true,
  isFalse: false
}
```

## Testing

```bash
npx jest
```

Ensure all tests pass.

## License

This project is licensed under the MIT License.

---
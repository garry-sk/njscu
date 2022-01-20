# njscu - node.js common utils

Is a small library that provides various useful general purpose tools.

## Installation

```sh
npm install njscu
```
## Methods

### setProperty

 * `obj` \<Object\> - object for which property will be defined
 * `name` \<String\> - property name
 * `val` \<any\>
    - for data descriptor - property value;
    - for access decriptor - array of accessors
    ([getter, setter] any of them can be omitted)
 * `mask` \<Number|String\> - a set of bit flags or string '[w][e][c][a]' that
    defines the property descriptor
    - bit 0 (mask: 0b0001) - is property writable. if set - true, else - false
    - bit 1 (mask: 0b0010) - is property enumerable. if set - true, else - false
    - bit 2 (mask: 0b0100) - is property configurable. if set - true, else - false
    - bit 3 (mask: 0b1000) - `access/data` descriptor flag. if set - `access`, else - `data`
    - w - property is writable
    - e - property is enumerable
    - c - property is configurable
    - a - access decriptor
 * Returns: \<Object\>

Sets a property of object using `bitmask` as the property descriptor and returns that object.

```js
const { setProperty } = require('njscu');

// sets the not writable, not enumerable and not configurable property
const obj = setProperty({}, 'str-property', 'str');

// sets the writable property, not enumerable, not configurable
setProperty(obj, 'num-property', 9, 0b0001);
// or
setProperty(obj, 'num-property', 9, 'w');

// sets the enumerable property, not writable, not configurable
setProperty(obj, 'arr-property', [0, '1', NaN], 0b0010);
// or
setProperty(obj, 'arr-property', [0, '1', NaN], 'e');

// sets the configurable property, not writable, not enumerable
setProperty(obj, 'obj-property', { v:, 'v' }, 0b0100);
// or
setProperty(obj, 'obj-property', { v:, 'v' }, 'c');

// sets the configurable and enumerable property with access descriptor
setProperty(obj, 'acc-property', [ () => 'val', val => {} ], 0b1110);
// or
setProperty(obj, 'acc-property', [ () => 'val', val => {} ], 'ace');
```
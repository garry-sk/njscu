'use strict';

/**
 * Sets the property of object. `bitmask` as property descriptor.
 * @param {Object} obj object for which property will be defined
 * @param {String} name property name
 * @param {any} val -
    - for data descriptor - property value;
    - for access decriptor - array of accessors
    ([getter, setter] any of them can be omitted)
 * @param {Number} mask - a set of bit flags or string '[w][e][c][a]' that
    defines the property descriptor
    - bit 0 (mask: 0b0001) - is property writable. if set - true, else - false
    - bit 1 (mask: 0b0010) - is property enumerable. if set - true, else - false
    - bit 2 (mask: 0b0100) - is property configurable. if set - true, else - false
    - bit 3 (mask: 0b1000) - `access/data` descriptor flag. if set - `access`, else - `data`
    - w - property is writable
    - e - property is enumerable
    - c - property is configurable
    - a - access decriptor
<p>
\d+\n#<br> or string 'weca'
 */
exports.setProperty = function setProperty(obj, name, val, mask = 0) {
	const desc = {};

	if (typeof mask == 'string') {
		mask = mask.toLowerCase();
		mask = ['w', 'e', 'c', 'a'].reduce((yld, item, idx) => {
			return (yld |= (mask.indexOf(item) > -1 ? 1 : 0) << idx);
		}, 0);
	}

	if (mask & 0b1000) { // access descriptor
		if (!!val[0]) desc.get = val[0];
		if (!!val[1]) desc.set = val[1];
	} else { // data descriptor
		desc.value = val;
		desc.writable = !!(mask & 0b1);
	}
	desc.enumerable = !!(mask & 0b10);
	desc.configurable = !!(mask & 0b100);
	Object.defineProperty(obj, name, desc);
};

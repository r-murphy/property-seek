function boundary_to_dot(value) {
	return value.split('][').join('.').split('[').join('.');
}

function strip_braces(value) {
	return value.split('[').join('.').split(']').join('');
}

function escape_dots(value) {
	value = value.split('\'');
	return (value.length < 3) ? value.join('\'') : value.map(function(seg) {
		if (seg.length < 3) return seg;
		if ((seg[0] === '.') || (seg[seg.length - 1] === '.')) return seg;
		return seg.split('.').join('&&');
	}).join('');
}

function unescape_dots(value) {
	return value.split('&&').join('.');
}

function partify(value) {
	if (!value) return '';
	return escape_dots(strip_braces(boundary_to_dot('' + value))).split('.');
}

exports.get = function(o, path) {

	var parts = partify(path);
	if (parts.length === 1) return o[unescape_dots(parts[0])];
	if (parts.length === 0) return;

	var first = o[parts.shift()];

	return parts.reduce(function(target, prop) {
		if (!target) return target;
		return target[unescape_dots(prop)];
	}, first);
};

exports.set = function(obj, path, value) {
	var parts = partify(path);
	parts.reduce(function(target, prop, i) {
		prop = unescape_dots(prop);
		if (parts.length - 1 === i) {
			target[prop] = value;
		} else {
			target[prop] = target[prop] || {};
		}
		return target[prop];


	}, obj);

	return obj;
};

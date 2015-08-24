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

exports.get = function(o, path) {

	if (!path) return;

	var parts = escape_dots(strip_braces(boundary_to_dot('' + path))).split('.');

	if (parts.length === 1) return o[parts[0]];
	if (parts.length === 0) return;

	var first = o[parts.shift()];

	return parts.reduce(function(target, prop) {
		if (!target) return target;
		return target[unescape_dots(prop)];
	}, first);
};

exports.set = function (obj, path, value) {
  var segs = path.split('.');
  segs.reduce(function set(deep, seg, i) {
    return deep[seg] = segs.length - 1 === i ? deep[seg] = value : deep[seg] || {};
  }, obj);

  return obj;
};

import bind from 'function-bind'
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable)
var has = bind.call(Function.call, Object.prototype.hasOwnProperty)

export default function getValues(obj) {
	var vals = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			vals.push(obj[key]);
		}
	}
	return vals;
}
export default function transformMapToKeyedList(obj) {
	if (!obj) return []
	return Object.keys(obj).map(key => Object.assign({id:key}, obj[key]))
}

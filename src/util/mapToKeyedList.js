export default function transformMapToKeyedList(obj) {
	return Object.keys(obj).map(key => Object.assign({id:key}, obj[key]))
}

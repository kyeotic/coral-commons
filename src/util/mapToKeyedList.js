export default function transformMapToKeyedList(obj) {
	if (!obj) return []
	return Object.keys(obj).map(key => {
		if (typeof obj[key] !== 'object')
			return {id: key, value: obj[key]}
		else
			return Object.assign({id:key}, obj[key])
	})
}

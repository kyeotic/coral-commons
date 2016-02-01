function identity(t) {
	return t;
}

export default function createAction(type, actionCreator) {

	const finalActionCreator = typeof actionCreator === 'function'
	    ? actionCreator
	    : identity;

	return (...args) => {
		return {
			type,
			payload: finalActionCreator(...args)
		}
	};
}

export function autoAction(type, payload) {
	return { type, payload }
}
import alertify from 'alertify.js'

alertify.logPosition('bottom right')
		.closeLogOnClick(true)

export default {
	success(message, config = {}) {
		return alertify.success(message)
	},
	error(message, config = {}) {
		return alertify.error(message)
	}
}
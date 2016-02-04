import alertify from 'alertify.js'

export default function confirm(message, action) {
      return alertify.confirm(message)
      .then(function (prompt) {
            prompt.event.preventDefault()
            if (prompt.buttonClicked === 'ok')
                  action()
      })
}
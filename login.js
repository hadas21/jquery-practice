$(document).ready(() => {
	$('#hotel').hide();
	const state = {
		username: '',
		password: '',
		
	}

	function handleLoginSubmit() {
		$('#loginForm').on('submit', (e) => {
			e.preventDefault()

			let username = $('#username').val()
			let password = $('#password').val()

			if (username === 'sam' && password === '12345') {
				alert('Login successful')
                $('#login').hide();
				$('#hotel').show();
                $('#errorText').text =('');//Clear error message
				// Perform further actions for successful login
			} else {
                //$('#login').style.display ="none";
				showError(`Sorry username  ${username} can not be found. password${password} is invalid`)
			}
		})
	}
	function validateAndCheckout() {
		const name = document.getElementById('name').value
		const phone = document.getElementById('phone').value

		if (name.trim() === '') {
			alert('Please enter a name.')
		} else if (!validatePhoneNumber(phone)) {
			alert('Please enter a valid phone number in the format: 123-456-7890')
		} else {
			alert('Checkout successful!')
			showCheckoutFeature()
		}
	}

	function validatePhoneNumber(phoneNumber) {
		const pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
		return pattern.test(phoneNumber)
	}

	function showCheckoutFeature() {
		document.getElementById('order').style.display = 'none'
		document.getElementById('checkout').style.display = 'block'
	}

	function goBackToOrder() {
		document.getElementById('checkout').style.display = 'none'
		document.getElementById('order').style.display = 'block'
	}

	function showError(errorMessage) {
		$('#errorText').text(errorMessage)
	}

	handleLoginSubmit()

	function updateState(key, value) {
		state[key] = value
	}
})

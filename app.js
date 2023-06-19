let totalPrice = 120
let tip = 0.15
$(document).ready(() => {
	$('#hotel').hide()
	$('#checkout-section').hide()

	const state = {
		username: '',
		password: '',
	}
	let totalPrice = 0
	let orderSummary = {}
	let foodItemsObj = {
		kabob: {
			inStock: 6,
			price: 11.5,
			details: ['rice', 'salad', 'bread', 'yogurt'],
			image:
				'https://i.pinimg.com/originals/d3/19/0c/d3190c4558b7e3b8e8bb766fdbdb7bc6.jpg',
		},
		manto: {
			inStock: 3,
			price: 7.25,
			details: [],
			image:
				'https://static.wixstatic.com/media/166798_f13cc6d09d264f7caed6a72a6c590ff2~mv2_d_3024_3024_s_4_2.jpg',
		},
		kabuli: {
			inStock: 1,
			price: 16.8,
			details: ['salad', 'chilis', 'bread'],
			image:
				'http://2.bp.blogspot.com/-POwC-vJKwjE/Tp2gJ-7LWMI/AAAAAAAAJtE/Hm7p7RZ2h7Y/s1600/DSC_0081.JPG',
		},
		bolani: {
			inStock: 4,
			price: 4.5,
			details: ['chutney'],
			image:
				'https://www.larbrepersan.fr/wp-content/uploads/2021/10/Bolani-1024x767.jpg',
		},
		bamya: {
			inStock: 0,
			price: 12.0,
			details: ['chutney'],
			image:
				'https://tse3.mm.bing.net/th?id=OIP.8kWuxH_kKfCweB51ZwYmPgHaEK&pid=Api&P=0&h=180',
		},
		karahi: {
			inStock: 11,
			price: 15.5,
			details: ['rice', 'bread', 'yogurt'],
			image:
				'https://tse2.mm.bing.net/th?id=OIP.Ottjzswc6C0rpIRTmKJcLwHaEK&pid=Api&P=0&h=180',
		},
	}

	const $orderCount = $('<div></div>').text(`Total Price: ${totalPrice}`)
	$('#total-price').after($orderCount)

	function handleLoginSubmit() {
		$('#loginForm').on('submit', (e) => {
			e.preventDefault()

			let username = $('#username').val()
			let password = $('#password').val()

			if (username === 'sam' && password === '12345') {
				alert('Login successful')
				$('#login').hide()
				$('#hotel').show()
				$('#errorText').text('') // Clear error message
				// Perform further actions for successful login
			} else if (password === '12345') {
				showError(`Username ${username} is invalid.`)
			} else {
				showError(
					`  username is ${username} and the password  ${password} is invalid.`
				)
				if (username === 'sam') {
					showError(`Password is ${password}  invalid.`)
				} else {
					showError(
						`  username is ${username} but the password is ${password} is invalid.`
					)
				}
			}
		})
	}

	function showError(errorMessage) {
		$('#errorText').text(errorMessage)
	}

	handleLoginSubmit()

	function updateState(key, value) {
		state[key] = value
	}

	$('#showCheckoutSection').on('click', (event) => {
		alert('Welcome to checkout')
		$('#hotel').hide()
		$('#checkout-section').show()
	})
	$('#payNowButton').click(function () {
		const phoneNumberInput = $('#phone')
		const phoneNumber = phoneNumberInput.val()

		if (!phoneNumber.match(phoneNumberInput.attr('pattern'))) {
			alert('Please enter a phone number in the format: 123-45-678')
		} else {
			$('#payNowButton').submit() // Submit the form
		}
	})

	$('#payNowButton').on('click', (event) => {
		if ($('#name').val() === '' || $('#phone_number').val() === '') {
			alert('Please fill in all the required fields.')
		} else {
			// alert('Payment processed successfully!');
			$('#name').val('')
			$('#phone_number').val('')
		}
	})

	// Tips logic
	function calculateTotalPrice(tip) {
		let tenPercent = tip * 10
		let dividedTenPercent = tenPercent / 2
		let totalPrice = tenPercent + dividedTenPercent
		return totalPrice
	}

	totalPrice = totalPrice *= 1 + tip
	$('#goBackButton').click(function () {
		$('#checkout-section').hide() // Hide the checkout section
		$('#hotel').show() // Show the hotel section
	})

	// Initialize order summary
	Object.keys(foodItemsObj).forEach((objFoodItem) => {
		orderSummary[objFoodItem] = 0
	})

	// Function to update the order summary
	function updateOrderSummary() {
		$('#order-summary').empty() // Clear the order summary
		$('#order-summary').append('<h3>Order Summary</h3>')
		Object.keys(orderSummary).forEach((objFoodItem) => {
			const $orderItemId = `${objFoodItem}-order-summary`
			const $orderItem = $('<div></div>')
				.text(`${objFoodItem}: ${orderSummary[objFoodItem]}`)
				.attr('id', $orderItemId)
			$('#order-summary').append($orderItem)
		})
	}

	updateOrderSummary()

	Object.keys(foodItemsObj).forEach((objFoodItem) => {
		const $foodItemBox = $('<div></div>')
		const $foodCounter = $('<div></div>')
			.text(`${objFoodItem}`)
			.attr('id', `${objFoodItem}-food-counter`)
		const $foodPrice = $('<div></div>').text(
			`Price: $${foodItemsObj[objFoodItem].price.toFixed(2)}`
		)
		const $foodDetails = $('<div></div>').text(
			`Details: ${foodItemsObj[objFoodItem].details.join(', ')}`
		)
		const $foodImage = $('<img>')
			.attr('src', foodItemsObj[objFoodItem].image)
			.attr('alt', `${objFoodItem} image`)
			.addClass('foodImage side-of-row column')
		const $addButton = $('<button></button>')
			.addClass('addButton')
			.text('add')
			.on('click', () => {
				// If the item is available
				if (foodItemsObj[objFoodItem].inStock > 0) {
					orderSummary[objFoodItem]++ // Increment the count of the ordered item
					totalPrice += foodItemsObj[objFoodItem].price // Add the price of the selected food item
					$orderCount.text(`Total Price: ${totalPrice.toFixed(2)}`)
					updateOrderSummary() // Refresh the order summary
				} else {
					// Show an alert if the item is out of stock
					alert(`${objFoodItem} is out of stock!`)
				}
			})

		const $removeButton = $('<button></button>')
			.addClass('removeButton')
			.text('remove')
			.on('click', () => {
				// Prevent the foodItems from going into negative numbers when removing items
				if (orderSummary[objFoodItem] > 0) {
					orderSummary[objFoodItem]--
					totalPrice -= foodItemsObj[objFoodItem].price
					$orderCount.text(`Total Price: ${totalPrice.toFixed(2)}`)
					updateOrderSummary()
				} else {
					alert(`${objFoodItem} Nothing to be removed!`)
				}
			})

		$foodItemBox.append($foodCounter)
		$foodItemBox.append($foodImage)
		$foodItemBox.append($addButton)
		$foodItemBox.append($removeButton)

		$('#foodItemBox').append($foodItemBox)
	})
})

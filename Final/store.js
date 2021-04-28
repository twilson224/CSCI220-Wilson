
// Checks if the document is loading
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// runs the code even if the page is not loaded
function ready() {
    // removes  items from the cart
    var removeCartItemButtons = document.getElementsByClassName('btnDanger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // updates the cart when changing the quantity of an item
    var quantityInputs = document.getElementsByClassName('carQuantityInput')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // updates the cart with the clicked item
    var addToCartButtons = document.getElementsByClassName('shopItemButton')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // removes items from cart and alerts the user
    document.getElementsByClassName('btnPurchase')[0].addEventListener('click', purchaseClicked)
}

// alert the user of purchase and removes items from cart
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cartItems')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// Removes items from the cart
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// checks for a non number or if the number is less than 1
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// takes the details from the item and adds them to the cart
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shopItemTitle')[0].innerText
    var price = shopItem.getElementsByClassName('shopItemPrice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shopItemImage')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

// makes a new row in the cart
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cartRow')
    var cartItems = document.getElementsByClassName('cartItems')[0]
    var cartItemNames = cartItems.getElementsByClassName('cartItemTitle')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cartItem cartColumn">
            <img class="cartItemImage" src="${imageSrc}" width="100" height="100">
            <span class="cartItemTitle">${title}</span>
        </div>
        <span class="cartPrice cartColumn">${price}</span>
        <div class="cartQuantity cartColumn">
            <input class="carQuantityInput" type="number" value="1">
            <button class="btn btnDanger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btnDanger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('carQuantityInput')[0].addEventListener('change', quantityChanged)
}

// updates the cart to show subtotal
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cartItems')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cartRow')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cartPrice')[0]
        var quantityElement = cartRow.getElementsByClassName('carQuantityInput')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cartTotalPrice')[0].innerText = '$' + total
}
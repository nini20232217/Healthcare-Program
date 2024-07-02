/*loding page*/
if (document.readyState == "loading"    ) {
    document.addEventListener("DOMContentLoaded", start)
} else {
    start()
}
/*Main method, adds event listeners to all clickable/changable elements on page startup.*/
function start() {
		var  removeFromCart = document.getElementsByClassName("button_remove");	
	for (var i=0;i<removeFromCart.length;i++) {
		var button = removeFromCart[i]
		button.addEventListener("click" , removeItemFromCart)
		}
		var quantitySlider = document.getElementsByClassName("cart_item_quantity")
	for (var i=0;i<quantitySlider.length;i++) {
		var currentVal = quantitySlider[i]
		currentVal.addEventListener("change" , quantityChange)
	}
/*adding items to cart*/
	var addToCartButtons = document.getElementsByClassName("btn_add_to_cart")
	for (var i=0;i<addToCartButtons.length;i++) {
		var input = addToCartButtons[i]
		input.addEventListener("click" , addToCartClick )

	}
}
/* get information and store in variables and call to updatecart method*/
function addToCartClick(event) {
	document.getElementById("myDiv").style.display = "block";
    var button = event.target
    var shopItem = button.parentElement
    var productName = shopItem.getElementsByClassName("product_name")[0].innerHTML
    var productImgSrc = shopItem.getElementsByClassName("item_img")[0].src
    var productPrice  = shopItem.getElementsByClassName("product_price")[0].innerHTML
    addItemToCart(productName, productPrice , productImgSrc)
    updateCart()  
}
/*adding elements to the cart*/
function addItemToCart(productName, productPrice , productImgSrc) {
    var tbodyRef = document.getElementsByClassName("table_ref")[0].getElementsByClassName("cart_items")[0]
    var newRow = tbodyRef.insertRow(0)
    newRow.className = "cart_row"

    var cartProducts = document.getElementsByClassName("cart_items")[0]
    var cartProductNames =cartProducts.getElementsByClassName("cart_product_name")

    for (var i=0 ; i < cartProductNames.length; i++) {
        if (cartProductNames[i].innerText == productName) {
            alert("Item is already in cart")
            cartProducts.getElementsByClassName("cart_row")[0].remove()
            return
        }
    }
/*creating the structure of the cart*/
    var cellContent = `
        <td>
        <div class="cart_info"><img src="${productImgSrc}" alt=""></div>
        <div>
            <p class="cart_product_name">${productName}</p>
            <small>Price: </small>
            <small class="cart_item_price">${productPrice}</small>
            <br>
            <button class="button_remove">remove</button
        </div>
		</td>
		<td><input class="cart_item_quantity" type="number" value="1" ></td>
		<td class="product_sub_price">${productPrice}</td>
    `
/*creating the structure of the dart row*/
    newRow.innerHTML = cellContent
 
    newRow.getElementsByClassName("button_remove")[0].addEventListener("click" , removeItemFromCart)
    newRow.getElementsByClassName("cart_item_quantity")[0].addEventListener("click" , quantityChange)
}
/*quantity changing*/
function quantityChange(event) {
        var currentVal = event.target
        if (isNaN(currentVal.value) || currentVal.value <= 0) {
            currentVal.value  = 1;
        } 
        updateCart()
}
/*removing items*/
function removeItemFromCart(event) {   
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCart()
 

}

function updateCart() {
    var cartItemCont = document.getElementsByClassName("cart_items")[0]
    var cartRows = cartItemCont.getElementsByClassName("cart_row")
    var totalCost = 0

for (var i=0;i<cartRows.length;i++) {
    var cartRow = cartRows[i]
    var priceEle = cartRow.getElementsByClassName("cart_item_price")[0]
    var quantityEle = cartRow.getElementsByClassName("cart_item_quantity")[0]
    var subTotalEle = cartRow.getElementsByClassName("product_sub_price")[0]
    var price = parseFloat(priceEle.innerHTML.replace("Rs." , ""))
    var quantity = quantityEle.value
    totalCost += (price * quantity)
    subTotalEle.innerHTML = "Rs." + price*quantity
}
document.getElementsByClassName("cart_total_price")[0].innerHTML = "Rs." + totalCost;
}

// get element by user input from the form.
const form = document.getElementsByClassName("formin")[0]
const fName = document.getElementById("fName")
const lName = document.getElementById("lName")
const telephone = document.getElementById("telephone")
const address = document.getElementById("address")
const country = document.getElementById("country")
const email = document.getElementById("email")

function emptyCart() { 
    var itemsInCart = document.getElementsByClassName("button_remove")
    console.log(itemsInCart)
    for (var i=0; i<itemsInCart.length;i++) {
    console.log(itemsInCart[i])
       itemsInCart[i].parentElement.parentElement.parentElement.remove()
       
    }
    if (itemsInCart.length>0) {
        itemsInCart[0].parentElement.parentElement.parentElement.remove()
    }
    updateCart()
    console.log(itemsInCart)
}

form.addEventListener("reset" , emptyCart)

form.addEventListener("submit" , (e) => {
    e.preventDefault()
    let messages = []
    if (fName.value === "" || fName.value == null) {
        messages.push('First name is required.')
    }
    if (lName.value === "" || lName.value == null) {
        messages.push('Last name is required.')
    }
	if (telephone.value === "" || telephone.value == null) {
        messages.push('Phone number is required.')
    }
	if (address.value === "" || address.value == null) {
        messages.push('Address is required.')
    }
	if (country.value === "" || country.value == null) {
        messages.push('Country is required.')
    }
    if (email.value === "" || email.value == null) {
        messages.push('Email is required.')
    }
    

    e.preventDefault()
    
    var productLister = document.getElementsByClassName("cart_product_name")
    
    var productString = ""
    for (var i=0 ; i < productLister.length ; i++) {
        productString += `Product ${i+1} : ${productLister[i].innerText}. \n`

    }
    var totalCost = document.getElementsByClassName("cart_total_price")[0].innerText
    
    
    
    if (totalCost == "Rs.0" ) {
        messages.push('Cart is empty.')
    }
    console.log(messages)
    if (messages.length > 0) {

        var text = ""
        for (var i=0 ; i < messages.length ; i++) {
            text += messages[i] + "\n"

        }
        alert(text) 
    }
    else {
        alert("Hello" + " " +fName.value + " " + lName.value + "!\n" +
        "\nEmail: " + email.value +
        "\nTo Purchase selected items press ok!" +
        "\n--------------------------\n" + productString +
        "\nTotal Cost = " + totalCost +
        "\n\nThank you")
        setTimeout(() => {  console.log(""); }, 2000);
        location.reload();
    } 
})

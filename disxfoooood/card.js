// Load cart from localStorage or initialize as empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add items to the cart
function addToCart(productName, basePrice, baseProtein, baseCarb, baseFat, baseCalories, weight) {
  const weightInGrams = parseInt(weight.replace('g', '')) / 100; // Convert weight to a multiplier
  const price = basePrice * weightInGrams;
  const protein = baseProtein * weightInGrams;
  const carb = baseCarb * weightInGrams;
  const fat = baseFat * weightInGrams;
  const calories = baseCalories * weightInGrams;

  const item = cart.find(item => item.name === productName && item.weight === weight);
  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(price),
      quantity: 1,
      protein: parseFloat(protein),
      carb: parseFloat(carb),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
      weight: weight
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
  updateCart();
}

// Function to remove items from the cart
function removeFromCart(productName, weight) {
  const itemIndex = cart.findIndex(item => item.name === productName && item.weight === weight);

  if (itemIndex > -1) {
    cart.splice(itemIndex, 1); // Remove the item from the cart
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  updateCart();
}

// Function to update cart display and totals
// Function to update cart display and totals
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalContainer = document.getElementById('total');
  const totalProteinContainer = document.getElementById('totalProtein');
  const totalCarbContainer = document.getElementById('totalCarb');
  const totalFatContainer = document.getElementById('totalFat');
  const totalCaloriesContainer = document.getElementById('totalCalories');
  const deliveryChargeContainer = document.getElementById('deliveryCharge'); // Delivery charge container

  // Reset the container
  cartItemsContainer.innerHTML = '';

  let total = 0;
  let totalProtein = 0, totalCarb = 0, totalFat = 0, totalCalories = 0;

  cart.forEach(item => {
    // Create cart item display
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <span>${item.name} (${item.weight}) - ${item.price.toFixed(2)} dt x ${item.quantity}</span>
      <button onclick="removeFromCart('${item.name}', '${item.weight}')">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);

    // Calculate totals
    total += item.price * item.quantity;
    totalProtein += item.protein * item.quantity;
    totalCarb += item.carb * item.quantity;
    totalFat += item.fat * item.quantity;
    totalCalories += item.calories * item.quantity;
  });

  // Add the delivery charge (4 DT)
  const deliveryCharge = 4;
  total += deliveryCharge;

  // Update the delivery charge display
  deliveryChargeContainer.textContent = deliveryCharge.toFixed(2);

  // Update totals on the page
  totalContainer.textContent = total.toFixed(2);
  totalProteinContainer.textContent = totalProtein.toFixed(2);
  totalCarbContainer.textContent = totalCarb.toFixed(2);
  totalFatContainer.textContent = totalFat.toFixed(2);
  totalCaloriesContainer.textContent = totalCalories.toFixed(2);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCounter(action, counterId) {
  const counterElement = document.getElementById(counterId);
  let currentValue = parseInt(counterElement.innerText.replace('g', ''));

  if (action === 'increase') {
    currentValue += 50;
  } else if (action === 'decrease' && currentValue > 50) {
    currentValue -= 50;
  }


  counterElement.innerText = `${currentValue}g`;
}

function updateCounters(action, countersId) {
  const countersElement = document.getElementById(countersId);
  let currentValue = parseInt(countersElement.innerText.replace('', ''));

  if (action === 'increase') {
    currentValue += 1;
  } else if (action === 'decrease' && currentValue > 1) {
    currentValue -= 1;
  }


  countersElement.innerText = `${currentValue}`;
}

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}






// Update the cart display on page load
updateCart();

























document.getElementById("contactForm").addEventListener("submit", prepareCartDetails);

function prepareCartDetails(event) {
    event.preventDefault();  // Prevent the form from submitting immediately

    const cartDetails = [];
    let totalPrice = 0;

    // Loop through each item in the cart and collect its details
    cart.forEach(item => {
        cartDetails.push(`${item.name} (${item.weight}): ${item.price.toFixed(2)} dt x ${item.quantity}`);
        totalPrice += item.price * item.quantity;
    });

    // Add delivery charge to the total price
    const deliveryCharge = 4;
    totalPrice += deliveryCharge;

    // Set the cart details and total price to the form fields
    document.getElementById('cartDetails').value = cartDetails.join("\n");
    document.getElementById('totalPrice').value = totalPrice.toFixed(2);

    // Now submit the form
    document.getElementById("contactForm").submit();
}






let btnMenu = document.getElementById('btn-menu');
let Menu = document.querySelector('.nav-links');
btnMenu.onclick = function(){
    btnMenu.classList.toggle('fa-times');
    Menu.classList.toggle('active')
    
}

let header = document.querySelector('header');

window.onscroll = function(){
    if(this.scrollY >= 100){
        header.classList.add('active')
        
    }
    else{
        header.classList.remove('active')
        
    }
    btnMenu.classList.remove('fa-times')
    Menu.classList.remove('active')
}



function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("show");
}




function toggleParagraph(button) {
  const paragraph = button.nextElementSibling;
  const card = button.closest('.card'); // Find the closest card element

  if (paragraph.style.display === "block") {
      paragraph.style.display = "none";
      card.style.height = ""; // Reset the height to default
      button.textContent = "عرض المزيد";
  } else {
      paragraph.style.display = "block";
      card.style.height = "auto"; // Set the height to 550px
      button.textContent = "عرض أقل";
  }
}

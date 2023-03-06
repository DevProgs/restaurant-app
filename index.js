import { menuArray } from './data.js';
const cart = document.querySelector('.checkout-details');
const checkoutSection = document.querySelector('.checkout')
const checkoutHeading = document.querySelector('.checkout-heading')
const totalSection = document.querySelector('.total-div');
const totalHeader = document.querySelector('.total-header');
const divider = document.querySelector('.checkout-divider')
const orderBtn = document.querySelector('.order-btn');
const modal = document.querySelector('.modal')
const modalCheckOut = document.querySelector('.modal-checkout');
const orderComplete = document.querySelector('.order-complete')
const orderCompleteText = document.querySelector('.order-complete-text')
let cartArray = []



document.addEventListener('click', (e) => {
  if (e.target.dataset.pizza) {
    createCartArray(e.target.dataset.pizza);
  } else if (e.target.dataset.beer) {
    createCartArray(e.target.dataset.beer)
  } else if (e.target.dataset.hamburger) {
    createCartArray(e.target.dataset.hamburger)
  } else if (e.target.dataset.index) {
    removeFromCart(e.target.dataset.index);
  } else if (e.target.dataset.order) {
    modal.style.display = 'block';
  } else if (e.target.dataset.close) {
    modal.style.display = 'none';
  } 
})


const getMenuItems = () => {
  let menuHTML = ''
  menuArray.forEach((item, index) => {
    menuHTML += `
      <section class="menu">
        <img class="menu-img" src="./images/${item.name}.png" alt="${
      item.name}">
        <div class="menu-item">
            <h2 class="item">${item.name}</h2>
            <p class="item-options">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <button class="menu-add" data-${item.name.toLowerCase()}=${item.id}>
                  <i class="fa-solid fa-plus" data-${item.name.toLowerCase()}=${
      item.id
    }></i>
                </button>

            </section>
            <div class="divider"></div>
    `;
  })
  return menuHTML
}


const createCartArray = (order) => {
  const selectedItem = menuArray.filter((item) => {
    return item.id == order
  })[0]
  cartArray.push(selectedItem)
  updateCart(cartArray)
}

const updateCart = () => {
  const totalPriceArr = []
  let cartHTML = ''
  let totalHTML = ''
  if (cartArray.length > 0) {
    checkoutHeading.style.display = 'block';
    totalHeader.style.display = 'block'
    totalSection.style.display = 'block'
    divider.style.display = 'block'
    orderBtn.style.display = 'block'
    orderComplete.style.display = 'none'
  }  else {
    checkoutHeading.style.display = 'none'
    totalHeader.style.display = 'none'
    totalSection.style.display = 'none';
    divider.style.display = 'none'
    orderBtn.style.display = 'none'
  }
  cartArray.forEach((item, index) => {
    cartHTML += `
      <div class="checkout-cart">
          <p class="checkout-item">${item.name}</p>
          <button data-index="${index}"class="checkout-remove">remove</button>
          <p class="checkout-item-price">$${item.price}</p>
      </div>
    `;
    totalPriceArr.push(item.price);
  })
  const total = totalPriceArr.reduce((acc, value) => {
    return acc + value;
  }, 0);
  totalHTML += `
  <p class="total-price">$${total}</p
  `;
  cart.innerHTML = cartHTML
  totalSection.innerHTML = totalHTML
}

const removeFromCart = (orderID) => {
  const selectedItem = cartArray.filter((item, index) => {
    return index === orderID
  })
  cartArray.splice(orderID, 1);
  updateCart()
}

modalCheckOut.addEventListener('submit', (e) => {
  e.preventDefault()
  const cardDetailsForm = new FormData(modalCheckOut);
  const fullName = cardDetailsForm.get('fullName');

  // reset display property for these sections
  checkoutSection.style.display = ''
  totalSection.style.display = ''
  totalHeader.style.display = '';
  orderBtn.style.display = '';
  modal.style.display = ''
  checkoutHeading.style.display = '';
  cart.innerHTML = ''
  totalSection.innerHTML = ''
  orderComplete.style.display = ''
  divider.style.display = ''
  modalCheckOut.reset()
  cartArray = []
  orderComplete.style.display = 'block'
  orderCompleteText.textContent = `Thanks, ${fullName}!  Your order is on the way!`;
})

const render = () => {
  document.querySelector('.mobile-menu').innerHTML = getMenuItems();
}
render()

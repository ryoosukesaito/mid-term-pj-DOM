// show and hide the cart
const darken = document.getElementsByClassName('.darken');



<<<<<<< HEAD
=======
  cartInfo.addEventListener('click', function(){
    cart.classList.toggle('show-cart');
    // darken.classList.show('dark');
    cart.style.transition = "all ease-out 0.5s";
    cart.style.right = "0";
    emptyCart()

    close.addEventListener('click', function() {
      cart.style.right = "-100%";
      cart.style.transition = "all ease-out 1.5s"
      cart.classList.remove('show-cart');
      // darken.classList.remove('dark');
    })

  })
  
})();

function openDark(){
  darken.style.visibility = "visible";
};

function hideDark(){
  darken.style.visibility = "";
}

// cart end

>>>>>>> 83a3f8213b0c4f69134725e8f02e742e0c45bb2e


//input data form api
const productEl = document.querySelector("#row");
const cartItemsEl = document.querySelector(".cart-contents");
const subtotalItemsEl = document.querySelector(".total-title");
const subtotalPriceEl = document.querySelector(".total-price");
const totalItemInCartEl = document.querySelector(".cart-count");


//READ PRODUCTS
function renderProducts (){
  products.forEach((product) => {
    productEl.innerHTML += `
    <div id="template">
    <div class="product">
      <a href="#" class="img-prod">
        <img class="product-img" src="product.jpg" alt="perfume"> 
      </a>

      <div class="item-text">
        <h2>
          <a href="#" class="item-name">
            ${product.title}
          </a>
        </h2>
        <p class="price">$ ${product.price}</p>
      </div>

      <div id="shop-icon">

        <div class="icon-li">
          <div class="add-cart" onclick="addToCart(${product.id})" style="cursor: pointer;">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
        </div>


        <div class="icon-li">
          <div class="add-wish" style="cursor: pointer;">
            <i onclick="toggle(${product.id})" id="btn1" class="far fa-heart"></i>
          </div>
        </div>

      </div>

    </div>
  </div>
    `
  })
}
renderProducts();

//cart Array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updataCart();



//check if carts empty
function emptyCart() {
  const inCart = document.querySelector(".cart-contents");
  console.log(cart);
  if(cart.length === 0){
    
    inCart.innerHTML = `
    <div class="empty-txt"><p>You have no items in your basket</p></div>
    `
  }
}

// ADD TO CART
function addToCart(id){
  //check if product already excist in cart
  openCart();
  if(cart.some((item) => item.id === id)){
    // alert(" Product already in cart!")
    changeNumberOfUnits("plus",id);
  }else{
    const item = products.find((product) => product.id === id)
  
    cart.push({
      ...item,
      numberOfUnits : 1,
    });
    console.log(cart);
  }

  updataCart();
}

//updata Cart
function updataCart(){
  renderCartItems();
  renderSubtotal();

  //save cart to local strage
  localStorage.setItem("CART",JSON.stringify(cart));
}

//calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) =>{
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalItemsEl.innerHTML = `Total  ( ${totalItems} items):` ;
  subtotalPriceEl.innerHTML = `$ ${totalPrice.toFixed(2)}`;
  totalItemInCartEl.innerHTML = ` ${totalItems} `;

}


//render Cart items
function renderCartItems() {
  //clear cart element
  cartItemsEl.innerHTML = ""; 

  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-box">
        <img src="product.jpg" alt="cart-img">
        <div class="detail-box">
          <div class="cart-product-title"><p>${item.title}</p></div>
          <div class="cart-price"><p>$ ${item.price}</p></div>

          <div id="units">
            <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
          </div>

        </div> 
          <div onclick="removeItemFromCart(${item.id})">
          <i class="cart-remove fa-solid fa-trash"></i>
          </div>
      </div>
    `
  })
}

//remove item from cart
function removeItemFromCart(id){
  cart = cart.filter((item) => item.id !== id)

  updataCart();
  emptyCart();
}

//change numbers of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {

    let numberOfUnits =item.numberOfUnits;

    if(item.id === id){
      if(action === "minus" && numberOfUnits > 1){
        numberOfUnits--;
      }else if(action === "plus" && numberOfUnits < item.rating.count){
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });

  updataCart();
}




//heart button
var btn1 = document.getElementById("btn1");

btn1.addEventListener('click',
  // checkIdOfheart(),
  toggle()

);



function toggle(id){
  console.log(id);

  if(btn1.classList.contains("far")){
      btn1.classList.remove("far");
      btn1.classList.add("fas"); 
  }else{
      btn1.classList.remove("fas");
      btn1.classList.add("far");
  }
}


const cartInfo = document.getElementById('cart-button');
const incart = document.getElementById('cart-inside');
const close = document.getElementById('close');

close.addEventListener('click', function() {
  incart.style.right = "-100%";
  incart.style.transition = "all ease-out 1.5s"
  incart.classList.remove('show-cart');
})

cartInfo.addEventListener('click', function(){
  incart.classList.toggle('show-cart');
  incart.style.transition = "all ease-out 0.5s";
  incart.style.right = "0";
  emptyCart()
})

// (function showAndHideCart() {

//   cartInfo.addEventListener('click', function(){
//     incart.classList.toggle('show-cart');
//     incart.style.transition = "all ease-out 0.5s";
//     incart.style.right = "0";
//     emptyCart()
    
//     close.addEventListener('click', function() {
//       incart.style.right = "-100%";
//       incart.style.transition = "all ease-out 1.5s"
//       incart.classList.remove('show-cart');
//     })
    
//   })
// })();

function openCart() {
  incart.classList.toggle('show-cart');
  incart.style.transition = "all ease-out 0.5s";
  incart.style.right = "0";
  emptyCart()
  
}

function closeCart() {
  incart.style.right = "-100%";
  incart.style.transition = "all ease-out 1.5s"
  incart.classList.remove('show-cart');
  
}

// cart end

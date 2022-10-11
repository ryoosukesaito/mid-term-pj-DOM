
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
        <img class="product-img" src="${product.image}" alt="perfume"> 
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
          <div class="add-cart" onclick="loadBg(${product.id})" style="cursor: pointer;">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
        </div>


        <div class="icon-li">
          <div class="add-wish" style="cursor: pointer;">
            <i id="btn1" class="far fa-heart"></i>
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
  if(cart.some((item) => item.id === id)){
    // alert(" Product already in cart!")


    cartNumAnimation();
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
        <img src="${item.image}" alt="cart-img">
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
document.addEventListener('DOMContentLoaded',function(){
  var btns = document.querySelectorAll('#btn1');
  for( var i = 0;i < btns.length; i++ ){
    btns[i].addEventListener('click',function(){
      
      if(this.classList.contains("far")){
        this.classList.remove("far");
        this.classList.add("fas"); 
      }else{
        this.classList.remove("fas");
        this.classList.add("far");
      }
      
    },false );
  }
},false);


// show and hide the cart

const addContents = document.getElementById('addContents');
const cartInfo = document.getElementById('cart-button');
const incart = document.getElementById('cart-inside');
const close = document.getElementById('close');



close.addEventListener('click', function() {
  incart.style.right = "-100%";
  incart.style.transition = "all ease-out 1.5s"
  incart.classList.remove('show-cart');
  addContents.style.right = "-100%";
  hideDark()
})

cartInfo.addEventListener('click', function(){
  incart.classList.toggle('show-cart');
  incart.style.transition = "all ease-out 0.5s";
  incart.style.right = "0";
  emptyCart()
  addContents.style.right = "0";
  openDark()
})

function openCart() {
  incart.classList.toggle('show-cart');
  incart.style.transition = "all ease-out 0.5s";
  incart.style.right = "0";
  emptyCart();
  
  // setTimeout(openDark,2000);
};

function closeCart() {
  incart.style.right = "-100%";
  incart.style.transition = "all ease-out 1.5s"
  incart.classList.remove('show-cart');
  hideDark();
};

// cart end


// show and hide the cart

const darken = document.getElementById("darken");

function openDark(){
  darken.style.visibility = " visible ";
  addContents.style.visibility = "visible";
  addContents.style.display = "flex";
  darken.style.display = "block";
};

function hideDark(){
  darken.style.visibility = "hidden";
  addContents.style.visibility = "hidden";

};

// show and hide the cart end


//animetion of deleting items
const bg = document.querySelector(".bg");
let timeId;


function loadBg(id) {
  bg.style.display = "flex";
  timeId = setTimeout(function (){
    closeSpin(id)
    console.log(id); 
  } , 1100);
}

function closeSpin(id) {
  bg.style.display = "none";
  clearTimeout(timeId)
  addToCart(id)
}
//End of animetion of deleting items

//item number's animation after add the item to cart

function cartNumAnimation(){
  totalItemInCartEl.style.animation = "cartNumAnimation .7s";
}


// sign up
function openForm() {
  document.getElementById("sign").style.display = "block";
  
}

function closeForm() {
  document.getElementById("sign").style.display = "none";
}
// end
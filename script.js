// show the cart


// var heart = document.getElementById("heart");

// function toggle(){
//   if(heart.classList.contains("far")){
//     heart.classList.remove("far");
//     heart.classList.add("fas");
//   }else{
//     heart.classList.remove("fas");
//     heart.classList.add("far"); 
//   }
// };


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
          <div class="add-cart" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
        </div>


        <div class="icon-li">
          <div class="add-wish">
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

// ADD TO CART
function addToCart(id){
  //check if product already excist in cart
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
  cartItemsEl.innerHTML = ""; //clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-box">
        <img src="" alt="cart-img">
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





var btn1 = document.getElementById("btn1");

btn1.addEventListener('click',
  function toggle(id){
      if(id.isTrusted == true && btn1.classList.contains("far")){
          btn1.classList.remove("far");
          btn1.classList.add("fas"); 
      }else{
          btn1.classList.remove("fas");
          btn1.classList.add("far");
      }
    }
);
// show the cart

(function(){
    const showCart = document.getElementsByClassName(".cart");
    const shoppingCart = document.getElementsByClassName(".shopping-cart");

    showCart.addEventListner("click", function() {
        shoppingCart.classList.toggle("showCart");
    });
})();


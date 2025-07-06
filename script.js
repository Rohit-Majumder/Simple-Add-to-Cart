let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
const cartItems =  document.getElementById('cart-items');
let cartTotal = document.getElementById('cartTotal');
const buyNowBuuton = document.getElementById('buyNow');

const addToCart = document.querySelectorAll('.addToCart');

addToCart.forEach(button =>{
    button.addEventListener('click',()=>{
      const productName =  button.getAttribute('pro-name');
      const productPrice = parseFloat(button.getAttribute('pro-price'));

    const existingProduct = cart.find(product => product.name === productName);

    if(existingProduct){
        existingProduct.quantity += 1;
    }
    else{
        cart.push({
            name: productName,
            price: productPrice,
            quantity:1 
        })
    }
    totalPrice += productPrice;

    localStorage.setItem('cart',JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    CartDisplay();
})
})

const CartDisplay = ()=> {
    cartItems.innerHTML='';
    cart.forEach((product,index) => {
     const li=   document.createElement('li');
     li.innerHTML=`
     ${product.name} - ${product.price} x ${product.quantity} <button class="btn btn-danger mb-3 remove" data-index='${index}'> Remove </button>
     `
     cartItems.appendChild(li);

    })
    cartTotal.innerText= ` Total price = $ ${totalPrice.toFixed(2)}`;

   const removeButton =  document.querySelectorAll('.remove');
   removeButton.forEach(button =>{
    button.addEventListener('click',()=>{
  const index = button.getAttribute('data-index');
  RemoveCart(index);

    })
   })
}

const RemoveCart = (index) =>{
   const product = cart[index];
   product.quantity = (product.quantity -1);
  totalPrice = product.price * product.quantity;

  if(product.quantity == 0){
    cart.splice(index,1);
  }
 
 CartDisplay();
  localStorage.setItem('cart',JSON.stringify(cart));
   localStorage.setItem('totalPrice', totalPrice.toFixed(2));
  
}

buyNowBuuton.addEventListener('click',()=>{
    if(cart.length > 0){
        alert('thankyou for your purchase');
        cart = [];  
        totalPrice=0;
        localStorage.removeItem('cart');
        localStorage.removeItem('totalPrice');
        CartDisplay();
    }
    else{
       alert('Your cart is empty');
    }
})

localStorage.clear();
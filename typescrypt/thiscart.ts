let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let amount_due =document.querySelector("#amount_due")
//@ts-ignore
let basket = JSON.parse(localStorage.getItem("data")) || [];
//@ts-ignore
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
//@ts-ignore
let generateCartItems = () => {
  //@ts-ignore
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      //@ts-ignore
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        //@ts-ignore
        return{} `
      <table>
      
  <tr>
    <th>Image</th>
    <th>Name</th>
    <th>Quantity</th>
    <th>Price</th>
  </tr>
  <tr>

  
    <td><img width="100" src="${search.images}" alt="" /></td>
    <td> ${search.name} </td>
    <td> <div class="buttons">
    <p onclick="decrement(${id})" class="bi bi-dash-lg">-</p>
    <div id=${id} class="quantity">${item}</div>
    <p onclick="increment(${id})" class="bi bi-plus-lg">+</p>
</div>
 </td>
 <td>

 <p class="cart-item-price">R${search.price}</p>
 </td>
  </tr>
        
      
              <p onclick="removeItem(${id})" class="bi bi-x-lg">Remove</p>
          </div>

         

          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h1>Empty cart</h1>
    
    `;
  }
};

generateCartItems();
//@ts-ignore
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
//@ts-ignore
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
//@ts-ignore
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
//@ts-ignore
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    amount_due.innerHTML =`    <h2>Amount due : R${amount}</h2>`
    label.innerHTML = `

    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();
module.exports = increment;
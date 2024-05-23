let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
const categories = [...new Set(shopItemsData.map((product) => {return product}))]
var inputProducts = document.querySelector("#input_products")
inputProducts.addEventListener('keyup', (e) =>{
    const search = e.target.value.toLowerCase()
    const filter = categories.filter((product) => {
        return(
            product.name.toLocaleLowerCase().includes(search)
        )
    })
    generateShop(filter)
})
let generateShop = (prods) => {
 /* return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, images, name, price ,quantity} = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img src=${images}>
        <div class="details">
          <h3>${name}</h3>
         
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
              <p onclick="decrement(${id})" class="bi bi-dash-lg">-</p>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <p onclick="increment(${id})" class="bi bi-plus-lg">+</p>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));*/
    return shop.innerHTML = prods
      .map((x) => {
        let { id, images, name, price ,quantity} = x;
        let search = basket.find((x) => x.id === id) || [];
    return (`<section id ="product-id-${id}" class="item">
    <img src="${images}"></img>
    <br>
    <p>
    ${name}
    </p>
    
  <p>R${price}</p>
    <hr>
    <div class="buttons_hide">
    <p onclick="decrement(${id})" class="bi bi-dash-lg">-</p>
    <div id=${id} class="quantity">
    ${search.item === undefined ? 0 : search.item}
    </div>
    <p onclick ="increment(${id})" class="bi bi-plus-lg">+</p>
  </div>
    <button onclick ="click_button(${id})" class="yellow">Add to cart</button>
    
    </section>`)}).join("")
};

generateShop(categories);

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

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
function click_button(id){
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

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
}
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
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
  //TOGGLING
  var nav = document.querySelector("#nav")
  var second = document.querySelector(".second")
 let cover = document.querySelector(".cover")
 let button = document.querySelector(".item")
 function Toggle(){
     
     nav.classList.add("active")
 
 
 if(screen.width <= 500){
     cover.style.display = "none"
     button.style.visibility ="hidden"
 }else{
     cover.style.display = "grid"
 }
 }
 function Close(){
     nav.classList.remove("active")
     cover.style.display = "grid"
 }
 //TOGGLING END

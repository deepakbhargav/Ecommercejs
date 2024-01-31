
let bagItems;

onLoad();

function onLoad() {
  let bagItemsStr=localStorage.getItem('bagitem');
  bagItems=bagItemsStr ? JSON.parse(bagItemsStr) : [];
itemDisplay();
ShowbagCount();
}

//function- push data into bagItems and after that display count in bag icon
function addTobag(itemId) {
  bagItems.push(itemId);
  ShowbagCount();
}
//show count in bag icon
function ShowbagCount() {
  let bag_count=document.querySelector(".bag-item-count");
  localStorage.setItem("bagitem",JSON.stringify(bagItems));
  if(bagItems.length > 0) {
    bag_count.style.visibility='visible';
    bag_count.innerText=bagItems.length;
  }

  else {
    bag_count.style.visibility='hidden';
  }
}

//show data on display
function itemDisplay() {
  let items_container=document.querySelector(".items_container");
  
 if(!items_container) {
  return;
 }
  let innerHtml="";
  items.forEach(item=>{
    innerHtml+=` <div class="item_container">
    <div class="item_image">
      <img class="_image" src="../${item.image_name}" alt="" />
    </div>
    <div class="company_name">${item. company_name}</div>
    <div class="item_name">${item.item_name}</div>
    <div class="rating">
      <span class="item_rating">⭐${item.rating.stars}|</span>
      <span class="item_reviews">${item.rating.noOfReviews}</span>
    </div>
    <div class="price">
      <span class="current_price"> ₹ ${item.current_price}</span>
      <span class="original_price"> ₹${item.original_price}</span>
      <span class="item_off">(${item.item_off}%Off)</span>
    </div>
    <button onclick="addTobag(${item.id})" class="btn_class">Order Now</button>
  </div>
`
  })
items_container.innerHTML=innerHtml;
}
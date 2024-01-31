let newdata;
onLoad();

function onLoad() {
  getData();
  showOndisplay();
  totalAmount()
}

function getData() {
  console.log(bagItems)
 newdata= bagItems.map((item)=>{
  for(let i=0;i<items.length;i++) {
    if(item==items[i].id) {
      return items[i];
    }
  }
 })
 totalAmount();
}

function showOndisplay() {
  let bag_left_container=document.querySelector(".bag_left_container");
  let innerHtml="";
  newdata.forEach(item=>{
    innerHtml+=generateCode(item)
  })
  bag_left_container.innerHTML=innerHtml

}

function deleteItem(id) {
  console.log(bagItems)
  bagItems=bagItems.filter((itemId)=>{
    return itemId!=id;
  })
  localStorage.setItem('bagitem',JSON.stringify(bagItems));
  getData();
  ShowbagCount()
  showOndisplay();
}



function totalAmount() {
  let totalItem=newdata.length;
  let totalMRP=0;
  let totalDiscount=0;
  
  let constConveniencefee=99;

  for(let i=0;i<newdata.length;i++) {
    totalMRP+=newdata[i].original_price
    totalDiscount+=newdata[i].original_price-newdata[i].current_price
  }

  let totalAmount=totalMRP-totalDiscount;
  let bag_right_container=document.querySelector(".bag_right_container");
  bag_right_container.innerHTML=`<div class="right_container">
  <div class="price_details">price details(${totalItem}items)</div>
<div class="total_mrp">
  <span>Total MRP</span>
  <span>Rs ${totalMRP}</span>
</div>
<div class="discount">
  <span>Discount On MRP</span>
  <span class="discount_price">-Rs${totalDiscount}</span>
</div>
<div class="convenience">
  <span>Convenience Fee</span>
  <span>Rs${constConveniencefee}</span>
</div>
<hr />
<div class="total_amount">
  <span>Total Amount</span>
  <span>Rs ${totalAmount}</span>
</div>
<button class="place_order">Place Order</button>
</div>`
}


function generateCode(item) {
return `<div class="img">
<img class="bag_image" src="../${item.image_name}" alt="" />
</div>
<div class="left_content">
<div class="company_name">${item.company_name}</div>
<div class="item_name">${item.item_name}</div>
<div class="rating">
  <span class="item_rating">⭐${item.rating.stars}|</span>
  <span class="item_reviews">${item.rating.noOfReviews}</span>
</div>
<div class="price">
  <span class="current_price"> ₹${item.current_price}</span>
  <span class="original_price"> ₹${item.original_price}</span>
  <span class="item_off">(${item.item_off}%Off)</span>
</div>
<div class="return_policy">${item.return_policy}</div>
<div class="delivery">${item.delivery}</div>
</div>
<div class="cross_button">
<i onclick='deleteItem(${item.id})' class="fa-solid fa-xmark cross_big"></i>
</div> `
}

 
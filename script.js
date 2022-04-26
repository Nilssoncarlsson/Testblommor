/* uppdaterar korg */
updateCartTotal();

/* button events */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* Lägg till i korg-funktioner */

function addToCart(elem) {
    //init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    
    //cyklar syskon för produktinfo nära lägg till knappen
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }//Push lägger till ett eller flera element i slutet av en array och returnerar den nya längden på matrisen.
        sibs.push(elem);
    }
    //skapar produkt objekt
    var product = {
        productname : getproductName,
        price : getprice
    };
    
    //konverterar produktdata till JSON för lagring
    var stringProduct = JSON.stringify(product);
    /*skickar produktdata till lagring */
    
    if(!sessionStorage.getItem('cart')){
        
        //lägger till  produkt JSON-objekt till vagn-array
        cart.push(stringProduct);
        //cart till JSON
        stringCart = JSON.stringify(cart);
        //skapar session lagring vagn objekt
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        
        //tar existerande korgdata från lagring och konverterar tillbaka till array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append ny produktt JSON object
        cart.push(stringProduct);
        //korg tillbaka till JSON
        stringCart = JSON.stringify(cart);
        
        //överskriver korgdata i sessionslagringen
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Räknar ut korg totalen */
function updateCartTotal(){
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //Få vagnsdata och analysera array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //Få ingen av artiklar i kundvagnen
        items = cart.length;
        //loopa över korg-array
        for (var i = 0; i < items; i++){
            //konvertera varje JSON -produkt i matrisen tillbaka till objekt
            var x = JSON.parse(cart[i]);
            //få property value av priset
            price = parseFloat(x.price.split('kr')[1]);
            productname = x.productname;
            //lägger till pris till total
            carttable += "<tr><td>" + productname + "</td><td>kr" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //uppdaterar total i HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //lägger till sparad produkt till table
    document.getElementById("carttable").innerHTML = carttable;
    //uppdaterar varor i korg i HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback på att det lagts i korg
function addedToCart(pname) {
  var message = pname + " lades till i din varukorg!";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* Användaren tömmer korg */
function emptyCart() {
    //Ta bort korg-sessionens lagringsobjekt och uppdatering av korgens totaler
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
       //Rensar meddelanden och tar bort klassstil
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}

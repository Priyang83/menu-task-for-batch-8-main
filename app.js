
const cart_Array = [];


menu.sort(function my(val1, val2) {
    if (val1.title > val2.title) {
        return 1;
    }
    else {
        return -1;
    }
});


const categories = menu.reduce(function (pre, val) {
    if (pre.includes(val.category) == false) {
        pre.push(val.category);
    }

    return pre;

}, []);

categories.unshift("All");
const btn_Array = categories.map(function displayBtn(val) {
    return ` <button type="button" class="filter-btn" data-id="all" 
      onClick="filterCat('${val}')
      ">
      ${val}
      </button> `;
});

document.getElementById("btn").innerHTML = btn_Array.join("");

function filterCat(cat) {
    const temp = menu.filter(function filterFunction(val) {
        return cat == val.category || cat == "All";
    });
    displayMenu(temp);
}

function displayMenu(t) {
    const newArray = t.map(function myFunction(val) {

        return `<article class="menu-item">
         <img src=${val.img} alt="menu item" class="photo" />
         <div class="item-info">
           <header>
             <h4> ${val.title}</h4>
             <h4 class="price">$${val.price}</h4>
           </header>
           <p class="item-text">
             ${val.desc}
           </p>
           <button class="addcartbtn" onClick="cartFunction('${val.id}')">add to cart</button>
         </div>
         
       </article>`;
    });

    document.getElementById("menu").innerHTML = newArray.join("");
}

function priceFilter(p) {
    const t = menu.sort(function filterP(a, b) {
        if (p == "dsc") {
            return b.price - a.price;
        }
        else {
            return a.price - b.price;
        }
    });
    displayMenu(t);
}

function cartFunction(i) {
    let items = cart_Array.find(function (val) {
        return val.id == i;
    });
    if (items) {
        items.qty += 1;
    }
    else {
        let newItems = menu.find(function (val) {
            return val.id == i;
        });
        newItems.qty = 1;
        cart_Array.push(newItems);
    }
    const cartCount = cart_Array.length;
    document.getElementById("cart_count").innerHTML = cartCount;
}

function checkout() {
    const chkout = cart_Array.reduce(function (pre, val) {
        return pre + val.price * val.qty;
    }, 0);
    document.getElementById("checkout_val").innerHTML = chkout;
}
displayMenu(menu);


"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 3

   Author: 
   Date:   
   
   Filename: rb_build.js

*/
var pizzaPrice = {
   item1 : 10.99,
   item2 : 12.99,
   
};

/* Constructor function for the class of cart objects */
function cart() {
   this.totalCost = 0;
   this.items = [];
}

/* Constructyor function for individal food items */
function foodItem() {
   this.price;
   this.qty;
}

/* Method to calculate the cost of each item ordered */
foodItem.prototype.calcItemCost = function() {
   return this.price*this.qty;
};

/* Mathod to return the total cost of the items in the cart */
cart.prototype.calcCartTotal = function() {
   var cartTotal = 0;
   this.items.forEach(function(item) {
      cartTotal += item.calcItemCost();
   });
   this.totalCost = (cartTotal + cartTotal * 0.07);
   return this.totalCost;
};


/* Method to add the food item to a cart */
foodItem.prototype.addToCart = function(cart) {
   cart.items.push(this);   
};

/* Method to remove a food item from a cart */
foodItem.prototype.removeFromCart = function(cart) {
   for (var i = 0; i < cart.items.length; i++) {
      if (this === cart.items[i]) {
         cart.items.splice(i, 1);
         break;
      }
   }
};


/* Constructor function for the class of pizza objects */
function pizza() {
   
}




/* Make both pizza and topping part of the foodItem prototype chain */

pizza.prototype = new foodItem();



pizza.prototype.calcPizzaPrice = function() {
   this.price = pizzaPrice.item1;
   

   if (this.item === "item1") {
      this.price = pizzaPrice.item1;
   } else if (this.item === "item2") {
      this.price = pizzaPrice.item2;
   
   }
   return this.price;
};





window.addEventListener("load", function() {
   // Preview image of the pizza 
   var pizzaPreviewBox = document.getElementById("previewBox"); 

   // Summary of the pizza order
   var pizzaSummary =  document.getElementById("pizzaSummary");
   // Pizza size selection list
   var pizzaSizeBox = document.getElementById("pizzaSize");
   // Pizza crust selection list
   var pizzaCrustBox = document.getElementById("pizzaCrust");
   // Pizza double sauce checkbox
   var pizzaDoubleSauceBox = document.getElementById("doubleSauce");
   // Pizza double cheese checkbox
   var pizzaDoubleCheeseBox = document.getElementById("doubleCheese");
   // Pizza topping option buttons
   var toppingOptions = document.querySelectorAll("input.topping");
   // Pizza quantity selection list
   var pizzaQuantityBox = document.getElementById("pizzaQuantity");
   // Add to cart button
   var addToCartButton = document.getElementById("addToCart");
   // Order table displaying the items in the shopping cart
   var cartTableBody = document.querySelector("table#cartTable tbody");   
   // Shopping cart total box
   var cartTotalBox = document.getElementById("cartTotal");   
   
   

   // Create a shopping cart object 
   var myCart = new cart();    
   addToCartButton.onclick = addPizzaToCart;

   
   // Function to build the pizza
   function buildPizza(newPizza) {
      
      newPizza.qty = pizzaQuantityBox.selectedValue();      
      
      
      

   }  
   
   // Function to add the built pizza to the shopping cart
   function addPizzaToCart() { 
      var myPizza = new pizza();     
      buildPizza(myPizza);
      myPizza.addToCart(myCart); 
      

      var newItemRow = document.createElement("tr");
      cartTableBody.appendChild(newItemRow);
      
      var summaryCell = document.createElement("td");
      summaryCell.textContent = pizzaSummary.textContent;
      newItemRow.appendChild(summaryCell);
      
      var qtyCell = document.createElement("td");
      qtyCell.textContent = myPizza.qty;
      newItemRow.appendChild(qtyCell);
      
      var priceCell = document.createElement("td");
      priceCell.textContent = myPizza.calcPizzaPrice().toLocaleString('en-US', {style: "currency", currency: "USD"});
      newItemRow.appendChild(priceCell);
      
      var removeCell = document.createElement("td");
      var removeButton = document.createElement("input");   
      removeButton.value = "X";
      removeButton.type = "button";      
      removeCell.appendChild(removeButton);
      newItemRow.appendChild(removeCell);
   
      cartTotalBox.value = myCart.calcCartTotal().toLocaleString('en-US', {style: "currency", currency: "USD"});
      
      console.log(myCart);
      
      removeButton.onclick = function() {
         myPizza.removeFromCart(myCart);
         cartTableBody.removeChild(newItemRow);
         cartTotalBox.value = myCart.calcCartTotal().toLocaleString('en-US', {style: "currency", currency: "USD"});
         console.log(myCart);
      };
      
      resetDrawPizza();  
      
      
   }   
   
   /* Function to draw the pizza image on the page */
   function drawPizza() {
     
   }
   
   // Function to reset the pizza drawing 
   function resetDrawPizza() {
      
   }
   
});


/*-------------------- Custom Methods --------------------*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function() {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }   
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function() {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};


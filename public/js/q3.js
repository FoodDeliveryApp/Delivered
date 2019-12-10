(function(){
  var cart = document.getElementsByClassName('js-cd-cart');
  if(cart.length > 0) {
  	var cartAddBtns = document.getElementsByClassName('js-cd-add-to-cart'),
  		cartBody = cart[0].getElementsByClassName('cd-cart__body')[0],
  		cartList = cartBody.getElementsByTagName('ul')[0],
  		cartListItems = cartList.getElementsByClassName('cd-cart__product'),
  		cartTotal = cart[0].getElementsByClassName('cd-cart__checkout')[0].getElementsByTagName('span')[0],
  		cartCount = cart[0].getElementsByClassName('cd-cart__count')[0],
  		cartCountItems = cartCount.getElementsByTagName('li'),
  		cartUndo = cart[0].getElementsByClassName('cd-cart__undo')[0],
		  productId = 0, //this is a placeholder -> use your real product ids instead
		  productId2 = 1
		  productId3 = 2
		  productId4 = 3
		  productId5 = 4
		  productId6 = 5
		  productId7 = 6
		  productId8 = 7
		  productId9 = 8
		  productId10 = 9
		  productId11 = 10
		  productId12 = 11
		  productId13 = 12
		  productId14 = 13
		  productId15 = 14
		  productId16 = 15
  		cartTimeoutId = false,
  		animatingQuantity = false;
		initCartEvents();


		function initCartEvents() {
			// add products to cart
			for(var i = 0; i < cartAddBtns.length; i++) {(function(i){
				cartAddBtns[i].addEventListener('click', addToCart);
			})(i);}

			// open/close cart
			cart[0].getElementsByClassName('cd-cart__trigger')[0].addEventListener('click', function(event){
				event.preventDefault();
				toggleCart();
			});
			
			cart[0].addEventListener('click', function(event) {
				if(event.target == cart[0]) { // close cart when clicking on bg layer
					toggleCart(true);
				} else if (event.target.closest('.cd-cart__delete-item')) { // remove product from cart
					event.preventDefault();
					removeProduct(event.target.closest('.cd-cart__product'));
				}
			});

			// update product quantity inside cart
			cart[0].addEventListener('change', function(event) {
				if(event.target.tagName.toLowerCase() == 'select') quickUpdateCart();
			});

			//reinsert product deleted from the cart
			cartUndo.addEventListener('click', function(event) {
				if(event.target.tagName.toLowerCase() == 'a') {
					event.preventDefault();
					if(cartTimeoutId) clearInterval(cartTimeoutId);
					// reinsert deleted product
					var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted')[0];
					Util.addClass(deletedProduct, 'cd-cart__product--undo');
					deletedProduct.addEventListener('animationend', function cb(){
						deletedProduct.removeEventListener('animationend', cb);
						Util.removeClass(deletedProduct, 'cd-cart__product--deleted cd-cart__product--undo');
						deletedProduct.removeAttribute('style');
						quickUpdateCart();
					});
					Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				}
			});
		};

		function addToCart(event) {
			event.preventDefault();
			if(animatingQuantity) return;
			var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
			//update cart product list
			addProduct(this);
			//update number of items 

			updateCartCount(cartIsEmpty);
			//update total price
			updateCartTotal(this.getAttribute('data-price'), true);
			//show cart
			Util.removeClass(cart[0], 'cd-cart--empty');
		};

		function toggleCart(bool) { // toggle cart visibility
			var cartIsOpen = ( typeof bool === 'undefined' ) ? Util.hasClass(cart[0], 'cd-cart--open') : bool;
		
			if( cartIsOpen ) {
				Util.removeClass(cart[0], 'cd-cart--open');
				//reset undo
				if(cartTimeoutId) clearInterval(cartTimeoutId);
				Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				removePreviousProduct(); // if a product was deleted, remove it definitively from the cart

				setTimeout(function(){
					cartBody.scrollTop = 0;
					//check if cart empty to hide it
					if( Number(cartCountItems[0].innerText) == 0) Util.addClass(cart[0], 'cd-cart--empty');
				}, 500);
			} else {
				Util.addClass(cart[0], 'cd-cart--open');
			}
		};

		function addProduct(target) {
			
			console.log($(target).attr("href"));
			// this is just a product placeholder
			// you should insert an item with the selected product info
			// replace productId, productName, price and url with your real product info
			if($(target).attr("href") === "#0"){
			var productAdded = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#0"><img src="img/riceball.jpg" alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">Rice Balls</a></h3><span class="cd-cart__price">$11.50</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
			cartList.insertAdjacentHTML('beforeend', productAdded);
			}
			else if($(target).attr("href") === "#1"){
			var productAdded2 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#1"><img src="img/ms.jpg" alt="placeholder2"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#1">Mozorilla Sticks</a></h3><span class="cd-cart__price">$11.35</span><div class="cd-cart__actions"><a href="#1" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId2 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId2 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
			cartList.insertAdjacentHTML('beforeend', productAdded2);
			}
			else if($(target).attr("href") === "#2"){
				var productAdded3 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#2"><img src="img/meat.jpg" alt="placeholder3"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#2">Meatball</a></h3><span class="cd-cart__price">$11.00</span><div class="cd-cart__actions"><a href="#2" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId3 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId3 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded3);
				}
			else if($(target).attr("href") === "#3"){
				var productAdded4 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#3"><img src="img/a.jpg" alt="placeholder4"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#3">Baby Artichokes</a></h3><span class="cd-cart__price">$11.50</span><div class="cd-cart__actions"><a href="#3" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId4 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId4 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded4);
					}
			else if($(target).attr("href") === "#4"){
				var productAdded5 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#4"><img src="img/p.jpg" alt="placeholder5"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#4">Prosecco</a></h3><span class="cd-cart__price">$11.00</span><div class="cd-cart__actions"><a href="#4" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId4 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId4 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded5);
			}
			else if($(target).attr("href") === "#5"){
				var productAdded6 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#5"><img src="img/c.jpeg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#5">Chardonnay</a></h3><span class="cd-cart__price">$10.00</span><div class="cd-cart__actions"><a href="#5" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId5 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId5 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded6);
			}
			else if($(target).attr("href") === "#6"){
				var productAdded7 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#6"><img src="img/pg.jpeg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#6">Pinot Grigio</a></h3><span class="cd-cart__price">$11.00</span><div class="cd-cart__actions"><a href="#6" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId6 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId6 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded7);
			}	
			else if($(target).attr("href") === "#7"){
				var productAdded8 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#7"><img src="img/soda.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#7">Soda</a></h3><span class="cd-cart__price">$3.00</span><div class="cd-cart__actions"><a href="#7" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId7 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId7 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded8);	
			}
			else if($(target).attr("href") === "#8"){
				var productAdded9 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#8"><img src="img/cv.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#8">Chicken & Veggies</a></h3><span class="cd-cart__price">$19.00</span><div class="cd-cart__actions"><a href="#8" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId8 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId8 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded9);	
			}	
			else if($(target).attr("href") === "#9"){
				var productAdded10 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#9"><img src="img/chp.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#9">Chicken Parm</a></h3><span class="cd-cart__price">$18.00</span><div class="cd-cart__actions"><a href="#9" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId9 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId9 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded10);	
			}
			else if($(target).attr("href") === "#10"){
				var productAdded11 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#10"><img src="img/sa.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#10">Grilled Salmon</a></h3><span class="cd-cart__price">$23.50</span><div class="cd-cart__actions"><a href="#10" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId10 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId10 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded11);	
			}
			else if($(target).attr("href") === "#11"){
				var productAdded12 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#11"><img src="img/b.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#11">Branzino</a></h3><span class="cd-cart__price">$22.50</span><div class="cd-cart__actions"><a href="#11" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId11 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId11 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded12);	
			}	
			else if($(target).attr("href") === "#12"){
				var productAdded13 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#12"><img src="img/sf.jpeg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#12">Steak & Fries</a></h3><span class="cd-cart__price">$24.00</span><div class="cd-cart__actions"><a href="#12" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId12 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId12 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded13);	
			}
			else if($(target).attr("href") === "#13"){
				var productAdded14 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#13"><img src="img/burger.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#13">Burger</a></h3><span class="cd-cart__price">$15.50</span><div class="cd-cart__actions"><a href="#13" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId13 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId13 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded14);	
			}
			else if($(target).attr("href") === "#14"){
				var productAdded15 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#14"><img src="img/phe.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#14">Parm Hero</a></h3><span class="cd-cart__price">$13.00</span><div class="cd-cart__actions"><a href="#14" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId14 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId14 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded15);	
			}
			else if($(target).attr("href") === "#15"){
				var productAdded16 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#15"><img src="img/choco.jpg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#15">Chocolate Cake</a></h3><span class="cd-cart__price">$9.97</span><div class="cd-cart__actions"><a href="#15" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId15 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId15 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded16);	
			}
			else if($(target).attr("href") === "#16"){
				var productAdded16 = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#16"><img src="img/sor.jpeg" alt="placeholder6"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#16">Sorbot</a></h3><span class="cd-cart__price">$5.50</span><div class="cd-cart__actions"><a href="#16" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId16 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId16 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded16);	
			}

			
		};




		function removeProduct(product) {
			if(cartTimeoutId) clearInterval(cartTimeoutId);
			removePreviousProduct(); // prduct previously deleted -> definitively remove it from the cart
			
			var topPosition = product.offsetTop,
				productQuantity = Number(product.getElementsByTagName('select')[0].value),
				productTotPrice = Number((product.getElementsByClassName('cd-cart__price')[0].innerText).replace('$', '')) * productQuantity;

			product.style.top = topPosition+'px';
			Util.addClass(product, 'cd-cart__product--deleted');

			//update items count + total price
			updateCartTotal(productTotPrice, false);
			updateCartCount(true, -productQuantity);
			Util.addClass(cartUndo, 'cd-cart__undo--visible');

			//wait 8sec before completely remove the item
			cartTimeoutId = setTimeout(function(){
				Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				removePreviousProduct();
			}, 8000);
		};

		function removePreviousProduct() { // definitively removed a product from the cart (undo not possible anymore)
			var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted');
			if(deletedProduct.length > 0 ) deletedProduct[0].remove();
		};

		function updateCartCount(emptyCart, quantity) {
			if( typeof quantity === 'undefined' ) {
				var actual = Number(cartCountItems[0].innerText) + 1;
				var next = actual + 1;
				
				if( emptyCart ) {
					cartCountItems[0].innerText = actual;
					cartCountItems[1].innerText = next;
					animatingQuantity = false;
				} else {
					Util.addClass(cartCount, 'cd-cart__count--update');

					setTimeout(function() {
						cartCountItems[0].innerText = actual;
					}, 150);

					setTimeout(function() {
						Util.removeClass(cartCount, 'cd-cart__count--update');
					}, 200);

					setTimeout(function() {
						cartCountItems[1].innerText = next;
						animatingQuantity = false;
					}, 230);
				}
			} else {
				var actual = Number(cartCountItems[0].innerText) + quantity;
				var next = actual + 1;
				
				cartCountItems[0].innerText = actual;
				cartCountItems[1].innerText = next;
				animatingQuantity = false;
			}
		};

		function updateCartTotal(price, bool) {
			cartTotal.innerText = bool ? (Number(cartTotal.innerText) + Number(price)).toFixed(2) : (Number(cartTotal.innerText) - Number(price)).toFixed(2);
		};

		function quickUpdateCart() {
			var quantity = 0;
			var price = 0;

			for(var i = 0; i < cartListItems.length; i++) {
				if( !Util.hasClass(cartListItems[i], 'cd-cart__product--deleted') ) {
					var singleQuantity = Number(cartListItems[i].getElementsByTagName('select')[0].value);
					quantity = quantity + singleQuantity;
					price = price + singleQuantity*Number((cartListItems[i].getElementsByClassName('cd-cart__price')[0].innerText).replace('$', ''));
				}
			}

			cartTotal.innerText = price.toFixed(2);
			cartCountItems[0].innerText = quantity;
			cartCountItems[1].innerText = quantity+1;
		};
  }
})();
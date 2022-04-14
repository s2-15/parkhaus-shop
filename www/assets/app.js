
(function(){

	function init(){
		loadItemList(addBuyPopup);
	}

	function loadItemList(onFinished){
		let itemEl = document.getElementsByTagName("main")[0];
		if(!itemEl)
			throw new Error("Element 'main' not found");
		itemEl.innerHTML = "LOADING";

		
		fetch("items.json").then((res) => {
			return res.json();
		}).then((items) => {
			let innerHTML = "";
			for (let item of items) {
				let price = `<div class="price" style="display:inline-block">${item.price}${item.currencySymbole}</div>`;
				if ("oldPrice" in item) {
					price += `<div class="oldprice" style="display:inline-block">${item.oldPrice}${item.currencySymbole}</div>`;
					price += `<div style="display:inline-block" class="discount"><sup>${-100.0 * (1.0 - (item.price / item.oldPrice))}%</sup></div>`;
				}
				const discount = "oldPrice" in item ?  `<div class="oldprice" style="display:inline-block">${item.oldPrice}</div><div style="display:inline-block" class="discount"><sup></sup></div>` : ""
				innerHTML += `<div class="itemcard"><div class="imgcontainer"><img src="assets/items/${item.id}.png"/></div>` +
					`<div class="title">${item.name}</div><div class="description">${item.description}</div>` +
					`<div class="stars" style="--rating: ${item.rating}"></div><span class="ratingCount">(${item.ratingCount})</span>` +
					`<div>${price}</div>`;
				if (item.inStock)
					innerHTML += `<div class="inStock">${item.inStock} in stock</div>`;
				else
					innerHTML += '<div class="inStock outOfStock">Out of stock</div>';
				
				const buttonEnabled = (item.inStock ? "enabled" : "disabled") + "Button";
				innerHTML += `<div class="pushButton ${buttonEnabled}">` +
					`<span class="pushButtonFront ${buttonEnabled}"><b>BUY</b></span></div></div>`;
			}
			itemEl.innerHTML = innerHTML;
			onFinished();
		});
	}
	
	let hidePopupEvent;

	function addBuyPopup() {
		let background = document.getElementById("popupBackground");
		let buttons = document.getElementsByClassName("pushButtonFront enabledButton");
		const hidePopup = () => { 
			background.style.display = "none";
			clearTimeout(hidePopupEvent);
		};
		for (let button of buttons) {
			button.addEventListener("click", () => {
				background.style.display = "block";
				background.style["background-image"] = "url(\"assets/items/confetti.png\")";
				background.innerHTML = "<div id=\"popup\" class=\"popup\"><b>Added to cart!</b></div>";
				background.addEventListener("click", hidePopup);
				hidePopupEvent = setTimeout(hidePopup, 2000);
			});
		}
	}

	window.addEventListener("DOMContentLoaded", init);

})();



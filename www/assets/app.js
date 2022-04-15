
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
				let price = `<div class="price" style="display:inline-block">${item.price}${item.currencySymbol}</div>`;
				if ("oldPrice" in item) {
					price += `<div class="oldprice" style="display:inline-block">${item.oldPrice}${item.currencySymbol}</div>`;
					price += `<div style="display:inline-block" class="discount"><sup>${Math.floor(-100.0 * (1.0 - (item.price / item.oldPrice)))}%</sup></div>`;
				}
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
				startConfetti();
				background.style.display = "block";
				background.innerHTML = "<div id=\"popup\" class=\"popup\"><b>Added to cart!</b></div>";
				background.addEventListener("click", hidePopup);
				hidePopupEvent = setTimeout(hidePopup, 2000);
			});
		}
	}
	
	function startConfetti() {
		let duration = 5 * 1000;
		let animationEnd = Date.now() + duration;
		let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		let interval = setInterval(function() {
			let timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}
			let particleCount = 200 * (timeLeft / duration);
			confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.0, 0.9), y: Math.random() - 0.2 } }));
			confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.0, 0.9), y: Math.random() - 0.1 } }));
		}, 250);
	}

	window.addEventListener("DOMContentLoaded", init);

})();




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
		}).then((json) => {
			let innerHTML = "";
			for(let i of json){
				innerHTML += '<div class="itemcard"><img src="assets/items/' + i.id + '.png" /><div class="title">' + i.name + '</div><div class="description">' + i.description + '</div>'
					+ '<div class="stars" style="--rating: ' + i.rating + '"></div><span class="ratingCount">(' + i.ratingCount + ')</span>';
				if(i.inStock > 0)
					innerHTML += '<div class="inStock">' + i.inStock + ' in stock</div>';
				else
					innerHTML += '<div class="inStock outOfStock">Out of stock</div>';
				innerHTML += "<div class=\"pushable\"><span class=\"buttonFront\"><b>BUY</b></span></div>";
				innerHTML += '</div>';
			}
			itemEl.innerHTML = innerHTML;
			onFinished();
		});
	}

	function addBuyPopup() {
		let background = document.getElementById("popupBackground");
		let buttons = document.getElementsByClassName("buttonFront");
		for(let button of buttons) {
			button.addEventListener("click", () => {
				background.style.display = "block";
				background.style["background-image"] = "url(\"assets/items/confetti.png\")";
				background.innerHTML = "<div id=\"popup\" class=\"popup\"><b>Added to cart!</b></div>";
				const hidePopup = () => { background.style.display = "none"; };
				background.addEventListener("click", hidePopup);
				setTimeout(hidePopup, 3000);
			});
		}
	}

	window.addEventListener("DOMContentLoaded", init);

})();



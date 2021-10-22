
(function(){

	function init(){
		loadItemList();
	}

	function loadItemList(){
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
		});
	}


	window.addEventListener("DOMContentLoaded", init);

})();



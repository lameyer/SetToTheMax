console.log("Hello world");

$(document).ready(function(){
	$(".card").click(function(){
		if ($(".selected").size() < 3 || $(this).hasClass("selected")) {
			$(this).toggleClass("selected");
		}
	});
});
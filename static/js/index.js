console.log("Hello world");

$(document).ready(function() {

	var cardHistory = {};
	var score = 0;

	function getUniqueCardID() {
		var n1 = String(Math.round(Math.random() * 2));
		var n2 = String(Math.round(Math.random() * 2));
		var n3 = String(Math.round(Math.random() * 2));
		var n4 = String(Math.round(Math.random() * 2));

		while (cardHistory[n1+n2+n3+n4]) {
			n1 = String(Math.round(Math.random() * 2));
			n2 = String(Math.round(Math.random() * 2));
			n3 = String(Math.round(Math.random() * 2));
			n4 = String(Math.round(Math.random() * 2));
		}
		cardHistory[n1+n2+n3+n4] = true;
		return n1+n2+n3+n4;
	}

	function setCard(JQcard, cardID, deselect) {
		JQcard.css("background-image", "url(\"images/cards/card"+cardID+".png\")");
		JQcard.attr("cardID", cardID);
		if (deselect) {
			JQcard.removeClass("selected");
		}
	}

	function scoreUpdate() {
		$(".score").text("Score: " + score);
	}

	function showMessage(msg) {
		$(".notification").text(msg);
		$(".notification").css("opacity", 1);
		setTimeout(function() {
			$(".notification").css("opacity", 0);
		}, 1000);
	}

	scoreUpdate();

	$(".card").each(function() {
		var cardID = getUniqueCardID();
		setCard($(this), cardID);
	});

	$(".card").click(function() {
		if ($(".card.selected").size() < 3 || $(this).hasClass("selected")) {
			$(this).toggleClass("selected");
		}
		if ($(".card.selected").size() == 3) {
			var nArrays = [[],[],[],[]];
			$(".card.selected").each(function() {
				var cardID = $(this).attr("cardID");
				for (var i = 0; i < cardID.length; i++) {
					nArrays[i].push(cardID[i]);
				}
			});
			var isSet = true;
			for (var i = 0; i < nArrays.length; i++) {
				var typeTracker = {};
				for (var j = 0; j < nArrays[i].length; j++) {
					if (typeTracker[nArrays[i][j]] === undefined) {
						typeTracker[nArrays[i][j]] = 0;
					}
					typeTracker[nArrays[i][j]]++;
				}
				var keys = Object.keys(typeTracker);
				for (var j = 0; j < keys.length; j++) {
					if (typeTracker[keys[j]] == 2) {
						isSet = false;
					}
				}
			}
			console.log(isSet);
			if (isSet) {
				$(".card.selected").each(function() {
					setCard($(this), getUniqueCardID(), true);
				})
				score++;
				scoreUpdate();
				showMessage("Nice!");
			} else {
				setTimeout(function() {
					$(".card.selected").each(function() {
						$(this).removeClass("selected");
					});
				}, 500);
				showMessage("That ain't no set, poser.");
			}
		}
	});
});


App.controller('home', function(page) {
	// put stuff here
});

App.controller('view-detail', function(page, argu) {
	var album = argu.album;
	var _max = argu.max;

	$(page).find('.app-title').text(album);

	var $loading = $(page).find('.loading'), $list = $(page).find('.app-list'), $listItem = $(page).find('.app-list>div'), i = 1, _per = 10;
	var dir = "../vision/photos/" + album + "/";
	$loading.remove();
	$listItem.remove();

	App.infiniteScroll($list, {
		loading : $loading
	}, function(callback) {
		if (_max < _per)
			_per = _max;
		if (i > _max) {
			return null;
		}
		setTimeout(function() {
			var list = [];
			for (var j = 0; j < _per; j++) {
				var $node = $listItem.clone();
				$node.find('.lazy').attr("src", dir + (j + i) + ".jpg");
				list.push($node);
			}
			i += 10;
			callback(list);
		}, 1200);
	});
});

App.controller('good', function(page) {
	// put stuff here
	var $loading = $(page).find('.loading'), $list = $(page).find('.app-list'), $listItem = $(page).find('.app-list>div'), i = 1, _max = 99, _per = 10;
	var dir = "../vision/photos/人像/";
	$loading.remove();
	$listItem.remove();

	App.infiniteScroll($list, {
		loading : $loading
	}, function(callback) {
		if (i >= _max) {
			return null;
		}
		setTimeout(function() {
			var list = [];
			for (var j = 0; j < _per; j++) {
				var $node = $listItem.clone();
				$node.find('.lazy').attr("src", dir + (j + i) + ".jpg");
				list.push($node);
			}
			i += 10;
			callback(list);
		}, 1200);
	});
});

try {
	App.restore();
} catch (err) {
	App.load('home');
}

// failed
function fullScreen(element) {
	if (element.requestFullScreen) {
		element.requestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	}
	App.load('home');
}
App.controller('home', function(page) {
	// put stuff here
});

App.controller('detail', function(page, argu) {
	var item = argu.item;
	var title = argu.title;

	$(page).find('.app-title').text(title);

	var $loading = $(page).find('.loading');

	$.get('views/' + item + '.html', function(response) {
		$loading.remove();
		$(page).find(".app-content").html(response);
	})
	
	// 为动态加载的按钮注册事件
	$(page).on('appReady', function() {
		$(page).find('.app-button').on('click', function() {
			//alert('button was clicked!');
			target = $(this).data("target");
			args = JSON.parse( $(this).data("target-args") );
			App.load(target, args);
		});
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
app.directive('tabBarIosEdit', function() {
	return {
		restrict: "E",
		templateUrl: 'js/common/directives/edit-blade-directives/tab-bar-ios-edit/tab-bar-ios-edit.html',
		link: function(scope, elem, attr) {
			scope.tabSelected;
			scope.tabBarItems = {
				"bookmarks": {
					systemIcon: "bookmarks",
					glyph: "glyphicon-book"
				},
				"contacts": {
					systemIcon: "contacts",
					glyph: "glyphicon-user"
				},
				"downloads": {
					systemIcon: "downloads",
					glyph: "glyphicon-download"
				},
				"favorites": {
					systemIcon: "favorites",
					glyph: "glyphicon-star"
				},
				"history": {
					systemIcon: "history",
					glyph: "glyphicon-time"
				},
				"more": {
					systemIcon: "more",
					glyph: 'glyphicon-option-horizontal'
				},
				"most-recent": {
					systemIcon: "most-recent",
					glyph: 'glyphicon-time'
				},
				"most-viewed": {
					systemIcon: "most-viewed",
					glyph: "glyphicon-list"
				},
				"recents": {
					systemIcon: "recents",
					glyph: "glyphicon-time"
				},
				"search": {
					systemIcon: "search",
					glyph: "glyphicon-search"
				},
				"top-rated": {
					systemIcon: "top-rated",
					glyph: 'glyphicon-user'
				}
			}
			scope.addTabItem = function(tabArray) {
				if (scope.tabSelected) tabArray.push(scope.tabBarItems[scope.tabSelected]);
			}

		}
	}
})


//('bookmarks', 'contacts', 'downloads', 'favorites', 'featured', 'history', 'more', 'most-recent', 'most-viewed', 'recents', 'search', 'top-rated'
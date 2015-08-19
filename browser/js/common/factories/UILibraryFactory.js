app.factory("UILibraryFactory", function() {
	return {
		uiNavbar: {
			html: "<ui-navbar style='flex-grow: 1'></ui-navbar>",
			jsx: "hey",
			thumbnail: "/images/navbar.png"
		},
		uiDropArea: {
			html: "<ui-drop-area></ui-drop-area>",
			jsx: "ok",
			thumbnail: "/images/box.png"
		},
		uiImage: {
			html: "<ui-image style='flex-grow: 1'></ui-image>",
			jsx: "yo",
			thumbnail: "/images/img.png"
		}
	}
})
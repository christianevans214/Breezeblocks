app.factory("UILibraryFactory", function() {
	return {
		uiNavbar: {
			html: "<ui-navbar></ui-navbar>",
			jsx: "hey",
			thumbnail: "/images/navbar.png"
		},
		uiDropArea: {
			html: "<ui-drop-area class='drop-area'></ui-drop-area>",
			jsx: "ok",
			thumbnail: "/images/box.png"
		},
		uiImage: {
			html: "<ui-image></ui-image>",
			jsx: "yo",
			thumbnail: "/images/img.png"
		}
	}
})
app.factory("UILibraryFactory", function() {
	return {
		uiNavbar: {
			html: "<ui-navbar style='flex-grow: 1; display: flex; flex-direction: column; width: 100%; align-items: center; background: #444; color: white;'></ui-navbar>",
			jsx: "hey",
			thumbnail: "/images/navbar.png"
		},
		uiDropArea: {
			html: "<ui-drop-area class='drop-area'></ui-drop-area>",
			jsx: "ok",
			thumbnail: "/images/box.png"
		},
		uiImage: {
			html: "<ui-image style='flex-grow: 1; display: flex; flex-direction: column'></ui-image>",
			jsx: "yo",
			thumbnail: "/images/img.png"
		}
	}
})
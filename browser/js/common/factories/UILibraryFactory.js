// app.factory("UILibraryFactory", function() {
// 	return {
// 		Navbar: {
// 			thumbnail: "/images/navbar.png"
// 		},
// 		DropArea: {
// 			thumbnail: "/images/box.png"
// 		},
// 		Image: {
// 			thumbnail: "/images/img.png"
// 		}
// 	}
// })

app.factory("UILibraryFactory", function() {
	return {
		"Thumbnails": [{
				component: "Navbar",
				backgroundImage: "/images/navbar.png"
			}, {
				component: "Image",
				backgroundImage: '/images/img.png'
			}
			//
		]
	}
})
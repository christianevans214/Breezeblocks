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
			}, {
				component: "SwitchIOS",
				backgroundImage: '/images/sliderbutton.png'
			}, {
				component: "Map",
				backgroundImage: '/images/map.png'
			}, {
				component: "SliderIOS",
				backgroundImage: '/images/slider.png'
			}, {
				component: 'Text',
				backgroundImage: '/images/text.png'
			}, {
				component: 'ScrollView',
				backgroundImage: '/images/ScrollView.png'
			}, {
				component: 'ListView',
				backgroundImage: '/images/ListView.png'
			}, {
				component: "TabBarIOS",
				backgroundImage: '/images/tabbar.png'
			}
			//
		]
	}
})
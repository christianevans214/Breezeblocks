app.factory('CssTreeFactory', function(){
	return {

		cssTree: {
				'view-1': {
					'height': '40px'
				},
				'view-1-navbar-1': {
					'background-color': '#F00',
					"flex-grow": 2
				},
				'view-1-navbar-2': {
					'background-color': '#0F0',
					"flex-grow": 1
				},
				'view-1-navbar-3': {
					'background-color': '#00F',
					"flex-grow": 1
				},
				'view-2': {
					'height': '30px'
				},
				'view-2-image-1': {
					'flex-grow': 1
				},
				'view-2-image-2': {
					'flex-grow': 4
				}
		},
		objToInlineStyle: function(className){
			var str = ""
			// console.log(this.cssTree)
			for (var selector in this.cssTree[className]){
				str+=selector+': '+ this.cssTree[className][selector];
				if(selector === "margin" || selector === "padding") str += "px";
				str += ";"
			}
			return str
		},
		addViewClass: function(className){
			//do this after lunch
			this.cssTree[className] = {
				// "flex-grow": "1"
			};
		},
		addChildClass: function(className){
			this.cssTree[className] = {
				"flex-grow": 1
			};
		}


	}
})
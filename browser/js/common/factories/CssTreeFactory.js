app.factory('CssTreeFactory', function($http) {
	return {

		cssTree: {},
		objToInlineStyle: function(className) {
			var str = ""
				// console.log(this.cssTree)
			for (var selector in this.cssTree[className]) {
				str += selector + ': ' + this.cssTree[className][selector];
				if (selector === "margin" || selector === "padding") str += "px";
				str += ";"
			}
			return str
		},
		addViewClass: function(className) {
			//do this after lunch
			this.cssTree[className] = {
				// "flex-grow": "1"
			};
		},
		addChildClass: function(className) {
			this.cssTree[className] = {
				"flex-grow": 1
			};
		},
		removeStyle: function(className) {

		}


	}
})
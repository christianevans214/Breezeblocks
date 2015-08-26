app.factory("ProjectFactory", function ($http) {
	return {
		getAllProjects: function () {
			return $http.get(`api/build`)
				.then(function (res) {
					return res.data;
				})
		},
		getProject: function (id) {
			return $http.get(`api/build/${id}`)
				.then(function (res) {
					return res.data;
				})
		},
		createProject: function () {
			return $http.post(`api/build`)
				.then(function (res) {
					return res.data;
				})
		},
		updateProject: function (id, data) {
			return $http.put(`api/build/${id}`, data)
				.then(function (res) {
					return res.data
				})
		},
		deleteProject: function (id) {
			return $http.delete(`api/build/${id}`)
				.then(function (res) {
					return res.data;
				})
		},
		exportProject: function (projectObj) {
			console.log("EXPORTPROJECT PROJECT OBJ", projectObj)
				//projectObj needs to be {html, css, userId, buildId}
			return $http.post(`api/export`, projectObj)
				.then(function (res) {
					return res.data;
				})
		},
		convertFlexToWidthPercentage: function (pageArr) {
			//we should optimize this please. please.
			//find maximum amount of flex for each View
			var flexArr = this.returnHashedFlexTable(pageArr);
			console.log(flexArr);
			//generate percentages
			var percentageObj = {};
			pageArr.forEach(function (page, i) {

				for (var className in page.css) {
					if (page.css[className]['flex-grow']) {
						var viewRank = className.split("-")[1]
						page.css[className]['flex-grow'] = (page.css[className]['flex-grow'] / flexArr[i][viewRank]) * 100;
					}
				}
				console.log("PAGE AFTER WE DID PERCENTAGE STUFF", page.css)
			})

		},
		returnHashedFlexTable: function (pageArr) {
			var flexPage = [];
			pageArr.forEach(function (page) {
				//cumulative Flex: {view-1: 5, view-2: 3, view-3: 5}
				var cumulativeFlex = {};
				//Get Total Flex For Each Group
				for (var className in page.css) {
					var viewRank = className.split("-")[1];

					if (page.css[className]["flex-grow"]) {
						if (cumulativeFlex[viewRank]) cumulativeFlex[viewRank] += page.css[className]["flex-grow"];
						else {
							cumulativeFlex[viewRank] = page.css[className]["flex-grow"];
						}
					}
				}
				flexPage.push(cumulativeFlex);
			})
			return flexPage;
		}
	}
})
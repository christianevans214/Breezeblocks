app.factory("ProjectFactory", function($http) {
	return {
		getAllProjects: function() {
			return $http.get(`api/build`)
				.then(function(res) {
					return res.data;
				})
		},
		getProject: function(id) {
			return $http.get(`api/build/${id}`)
				.then(function(res) {
					return res.data;
				})
		},
		createProject: function() {
			return $http.post(`api/build`)
				.then(function(res) {
					return res.data;
				})
		},
		updateProject: function(id, data) {
			return $http.put(`api/build/${id}`, data)
				.then(function(res) {
					return res.data
				})
		},
		deleteProject: function(id) {
			return $http.delete(`api/build/${id}`)
				.then(function(res) {
					return res.data;
				})
		},
		exportProject: function(projectObj) {
			//console.log("EXPORTPROJECT PROJECT OBJ", projectObj)
			//projectObj needs to be {html, css, userId, buildId}
			return $http.post(`api/export`, projectObj)
				.then(function(res) {
					return res.data;
				})
		},
		convertFlexToWidthPercentage: function(pageArr) {
			var flexArr = this.returnHashedFlexTable(pageArr);
			//console.log(flexArr);
			//generate percentages
			var percentageObj = {};
			pageArr.forEach(function(page, i) {

				for (var className in page.css) {
					if (page.css[className]['flex-grow']) {
						var viewRank = className.split("-")[1]
						page.css[className]['flex-grow'] = (page.css[className]['flex-grow'] / flexArr[i][viewRank]) * 100;
					}
				}
			})

		},
		returnHashedFlexTable: function(pageArr) {
			var flexPage = [];
			pageArr.forEach(function(page) {
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
		},
		convertFlexToWidthPercentageHTML: function(pageArr, $scope) {
			var cumulative = [];

			pageArr.forEach(function(page) {
				// console.log(_.groupBy(page.html, 'className'));
				// cumulativeFlex.push(_.groupBy(page.html, 'className'));
				var Views = _.groupBy(page.html, 'className');

				for (var key in Views) {
					var flexSum = 0;
					Views[key] = Views[key][0].children.map(function(child) {

						if (page.css[child.className[1]] && page.css[child.className[1]]['flex-grow']) {
							flexSum += page.css[child.className[1]]['flex-grow'];
							return child.className[1];
						} else return Views[key];
					})

					Views[key] = {
						childrenClasses: Views[key],
						totalFlex: flexSum
					}
				}

				cumulative.push(Views);
				for (var view in Views) {
					console.log(view);
					Views[view].childrenClasses.forEach(function(childClass, index) {
						console.log('childClass', childClass);
						console.log('childClassCSS', page.css[childClass]);
						if (page.css[childClass]['flex-grow']) page.css[childClass]['flex-grow-width'] = (page.css[childClass]['flex-grow'] / Views[view].totalFlex) * 100;
					})
				}
			})
			return pageArr;

		}
	}
})
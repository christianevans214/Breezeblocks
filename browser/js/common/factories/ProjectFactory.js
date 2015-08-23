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
			console.log("EXPORTPROJECT PROJECT OBJ", projectObj)
				//projectObj needs to be {html, css, userId, buildId}
			return $http.post(`api/export`, projectObj)
				.then(function(res) {
					return res.data;
				})
		}
	}
})
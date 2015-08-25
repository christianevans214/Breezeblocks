app.service('ZoomService',function(){
		this.scalePercent = 100;
		var self = this;
		this.changeZoom =  function(scalePercent){
			self.scalePercent = scalePercent || 100;
			console.log('from zoomservice',this.scalePercent)
			var scaleRatio = this.scalePercent/100;
			$('#app').css('transform','scale('+scaleRatio+')')

		};
		this.getZoom =  function(){
			// console.log('getZoom from service',this.scalePercent)
			return this.scalePercent
		};
})
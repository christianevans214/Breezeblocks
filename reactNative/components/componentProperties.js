/*ScrollView:
	Props:
		contentContainerStyle -> wraps all the child views
		horizontal: bool
		showsHorizontalScrollIndicator
		showsVerticalScrollIndicator 
	
SliderIOS:
	Props:
		maximumTrackTintColor string -> The color used for the track to the right of the button. Overrides the default blue gradient image.
		maximumValue number -> default = 1
		minimumTrackTintColor string  -> left of button
		minimumValue number 
		onSlidingComplete function 
		onValueChange function 
		value number 

SwitchIOS:
	Props:
		disabled bool -> If true the user won't be able to toggle the switch. Default value is false.
		onTintColor string -> Background color when the switch is turned on.
		onValueChange function -> Callback that is called when the user toggles the switch.
		thumbTintColor string -> Background color for the switch round button.
		tintColor string -> Background color when the switch is turned off.
		value bool -> The value of the switch, if true the switch will be turned on. Default value is false.



Style:
	Flexbox...
		alignItems enum('flex-start', 'flex-end', 'center', 'stretch') 
		alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch') 
		borderBottomWidth number 
		borderLeftWidth number 
		borderRightWidth number 
		borderTopWidth number 
		borderWidth number 
		bottom number 
		flex number 
		flexDirection enum('row', 'column') 
		flexWrap enum('wrap', 'nowrap') 
		height number 
		justifyContent enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around') 
		left number 
		margin number 
		marginBottom number 
		marginHorizontal number 
		marginLeft number 
		marginRight number 
		marginTop number 
		marginVertical number 
		padding number 
		paddingBottom number 
		paddingHorizontal number 
		paddingLeft number 
		paddingRight number 
		paddingTop number 
		paddingVertical number 
		position enum('absolute', 'relative') 
		right number 
		top number 
		width number 
	Transforms...
	backfaceVisibility enum('visible', 'hidden')
	backgroundColor string
	borderColor string
	borderTopColor string
	borderRightColor string
	borderBottomColor string
	borderLeftColor string
	borderRadius number
	borderTopLeftRadius number
	borderTopRightRadius number
	borderBottomLeftRadius number
	borderBottomRightRadius number
	borderStyle enum('solid', 'dotted', 'dashed')
	opacity number
	overflow enum('visible', 'hidden')
	shadowColor string
	shadowOffset {width: number, height: number}
	shadowOpacity number
	shadowRadius number











*/
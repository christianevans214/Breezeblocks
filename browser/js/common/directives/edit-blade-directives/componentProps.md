///TABBARIOS///
{
	tintColor: STRING,
	translucted: BOOLEAN
}

///MAPVIEW//
//HOW WE DO THIS//
{
	value:
	latitude: NUMBER
	longitude: NUMBER
	latitudeDelta: NUMBER
	longitudeDelta:	NUMBER
	mapType: 'standard', 'satellite', 'hybrid',
	maxDelta: NUMBER,
	minDelta: NUMBER,
	pitchEnabled: bool
}
///SLIDERIOS///
{
    maximumTrackTintColor: STRING
    maximumValue: NUMBER
    minimumTrackTintCol:  STRING
    minimumValue: NUMBER
    onSlidingComplete: FUNCTION
    onValueChange: FUNCTION
    value: NUMBER
}

///switchIOS///
{
	onTintColor: string,
	thumbTintColor: string,
	tintColor: string
}

///IMAGE///
{
	resizeMode: 'cover', 'contain', or 'stretch'
	source: '' (url of the background image)
}


///ScrollView///
{
	THUMBS: [imageurlstring1, imageurlstring2],
	contentInset: ?
	horizontal:
}

///TEXTINPUT///
{
	autoCorrect: Bool,
	editable: boolean (default true),
	multiline: boolean (write on multiple lines),
	placeholder: string,
	secureTextEntry: bool (shows censored text when typing in),
	value: string (what text will say)
	clearTextOnFocus: bool (clears when clicking on it)
}

///TEXT///
{
	numberOfLines: number
}

///For List View///
Remember we need to convert to an array

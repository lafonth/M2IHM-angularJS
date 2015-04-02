define( [ './BrickFhem.js'
		]
	  , function(BrickFhem) {
// Define
function EnO_switch(FhemBridge, listEntry) {
	BrickFhem.apply(this, [FhemBridge, listEntry]);
	this.types.push( 'EnO_switch' );
	this.buttons = {};
	return this;
}

EnO_switch.prototype = new BrickFhem();
	EnO_switch.prototype.unreference();
EnO_switch.prototype.constructor		= EnO_switch;
EnO_switch.prototype.getTypeName		= function() {return "EnO_switch";}

EnO_switch.prototype.dispose			= function() {
	 BrickFhem.prototype.dispose.apply(this, []);
	}

EnO_switch.prototype.init				= function(FhemBridge, listEntry) {
	BrickFhem.prototype.init.apply(this, [FhemBridge, listEntry]);
}

EnO_switch.prototype.isPressed			= function() {
	return this.buttons.state;
}

EnO_switch.prototype.extractData		= function(data) {
	this.buttons.state = data.changed.buttons === 'pressed';
	var json  = { time		: new Date().getTime()
				, pressed	: this.buttons.state === 'pressed'
				};
	if(data.changed.STATE) {json.state = data.changed.STATE;}
	return json;
}

EnO_switch.prototype.update			= function(data) {
	console.log("EnO_switch", this.brickId, "update");
	var json = this.extractData(data);
	this.emit('update', json);
}

return EnO_switch;

});

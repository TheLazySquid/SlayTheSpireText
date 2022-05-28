class Relic {
	constructor(){
		this.description = "Relic";
	}
}

class HealthRelic extends Relic {
	constructor(){
		super();
		this.name = "Health Relic";
		this.activation = "postbattle";
		this.description = "Gain 5 health after battle";
	}
	activate(player){
		player.gainHealth(5);
	}
}

exports.HealthRelic = HealthRelic;
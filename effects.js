class Effect {
	constructor(parent){
		this.parent = parent;
	}
	update(){
		this.amount -= 1;
		if(this.amount <= 0){
			this.end();
		}
	}
	end(){
		this.parent.removeEffect(this);
	}
}

class Vulnerable extends Effect {
	constructor(amount, parent){
		super(parent);
		this.amount = amount;
		this.name = "Vulnerable";
		this.description = `Take 50% more damage while applied.`;
	}
}

exports.Vulnerable = Vulnerable;
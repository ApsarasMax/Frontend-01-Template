export class Timeline{
	constructor(){
		this.animations = new Set();
		this.finishedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		this.state="init";
		this.tick=()=>{
			let t = Date.now() - this.startTime;
			// console.log(t);
			// let animations = this.animations.filter(animation => !animation.finished);
			for(let animation of this.animations){
				// if(t > animation.duration + animation.delay){
				// 	continue;
				// }
				let {object, property, template, start, end, duration, timingFunction, delay} = animation;
				// console.log(animation);

				let addTime = this.addTimes.get(animation);

				if(t<delay+addTime){
					continue;
				}

				let progression = timingFunction((t-delay-addTime)/duration);
				if(t > duration + delay + addTime){
					progression = 1;
					this.animations.delete(animation);
					this.finishedAnimations.add(animation);
				}
				// let value = start + progression*(end-start);
				let value = animation.valueFromProgression(progression);

				object[property] = template(value);
			}
			if(this.animations.size){
				this.requestID = requestAnimationFrame(this.tick);	
			}else{
				this.requestID=null;
			}
		}
	}

	// tick(){
	// }

	pause(){
		if(this.state!=="playing"){
			return;
		}
		this.state="pause";
		this.pauseTime = Date.now();
		if(this.requestID!==null){
			cancelAnimationFrame(this.requestID);
			this.requestID=null;
		}
	}

	resume(){
		if(this.state!=="pause"){
			return;
		}
		this.state="playing";
		this.startTime += (Date.now() - this.pauseTime);
		this.tick();
	}

	start(){
		if(this.state!=="init"){
			return;
		}
		this.state="playing";
		this.startTime = Date.now();
		this.tick();
	}

	reset(){
		if(this.state === "playing"){
			this.pause();
		}
		this.animations = new Set();
		this.finishedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		this.startTime=Date.now();
		this.pauseTime=null;
		this.state="init";

	}

	restart(){
		if(this.state==="playing"){
			this.pause();
		}

		for(let animation of this.finishedAnimations){
			this.animations.add(animation);
		}

		this.finishedAnimations = new Set();
		this.requestID = null;
		this.state="playing";
		this.startTime=Date.now();
		this.pauseTime=null;
		this.tick();

	}

	add(animation, addTime){
		this.animations.add(animation);
		if(this.state === "playing" && this.requestID === null){
			this.tick();
		}
		// animation.finished = false;
		if(this.state==="playing")
			this.addTimes.set(animation, addTime !== void 0? addTime: Date.now()-this.startTime);
			// animation.startTime=startTime || Date.now();
		else
			this.addTimes.set(animation, addTime !== void 0? addTime: 0);
			// animation.startTime=startTime || 0;
	}
}

export class Animation{
	constructor(object, property, start, end, duration, delay, timingFunction, template){
		this.object=object;
		this.template=template;
		this.property=property;
		this.start=start;
		this.end=end;
		this.duration=duration;
		this.delay=delay || 0;
		this.timingFunction=timingFunction;
		// this.finished=false;
	}
	valueFromProgression(progression){
		return this.start + progression*(this.end-this.start);
	}
}



/*

let a = new Animation(object, property, start, end, durationm, delay, timingFunction);

animation.start()

animation.stop()

animation.pause()

animation.stop()

*/
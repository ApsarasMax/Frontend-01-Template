import {createElement, Text, Wrapper} from "./createElement";
import {Timeline, Animation} from "./animation";

import {enableGesture} from "./gesture";

export class Carousel{
	constructor(config){
		// debugger;
		this.children = [];
		// this.root = document.createElement("div");
		this.attributes=new Map();
		this.properties=new Map();
	}

	setAttribute(name, value){
		// debugger;
		// this.root.setAttribute(name, value);
		this[name]=value;
	}

	appendChild(child){
		// debugger;
		// child.mountTo(this.root);
		this.children.push(child);
	}

	// addEventListener(type, handler, flags){
	// 	this.root.addEventListener(...arguments);
	// }

	render(){
		let position = 0;

		let timeline = new Timeline;
		timeline.start();

		let nextPicStopHandler = null;



		let children = this.data.map( (url, currentPosition) => {
		    let lastPosition = (currentPosition+this.data.length-1)%this.data.length;
			let nextPosition = (currentPosition+1)%this.data.length;


			let offset=0;

			let onStart = ()=>{
				timeline.pause();
				clearTimeout(nextPicStopHandler);

				let currentElement=children[currentPosition];

				let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
				offset = currentTransformValue+500*currentPosition;
				// console.log(offset);

			}

			let onPan = event =>{
				let lastElement = children[lastPosition];
				let currentElement = children[currentPosition];
				let nextElement = children[nextPosition];

				let dx = event.clientX - event.startX;
				let currentTransformValue = -500*currentPosition+offset+dx;
				let lastTransformValue = -500-500*lastPosition+offset+dx;
				let nextTransformValue = 500-500*nextPosition+offset+dx;

				// console.log("onpan",lastPosition, currentPosition, nextPosition);

				currentElement.style.transform = `translateX(${currentTransformValue}px)`;
				lastElement.style.transform = `translateX(${lastTransformValue}px)`;
				nextElement.style.transform = `translateX(${nextTransformValue}px)`;
			}

			let onPanend = event =>{
				let direction = 0;
				let dx = event.clientX - event.startX;
				if(dx + offset > 250){
					direction =1;
				}else if(dx + offset < -250){
					direction = -1;
				}
				timeline.reset();
				timeline.start();

				let lastElement = children[lastPosition];
				let currentElement = children[currentPosition];
				let nextElement = children[nextPosition];



				let currentTransformValue = -500*currentPosition+offset+dx;
				let lastTransformValue = -500-500*lastPosition+offset+dx;
				let nextTransformValue = 500-500*nextPosition+offset+dx;

				let linear = t=>t;

				let currentAnimation = new Animation(currentElement.style, "transform", -500*currentPosition+offset+dx, -500*currentPosition+direction*500, 500, 0, linear, v=>`translateX(${v}px)`);
				let nextAnimation = new Animation(nextElement.style, "transform", 500-500*nextPosition+offset+dx, 500-500*nextPosition+direction*500, 500, 0, linear, v=>`translateX(${v}px)`);
				let lastAnimation = new Animation(lastElement.style, "transform", -500-500*lastPosition+offset+dx, -500-500*lastPosition+direction*500, 500, 0, linear, v=>`translateX(${v}px)`);

				timeline.add(currentAnimation);
				timeline.add(nextAnimation);
				timeline.add(lastAnimation);

				position = (position - direction + this.data.length)% this.data.length;

				nextPicStopHandler = setTimeout(nextPic, 1000);	

				currentElement.style.transform = `translateX(${500*offset-500*position}px)`;
                nextElement.style.transform = `translateX(${500*offset+500-500*nextPosition}px)`;
                lastElement.style.transform = `translateX(${500*offset-500-500*lastPosition}px)`;

			}
			let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} onPanend={onPanend} enableGesture={true}/>;
			element.style.transform = "translateX(0px)";

			element.addEventListener("dragstart", event => event.preventDefault());
			return element;
			});
		let root = <div class="carousel">
			{children}
		</div>
		// debugger


		// window.xtimeline = timeline;

		let nextPic = ()=>{
			let nextPosition = (position+1)%this.data.length;

			let current = children[position];
			let next = children[nextPosition];

			let linear = t=>t;
			let currentAnimation = new Animation(current.style, "transform", -100*position, -100-100*position, 500, 0, linear, v=>`translateX(${5*v}px)`);
			let nextAnimation = new Animation(next.style, "transform", 100-100*nextPosition, -100*nextPosition, 500, 0, linear, v=>`translateX(${5*v}px)`);

			// current.style.transition = "ease 0s";
			// next.style.transition = "ease 0s";

			// current.style.transform = `translateX(${-100*position}%)`;
			// next.style.transform = `translateX(${100-100*nextPosition}%)`;

			timeline.add(currentAnimation);
			timeline.add(nextAnimation);

			// timeline.start();

			position = nextPosition;
			// window.xstopHandler = 
			// setTimeout(nextPic, 1000);

			// setTimeout(function(){
			// 	current.style.transition = "ease 0.5s";
			// 	next.style.transition = "ease 0.5s";

			// 	current.style.transform = `translateX(${-100-100*position}%)`;
			// 	next.style.transform = `translateX(${-100*nextPosition}%)`;

			// 	position = nextPosition;

			// }, 16);

			
			nextPicStopHandler = setTimeout(nextPic, 1000);
		}
		nextPicStopHandler = setTimeout(nextPic, 1000);

		return <div class="carousel">
			{children}
		</div>;
		//debugger;

		// root.addEventListener("mousedown", event => {
  //           let startX = event.clientX, startY = event.clientY;
  //       	let nextPosition = (position+1)%this.data.length;
  //       	let lastPosition = (position+this.data.length-1)%this.data.length;

  //           let current = children[position];
  //           let next = children[nextPosition];
  //           let last = children[lastPosition];

  //           current.style.transition = "ease 0s";
		// 	next.style.transition = "ease 0s";
		// 	last.style.transition = "ease 0s";

		// 	current.style.transform = `translateX(${-500*position}px)`;
		// 	next.style.transform = `translateX(${500-500*nextPosition}px)`;
		// 	last.style.transform = `translateX(${-500-500*lastPosition}px)`;

  //           let move = event => {
  //               current.style.transform = `translateX(${event.clientX-startX-500*position}px)`;
  //               next.style.transform = `translateX(${event.clientX-startX+500-500*nextPosition}px)`;
  //               last.style.transform = `translateX(${event.clientX-startX-500-500*lastPosition}px)`;
  //           };
  //           let up = event => {
  //           	let offset = 0;
  //           	if(event.clientX-startX>250){
  //           		offset=1;
  //           	}else if(event.clientX-startX<-250){
  //           		offset=-1;
  //           	}

  //               current.style.transition = "";
		// 		next.style.transition = "";
		// 		last.style.transition = "";

		// 		current.style.transform = `translateX(${500*offset-500*position}px)`;
  //               next.style.transform = `translateX(${500*offset+500-500*nextPosition}px)`;
  //               last.style.transform = `translateX(${500*offset-500-500*lastPosition}px)`;

  //           	position=(position-offset+this.data.length)%this.data.length;
  //               document.removeEventListener("mousemove", move);
  //               document.removeEventListener("mouseup", up);
  //           };
  //           document.addEventListener("mousemove", move);
  //           document.addEventListener("mouseup", up);
  //       })

		// return root;
	}

	mountTo(parent){
		// debugger;
		this.render().mountTo(parent);
	}
}
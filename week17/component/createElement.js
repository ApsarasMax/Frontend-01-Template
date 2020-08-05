import {enableGesture} from "./gesture";

export function createElement(Cls, attributes, ...children){
	// debugger;

	let o;

	if(typeof Cls === "string"){
		o= new Wrapper(Cls);
	}else{
		o = new Cls({
			time: {}
		});
	}


	for(let name in attributes){
		// debugger;
		o.setAttribute(name, attributes[name]);
	}

	let visit =(children) =>{
		for(let child of children){
			// debugger;
			if(typeof child === "object" && child instanceof Array){
				visit(child);
				continue;
			}
			if(typeof child === "string"){
				child = new Text(child);
			}
			o.appendChild(child);
		}
	}

	visit(children);
	return o;
}

export class Text {
	constructor(text){
		// debugger;
		this.children = [];
		this.root = document.createTextNode(text);
	}

	mountTo(parent){
		// debugger;
		parent.appendChild(this.root);
	}
	getAttribute(name){
		return;
	}
}

export class Wrapper{
	constructor(type){
		// debugger;
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value){
		// debugger;
		// this[name] = value;
		this.root.setAttribute(name, value);

		if(name.match(/^on([\s\S]+)$/)){
			// console.log(RegExp.$1);
			let eventName = RegExp.$1.replace(/^[\s\S]/, c=>c.toLowerCase());
			this.addEventListener(eventName, value);
		}

		if(name === "enableGesture"){
			enableGesture(this.root);
		}
	}
	getAttribute(name){
		return this.root.getAttribute(name);
	}

	appendChild(child){
		// debugger;
		// child.mountTo(this.root);
		this.children.push(child);
	}

	addEventListener(type, handler, flags){
		this.root.addEventListener(...arguments);
	}

	get style(){
		return this.root.style;
	}

	get classList(){
		return this.root.classList;
	}

	set innerText(text) {
		return this.root.innerText = text;
	}

	mountTo(parent){
		// debugger;
		parent.appendChild(this.root);
		for(let child of this.children){
			child.mountTo(this.root);
		}
	}
}
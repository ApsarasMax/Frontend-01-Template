import {createElement, Text, Wrapper} from "./createElement";

export class ListView{
	constructor(config){
		// debugger;
		this.children = [];
		// this.root = document.createElement("div");
		this.attributes=new Map();
		this.properties=new Map();
		this.state = Object.create(null);
	}

	setAttribute(name, value){
		// debugger;
		// this.root.setAttribute(name, value);
		this[name]=value;
	}

	getAttribute(name){
		// debugger;
		// this.root.setAttribute(name, value);
		return this[name];
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
		let data = this.getAttribute('data');
		console.log(data);
		console.log(this.children[0]);
		return <div class="list-view" style="width:300px;">
		{
			data.map(this.children[0])
		}

		</div>;
		//debugger;
	}

	mountTo(parent){
		// debugger;
		this.render().mountTo(parent);
	}
}
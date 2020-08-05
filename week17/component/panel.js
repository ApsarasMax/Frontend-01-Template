import {createElement, Text, Wrapper} from "./createElement";

export class Panel{
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
		return <div class="panel" tyle="border:solid 1px lightgreen;width:300px;">
			<h1 style="background-color: lightgreen; width: 300px;margin:0;">{this.title}</h1>
			<div style="border:solid 1px lightgreen;width:300px;min-height:300px;">
				{this.children}
			</div>
		</div>;
		//debugger;
	}

	mountTo(parent){
		// debugger;
		this.render().mountTo(parent);
	}
}
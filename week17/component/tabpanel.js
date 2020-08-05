import {createElement, Text, Wrapper} from "./createElement";

export class TabPanel{
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

	select(i){
		for(let view of this.childViews){
			view.style.display="none";
		}
		this.childViews[i].style.display = "";

		for(let view of this.titleViews){
			// view.style.display="none";
			view.classList.add("selected")
		}
		// this.titleViews[i].style.display = "";
		this.childViews[i].classList.remove("selected")

		// this.titleView.innerText = this.children[i].title;
	}

	render(){

		this.childViews=this.children.map(child => <div style="width:300px;min-height:300px;">{child}</div>);
		//debugger
		this.titleViews=this.children.map((child, i) => <span onClick={()=>this.select(i)} 
			style="background-color: lightgreen;margin: 5px 5px 0 5px;font-size:24px;width:300px;min-height:300px;">{child.getAttribute("title")}</span>);
		//debugger

		setTimeout(()=>this.select(0), 16);

		return <div class="tab-panel" style="width:300px;">
			<h1 style="width: 300px;margin:0;">{this.titleViews}</h1>
			<div style="border:solid 1px lightgreen;">
				{this.childViews}
			</div>
		</div>;
		//debugger;
	}

	mountTo(parent){
		// debugger;
		this.render().mountTo(parent);
	}
}
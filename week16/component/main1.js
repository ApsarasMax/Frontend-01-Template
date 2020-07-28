// require("./foo.js");

function createElement(Cls, attributes, ...children){
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

	for(let child of children){
		debugger;
		if(typeof child === "string"){
			child = new Text(child);
		}
		o.appendChild(child);
	}
	return o;
}

class Text {
	constructor(text){
		// debugger;
		this.children = [];
		this.root = document.createTextNode(text);
	}

	mountTo(parent){
		// debugger;
		parent.appendChild(this.root);
	}
}

class Wrapper{
	constructor(type){
		// debugger;
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value){
		// debugger;
		this.root.setAttribute(name, value);
	}

	appendChild(child){
		// debugger;
		// child.mountTo(this.root);
		this.children.push(child);
	}

	mountTo(parent){
		// debugger;
		parent.appendChild(this.root);
		for(let child of this.children){
			child.mountTo(this.root);
		}
	}
}

class Div{
	constructor(config){
		// debugger;
		this.children = [];
		this.root = document.createElement("div");
	}

	setAttribute(name, value){
		// debugger;
		this.root.setAttribute(name, value);
	}

	appendChild(child){
		// debugger;
		// child.mountTo(this.root);
		this.children.push(child);
	}

	mountTo(parent){
		// debugger;
		parent.appendChild(this.root);
		for(let child of this.children){
			child.mountTo(this.root);
		}
	}
}

// class Child{
// 	constructor(config){
// 		this.children = [];
// 		this.root = document.createElement("div");
// 	}

// 	setAttribute(name, value){
// 		this.root.setAttribute(name, value);
// 	}

// 	appendChild(child){
// 		child.mountTo(this.root);
// 	}

// 	mountTo(parent){
// 		parent.appendChild(this.root);
// 	}
// }


// let component = <div id="a" class="b" style="width:100px;height:100px;background-color:lightgreen;">
// 	<div></div>
// 	<p></p>
// 	<div></div>
// 	<div></div>
// </div>

let component = <div>{new Wrapper("span")}</div>

component.mountTo(document.body);


console.log(component);
// component.setAttribute(id, "b");

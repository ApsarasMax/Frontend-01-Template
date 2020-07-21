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
}

export class Wrapper{
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

	addEventListener(type, handler, flags){
		this.root.addEventListener(...arguments);
	}

	get style(){
		return this.root.style;
	}

	mountTo(parent){
		// debugger;
		parent.appendChild(this.root);
		for(let child of this.children){
			child.mountTo(this.root);
		}
	}
}
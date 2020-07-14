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

class Carousel{
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
		let children = this.data.map( url => {
				let element = <img src={url} />;
				element.addEventListener("dragstart", event => event.preventDefault());
				return element;
			});
		let root = <div class="carousel">
			{children}
		</div>
		// debugger
		let position = 0;

		// let nextPic = ()=>{
		// 	let nextPosition = (position+1)%this.data.length;

		// 	let current = children[position];
		// 	let next = children[nextPosition];

		// 	current.style.transition = "ease 0s";
		// 	next.style.transition = "ease 0s";

		// 	current.style.transform = `translateX(${-100*position}%)`;
		// 	next.style.transform = `translateX(${100-100*nextPosition}%)`;

		// 	setTimeout(function(){
		// 		current.style.transition = "ease 0.5s";
		// 		next.style.transition = "ease 0.5s";

		// 		current.style.transform = `translateX(${-100-100*position}%)`;
		// 		next.style.transform = `translateX(${-100*nextPosition}%)`;

		// 		position = nextPosition;

		// 	}, 16);

		// 	setTimeout(nextPic, 1000);
		// }
		// setTimeout(nextPic, 1000);

		root.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;
        	let nextPosition = (position+1)%this.data.length;
        	let lastPosition = (position+this.data.length-1)%this.data.length;

            let current = children[position];
            let next = children[nextPosition];
            let last = children[lastPosition];

            current.style.transition = "ease 0s";
			next.style.transition = "ease 0s";
			last.style.transition = "ease 0s";

			current.style.transform = `translateX(${-500*position}px)`;
			next.style.transform = `translateX(${500-500*nextPosition}px)`;
			last.style.transform = `translateX(${-500-500*lastPosition}px)`;

            let move = event => {
                current.style.transform = `translateX(${event.clientX-startX-500*position}px)`;
                next.style.transform = `translateX(${event.clientX-startX+500-500*nextPosition}px)`;
                last.style.transform = `translateX(${event.clientX-startX-500-500*lastPosition}px)`;
            };
            let up = event => {
            	let offset = 0;
            	if(event.clientX-startX>250){
            		offset=1;
            	}else if(event.clientX-startX<-250){
            		offset=-1;
            	}

                current.style.transition = "";
				next.style.transition = "";
				last.style.transition = "";

				current.style.transform = `translateX(${500*offset-500*position}px)`;
                next.style.transform = `translateX(${500*offset+500-500*nextPosition}px)`;
                last.style.transform = `translateX(${500*offset-500-500*lastPosition}px)`;

            	position=(position-offset+this.data.length)%this.data.length;
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })

		return root;
	}

	mountTo(parent){
		// debugger;
		this.render().mountTo(parent);
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

let component = <Carousel data={[
			"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
			"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
			"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
			"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
			]}/>;

component.mountTo(document.body);


console.log(component);
// component.setAttribute(id, "b");

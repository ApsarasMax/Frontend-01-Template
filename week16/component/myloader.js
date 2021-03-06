let parser = require("./parser");

module.exports = function (source, map){
	let tree = parser.parseHTML(source);
	// console.log(parser.parseHTML(source).children[1].children[0].content);
	// console.log("loader is running.\n"+this.resourcePath);

	let template = null;
	let script = null;

	for(let node of tree.children){
		if(node.tagName == "template"){
			template = node.children.filter(e => e.type != "text")[0];
		}
		if(node.tagName == "script"){
			script = node.children[0].content;
		}
	}

	let createCode = "";

	// console.log(tree.children);

	let visit = (node) => {
		if(node.type==="text"){
			return JSON.stringify(node.content);
		}
		console.log("node"+node);
		// console.log("depth"+depth);
		let attrs = {};
		for(let attribute of node.attributes){
			attrs[attribute.name] = attribute.value;
		}

		let children = node.children.map(node => visit(node));
		return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
	};

	// visit(template);

	let res= `
import {createElement, Text, Wrapper} from "./createElement";
export class Carousel {
	setAttribute(name, value){
		this[name]=value;
	}
	render(){
		return ${visit(template)};
	}
	mountTo(parent){
		this.render().mountTo(parent);
	}

}
	`;
	console.log(res);
	return res;
}

// function a(){
	// console.log(this.resourcePath);
// }

// console.log(this.resourcePath);
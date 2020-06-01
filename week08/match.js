const CSSwhat = require('css-what');

function match(element, selector){
	if(!selector || !element.attributes){
		return false;
	}

	let selectorNode = CSSwhat.parse(selector)[0];
	let selectorTag = selectorNode.filter(x => x.type === "tag");
	let selectorId = selectorNode.filter(x => x.type === "attribute" && x.name === "id");
	let selectorClasses = selectorNode.filter(x => x.type === "attribute" && x.name === "class");

	// Checking tag
	if(selectorTag.length && selectorTag[0].name && selectorTag[0].name !== element.tagName){
		console.log("tagName false");
		console.log("");
		return false;
	}

	// Checking id
	if(selectorId.length && selectorId[0].value){
		let elementId = element.attributes.filter(attr => attr.name === "id")[0];
		if(!elementId || selectorId[0].value !== elementId.value)
			return false;
	}

	// Checking classes
	if(selectorClasses.length){
		let elementClasses = element.attributes.filter(attr => attr.name === "class").map(e=>e.value);
		let selectorClassesArray = selectorClasses.map(x => x.value);
		let intersection = selectorClassesArray.filter(x => elementClasses.includes(x));
			if(intersection.length < selectorClassesArray.length)
				return false;
	}

	return true;



	// if(selector.charAt(0) == "#"){

	// 	let attr = element.attributes.filter(attr => attr.name === "id")[0];
	// 	if(attr && attr.value === selector.replace("#", '')){
	// 		return true;
	// 	}
	// }else if(selector.charAt(0) == "."){
	// 	let attr = element.attributes.filter(attr => attr.name === "class")[0];
	// 	if(attr && attr.value === selector.replace(".", '')){
	// 		return true;
	// 	}
	// }else{
	// 	if(element.tagName === selector){
	// 		return true;
	// 	}
	// }
	// return false;
}


function match(string){
	let state = start;
	for(let c of string){
		state = state(c);
	}
	return state === end;
}

function start(char){
	if(char === "a"){
		return foundA1;
	}else{
		return start;
	}
}

function foundA1(char){
	if(char === "b"){
		return foundB1;
	}else if(char === "a"){
		return foundA1;
	}else{
		return start;
	}
}

function foundB1(char){
	if(char === "a"){
		return foundA2;
	}else{
		return start;
	}
}

function foundA2(char){
	if(char === "b"){
		return foundB2;
	}else if(char === "a"){
		return foundA1;
	}else{
		return start;
	}
}

function foundB2(char){
	if(char === "a"){
		return foundA3;
	}else{
		return start;
	}
}

function foundA3(char){
	if(char === "b"){
		return foundB3;
	}else if(char === "a"){
		return foundA1;
	}else{
		return start;
	}
}

function foundB3(char){
	if(char === "x"){
		return end;
	}else if(char === "a"){
		return foundA3;
	}else{
		return start;
	}
}

function end(char){
	return end;
}

// pattern "abababx"
match("123abababababx456")
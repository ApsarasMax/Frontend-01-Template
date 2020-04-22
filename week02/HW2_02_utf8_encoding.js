function utf8_encoding(str) {
	var arr = [];
	for(let i=0;i<str.length;i++){
	    // alert(str.charCodeAt(i));
	    let c = str.charCodeAt(i);
	    alert(c);
	    //Uint8Array()
	    if(c < 128){
	        arr.push(c);
	    }else if(c < 2048){
	        arr.push((c>>6)|192);
	        arr.push((c&63)|128);
	    }else{
	        arr.push((c>>12)|224);
	        arr.push(((c>>6)&63)|128);
	        arr.push((c&63)|128);
	    }
	}
	return arr
}
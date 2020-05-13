

// var obj = new Object();
// obj.id = "Raj";
// obj.children  = [];
// obj.children.push({})
// obj.children[0].id="Foo";
// var jsonString= JSON.stringify(obj);


let resJsonObj = new Object();
let recordingSetObj = new Object();
resJsonObj.id = "Objects";
recordingSetObj.id = "Objects";
resJsonObj.children = [];
recordingSetObj.children = [];
recordingSetObj.set = new Set();


let a = [["node_a", "node_b"], ["node_a", "node_e"], ["node_a", "node_b", "node_c"], ["node_a", "node_b", "node_d"]];

for(let i = 0; i<a.length;i++){
// while(queue.length){
    // debugger;
    // current = queue.shift();
    // console.log(current.path.join('.'));
    let current = a[i];

    let tmpRJO = resJsonObj;
    let tmpRSO = recordingSetObj;

    for(let j = 0; j < current.length; j++){
        let curNode = current[j];
        if(!tmpRSO.set.has(curNode)){
            tmpRJO.children.push({id:curNode})
            tmpRSO.children.push({id:curNode})
            tmpRSO.set.add(curNode)
        }

        tmpRJO = tmpRJO.children.find(element => element.id==curNode);
        tmpRSO = tmpRSO.children.find(element => element.id==curNode);
        // debugger;
        // console.log(tmpRJO.children == null);
        // console.log(tmpRJO.children === null);
        if(tmpRJO.children == null){
	        tmpRJO.children = [];
	        tmpRSO.children = [];
	        tmpRSO.set = new Set();
	    }
    }
}

let jsonString= JSON.stringify(resJsonObj);
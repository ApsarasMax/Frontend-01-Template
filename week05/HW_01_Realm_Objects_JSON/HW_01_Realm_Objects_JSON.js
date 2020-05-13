let globalProperties = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"];

// Tracking queue
let queue = [];
for(let p of globalProperties){
    queue.push({
        path: [p],
        object: this[p]
    })
}
// Set for recording
let set = new Set();
// Json Object for visualization output
let resJsonObj = new Object();
let recordingSetObj = new Object();
resJsonObj.id = "Objects";
recordingSetObj.id = "Objects";
resJsonObj.children = [];
recordingSetObj.children = [];
recordingSetObj.set = new Set();

// Browse all parent objects and loop in all children
while(queue.length){
    let current = queue.shift();
    let path = current.path;

    // Generate JSON
    let tmpRJO = resJsonObj;
    let tmpRSO = recordingSetObj;
    for(let j = 0; j < path.length; j++){
        let curNode = path[j];
        if(!tmpRSO.set.has(curNode)){
            tmpRJO.children.push({id:curNode})
            tmpRSO.children.push({id:curNode})
            tmpRSO.set.add(curNode)
        }

        tmpRJO = tmpRJO.children.find(element => element.id==curNode);
        tmpRSO = tmpRSO.children.find(element => element.id==curNode);

        if(tmpRJO.children == null){
            tmpRJO.children = [];
            tmpRSO.children = [];
            tmpRSO.set = new Set();
        }
    }

    // Code from class
    if(set.has(current.object))
        continue;
    set.add(current.object);
    for(let p of Object.getOwnPropertyNames(current.object)) {
        let property = Object.getOwnPropertyDescriptor(current.object, p);

        if(property.hasOwnProperty("value") 
            && ((property.value != null) && (typeof property.value == "object") || (typeof property.value == "function"))
            && property.value instanceof Object)
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            });

        if(property.hasOwnProperty("get") && typeof property.get == "function"){
            queue.push({
                path: current.path.concat([p]),
                object: property.get
            });
        }

        if(property.hasOwnProperty("set") && typeof property.set == "function"){
            queue.push({
                path: current.path.concat([p]),
                object: property.set
            });
        }

    }
}

// Output which can be used in G6 for visualization
let jsonString= JSON.stringify(resJsonObj);
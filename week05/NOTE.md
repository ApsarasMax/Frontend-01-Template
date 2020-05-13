# 每周总结可以写在这里

### General



*   JS执行粒度
    *   直接量 / 变量 / this
    *   表达式
    *   语句 / 声明
    *   函数调用 (Execution Context)
        *   Execution Context Stack
    *   微任务 (Promise)
    *   宏任务
    *   JS Context => Realm
*   浏览器工作原理
    *   URL (HTTP)
    *   HTML (parse)
    *   DOM (CSS computing)
    *   DOM with CSS (layout)
    *   DOM with position (render)
    *   Bitmap
*   ISO-OSI 七层网络模型
    *   HTTP在TCP基础上加上request和response
*   Javascript code examples
    *   let queue = [1, 2, 3];

        console.log(queue) // (3) [1, 2, 3]


        let cur = queue.shift();


        console.log(queue) // (2) [2, 3]


        console.log(cur) // 1

    *   let a = Boolean;

        Object.getOwnPropertyNames(a);  //  ["length", "name", "prototype"]

    *   for (let p of Object.getOwnPropertyNames(a)){

        	let p_dsct = Object.getOwnPropertyDescriptor(a, p); // value, writtable, enumerable, configurable, get, set


        }

    *   property.hasOwnProperty(“value”)
*   Node environment
    *   Node JS first step learning
        *   In node.js, you can do similar things as you do within browser console, but some diffs:
            *   in console, the global object is “window”, in node, the global object is “global”
            *   in console, there is a “document” object for page rendering, int node, there is a “process” object for the rendering process

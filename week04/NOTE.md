# 每周总结可以写在这里

### General



*   Promise
    *   Case 1:

            new Promise(resolve => resolve()).them(()=>console.log(“1”))


            setTimeout(function(){


                console.log(“2”)


            }, 0)


            console.log(“3”)


            Answer: 3 1 2

    *   Case 2:

            new Promise(resolve => (console.log(“0”), resolve())).then(()=>console.log(“1”))


            setTimeout(function(){


                console.log(“2”)


            new Promise(resolve => resolve()).them(()=>console.log(“3”))


            }, 0)


            console.log(“4”)


            console.log(“5”)


            Answer: 0 4 5 1 2 3

    *   Case 3:

            async function afoo(){


            	console.log(“-2”)


            	await new Promise(resolve => resolve());


            console.log(“-1”)


            }


            new Promise(resolve => (console.log(“0”), resolve())).them(()=>console.log(“1”))


            setTimeout(function(){


                console.log(“2”)


            new Promise(resolve => resolve()).them(()=>console.log(“3”))


            }, 0)


            console.log(“4”)


            console.log(“5”)


            afoo()


            Answer: 0 4 5 -2 1 -1 2 3

    *   Case 4:

            new Promise(res => res())


            .then(()=>setTimeout(()=>console.log(1), 1000),console.log(0)


            );


            console.log(2)


            Answer: 0 2 1

    *   Case 5:

            async function async1(){


            	console.log(‘async 1 start’);


            	await async2();


            	console.log(‘async 1 end’);


            }


            async function async2(){


            	console.log(‘async2’);


            }


            async1();


            new Promise(function(resolve){


            	console.log(‘promise 1’);


            resolve();


            }).then(function(){


            	console.log(‘promise 2’);


            })


            Different answers between Chrome and Safari

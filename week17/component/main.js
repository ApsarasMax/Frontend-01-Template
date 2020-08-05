// require("./foo.js");
import {createElement, Text, Wrapper} from "./createElement";
import {Carousel} from "./carousel.js";
import {TabPanel} from "./tabpanel.js";
import {ListView} from "./listview.js";



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

// let panel = <TabPanel title="this is my panel">
// <span>This is content</span>
// </TabPanel>

// let panel = <TabPanel>
// <span title="title1">This is content1</span>
// <span title="title2">This is content2</span>
// <span title="title3">This is content3</span>
// <span title="title4">This is content4</span>
// </TabPanel>

// panel.mountTo(document.body);
// window.panel=panel;

// console.log(component);
// component.setAttribute(id, "b");

// let data=[
// 	{title:"cat1",url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
// 	{title:"cat2",url:"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
// 	{title:"cat3",url:"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
// 	{title:"cat4",url:"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}
// ]

// let list = <ListView data={data}>
// 	{record => <figure>
// 		<img src={record.url}/>
// 		<figcaption>{record.title}</figcaption>
// 	</figure>}
// </ListView>
// //debugger

// list.mountTo(document.body);

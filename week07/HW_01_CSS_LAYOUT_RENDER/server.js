const http = require("http");

const server = http.createServer((req, res) => {
	console.log("request received");
	console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`
<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}

#myid2{
  height: 100px;
  width:100px;
  background-color: rgb(0,255,0);
  border-width: 10px;
  border-style: solid;
  border-color: yellow;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
    <div id="myid2"></div>
</body>
</html>
  	`);
});

server.listen(8088);
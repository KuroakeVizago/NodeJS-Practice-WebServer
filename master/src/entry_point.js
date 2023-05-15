const http = require("http");

const onRequest = (request, response)=>
{
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "NodeJS");
 
    const { method, url } = request;
 
    if(url === "/") {
        if(method === "GET") 
        {
            response.statusCode = 200;
            response.end(JSON.stringify(
                {
                    message: "Default Homepage"
                }
            ));
        } 
        else 
        {
            response.statusCode = 400;
            response.end(JSON.stringify(
                {
                    message: `This page cannot be accessed with ${method} request`
                }
            ));
        }

    } 
    else if(url === "/about") 
    {
        if(method === "GET") 
        {
            response.statusCode = 200;
            response.end(JSON.stringify(
                {
                    message: "This is about page" 
                }    
            ));
        } 
        else if(method === "POST") 
        {
            response.statusCode = 200;

            let body = [];
    
            request.on("data", (chunk) => {
                body.push(chunk);
            });
 
            request.on("end", () => {
                
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);

                response.end(JSON.stringify(
                    {
                        message: `Hello, ${name}! Ini adalah halaman about`
                    }
                ));
            });

        }
        else 
        {
            response.statusCode = 400;
            response.end(JSON.stringify(
                {
                    message: `Page cannot be accessed using ${method} request!!!`,
                }
            ));
        }
    } 
    else 
    {
        response.statusCode = 404;
        response.end(JSON.stringify(
            {
                message: "Page is not found!!!",
            }
        ));
    }

};

const server = http.createServer(onRequest);

const port = 5000;
const host = "localhost";

server.listen(port, host, ()=>
{
    console.log("Server is running at: " + host + ":" + port);
});

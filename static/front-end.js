'use strict';
(function()
{
    function printOutSomething(x)
    {
        const element = document.getElementById("div1");
        for (let i = 0; i < x.length; i++)
        {
            const para = document.createElement("p" + i.toString());
            const node = document.createTextNode(x[i]);
            para.appendChild(node);
            element.appendChild(para);
        }
        document.getElementById("h1").innerHTML = x;
    }

    function getRequest(url)
    {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send()
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            route = JSON.parse(this.response)['route']
            printOutSomething(route)
          }
        }
    }

    document.getElementById("submit").onclick = function()
    {
        let url = "/api/v1/?source=" + document.getElementById("src").value + "&destination=" + document.getElementById("dest").value
        getRequest(url);
    };
}())
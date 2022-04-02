'use strict';
(function()
{
    function printOutSomething(x)
    {
        const element = document.getElementById("div1");
        document.write(5)
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
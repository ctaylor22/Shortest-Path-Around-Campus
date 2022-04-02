'use strict';
(function()
{
    function printOutSomething(x)
    {
        document.getElementById("h1").innerHTML = x;
    }

    function getRequest(url)
    {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send()
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            printOutSomething(JSON.parse(this.response['Yay']))
          }
        }
    }

    document.addEventListener('dblclick', function()
    {
        let url = "/api/v1/"
        getRequest(url);
    });
}())
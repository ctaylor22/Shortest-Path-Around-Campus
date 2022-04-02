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
          if (this.status >= 200 && this.status < 400)
          {
            printOutSomething(this.response)
          }
        }
    }

    document.getElementById("submit").addEventListener('click', function()
    {
        let url = "/api/v1/?source=" + document.getElementById("src").value + "&destination=" + document.getElementById("dest").value
        getRequest(url);
    });
}())
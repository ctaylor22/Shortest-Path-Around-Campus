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
            printOutSomething(this.response)
          }
        }
    }

    document.getElementById("submit").onclick = function()
    {
        document.getElementById("h2").innerHTML = "Clicked";
        document.getElementById("h3").innerHTML = document.getElementById("src").value;
        document.getElementById("h4").innerHTML = document.getElementById("dest").value;

        let url = "/api/v1/?source=" + document.getElementById("src") + "&destination=" + document.getElementById("dest")
        getRequest(url);
    };
}())
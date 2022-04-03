'use strict';
(function()
{
    function printOutSomething(x)
    {
        x = x.replace("[", "");
        x = x.replace("]", "");
        x = x.replace(/['"]+/g, "");
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

    let stations = [];
    let links = document.getElementById("waypoint_icons");
    links.addEventListener('click', function(event)
    {
        if (stations.length == 0)
        {
            event.target.setAttribute('fill', "#FF0000");
            stations.push(event.target.id);
        }
    });
    document.getElementById("submit").addEventListener('click', function()
    {
        let url = "/api/v1/?source=" + document.getElementById("src").value + "&destination=" + document.getElementById("dest").value
        getRequest(url);
    });
}())
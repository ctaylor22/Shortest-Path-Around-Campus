'use strict';
(function()
{
    function markPath(path)
    {
        path = path.replace("[", "");
        path = path.replace("]", "");
        path = path.replace(/['"]+/g, "");
        shortestPath = path.split(",");
        for (let i = 0; i < path.length; i++)
        {
            let station = document.getElementById(path[i]);
            let radius = parseFloat(station.getAttribute('r')) + 2;
            station.setAttribute('r', radius);
            station.setAttribute('fill', "#00FFFF");
        }
    }

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
    let shortestPath = [];
    let links = document.getElementById("stns_icons");
    links.addEventListener('click', function(event)
    {
        if (stations.length == 0)
        {
            event.target.setAttribute('fill', "#FF0000");
            stations.push(event.target.id);
        }
        else if (stations.length == 1)
        {
            event.target.setAttribute('fill', "#00FF00");
            stations.push(event.target.id);
      
            let url = "/api/v1/?start=" + stations[0] + "&end=" + stations[1];
            getRequest(url);
      
        }
        event.preventDefault();
    });

    document.getElementById("submit").addEventListener('click', function()
    {
        let url = "/api/v1/?source=" + document.getElementById("src").value + "&destination=" + document.getElementById("dest").value
        getRequest(url);
    });
}())
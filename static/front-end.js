'use strict';
(function()
{
    function markPath(path)
    {
        path = path.replace("[", "");
        path = path.replace("]", "");
        path = path.replace(/['"]+/g, "");
        shortestPath = path.split(",");
        // path_len = shortestPath[shortestPath.length - 1];
        // shortestPath.pop();
        // document.getElementById("h1").innerHTML = path_len;

        for (let i = 0; i < shortestPath.length; i++)
        {
            let station = document.getElementById(shortestPath[i]);
            let radius = parseFloat(station.getAttribute('r')) + 2;
            station.setAttribute('r', radius);
            station.setAttribute('fill', "#FAED27");
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
            markPath(this.response);
          }
        }
    }

    let shortestPath = [];
    let stations = [];
    let links = document.getElementById("waypoint_icons");
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
            
            let url = "/api/v1/?source=" + stations[0] + "&destination=" + stations[1];
            console.log(url);
            getRequest(url);
        }
        event.preventDefault();
    });
}())
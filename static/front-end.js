'use strict';
var handicap = false;
var unacceptable_vertices = [
    "Amphitheater intersection",
    "Gravel intersection",
    "Canyon west entrance",
    "Canyon north entrance",
    "Spil stairs",
    "Pavilion",
    "Suites lot",
    "Canyon north path",
    "Canyon south path"];

var warning_entrances = [
    "EHS north entrance",
    "EHS east entrance",
    "Brougher Hall entrance",
    "Minthorn entrance",
    "Klages east entrance"];

(function()
{
    function handicapBox()
    {
        var checkBox = document.getElementById("myCheck");
        handicap = checkBox.checked
    }

    function reset(e)
    {
        for (let i = 0; i < waypoints.length; i++)
        {
            document.getElementById(waypoints[i]).setAttribute('fill', "#FFFFFF");
        }
        waypoints = [];
        if (shortestPath != [])
        {
            for (let i = 0; i < shortestPath.length; i++)
            {
                let station = document.getElementById(shortestPath[i]);
                let radius = parseFloat(station.getAttribute('r')) - 2;
                station.setAttribute('r', radius);
                station.setAttribute('fill', "#FFFFFF");
            }
            shortestPath = [];
        }
        e.preventDefault();
    }

    function markPath(path)
    {
        path = path.replace("[", "");
        path = path.replace("]", "");
        path = path.replace(/['"]+/g, "");
        shortestPath = path.split(",");
        // path_len = shortestPath[shortestPath.length - 1];
        document.getElementById("h1").innerHTML = "Path Length: " + shortestPath[shortestPath.length - 1] + "Feet";
        document.getElementById("h3").innerHTML = "Estimated Time: " + (parseFloat(shortestPath[shortestPath.length - 1]) * 0.003246753246753247).toFixed(1) + " Minutes";
        shortestPath.pop();

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
        request.onload = function()
        {
            if (this.status >= 200 && this.status < 400)
            {
                markPath(this.response);
            }
        }
    }

    let shortestPath = [];
    let waypoints = [];
    let links = document.getElementById("waypoint_icons");
    links.addEventListener('click', function(event)
    {
        if (waypoints.length == 0)
        {
            event.target.setAttribute('fill', "#FF0000");
            waypoints.push(event.target.id);
        }
        else if (waypoints.length == 1)
        {
            event.target.setAttribute('fill', "#00FF00");
            waypoints.push(event.target.id);
            
            let url = "/api/v1/?source=" + waypoints[0] + "&destination=" + waypoints[1] + "&handicap=" + handicap;
            console.log(url);
            getRequest(url);
        }
        event.preventDefault();
    });

    document.addEventListener('dblclick', reset);
    let tapped = false;
    document.addEventListener('touchstart', function(e)
    {
        if(!tapped){
            tapped=setTimeout(function(){ tapped=false; },300);
        }
        else
        {
            clearTimeout(tapped);
            tapped=false;
            reset(e);
        }
    });
    document.getElementById("Handicap").addEventListener('click', function(e)
    {
        handicap = document.getElementById("Handicap").checked

        if (handicap)
        {
            for (let i = 0; i < unacceptable_vertices.length; i++)
            {
                let waypoint = document.getElementById(unacceptable_vertices[i]);
                waypoint.setAttribute('r', 0);
            }

            for (let i = 0; i < warning_entrances.length; i++)
            {
                let waypoint = document.getElementById(warning_entrances[i]);
                waypoint.setAttribute('stroke', "#FF0000");
            }
        }
        else
        {
            for (let i = 0; i < unacceptable_vertices.length; i++)
            {
                let waypoint = document.getElementById(unacceptable_vertices[i]);
                waypoint.setAttribute('r', 3);
            }
            for (let i = 0; i < warning_entrances.length; i++)
            {
                let waypoint = document.getElementById(warning_entrances[i]);
                waypoint.setAttribute('stroke', "#000000");
            }
        }
    });
}())
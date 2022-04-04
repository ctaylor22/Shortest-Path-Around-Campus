'use strict';
var handicap = false;

(function()
{
    // Resets things selected by using double click
    function reset(e)
    {
        document.getElementById("h1").innerHTML = "Path Length:"
        document.getElementById("h3").innerHTML = "Estimated Time:"
        for (let i = 0; i < waypoints.length; i++)
        {
            document.getElementById(waypoints[i]).setAttribute('fill', "#FFFFFF");
        }
        waypoints = [];
        if (shortestPath != [])
        {
            // resets waypoints back to default
            for (let i = 0; i < shortestPath.length; i++)
            {
                let station = document.getElementById(shortestPath[i]);
                let radius = parseFloat(station.getAttribute('r')) - 2;
                station.setAttribute('r', radius);
                station.setAttribute('fill', "#FFFFFF");
            }
            // empties selected vertices
            shortestPath = [];
        }
        e.preventDefault();
    }

    // Marks the path on the svg file by changing the elements in it
    function markPath(path)
    {
        // puts shortest path into an array to loop through
        path = path.replace("[", "");
        path = path.replace("]", "");
        path = path.replace(/['"]+/g, "");
        shortestPath = path.split(",");

        // Path length is last thing in array
        document.getElementById("h1").innerHTML = "Path Length: " + shortestPath[shortestPath.length - 1] + "Feet";
        // Calculates the estimated time
        document.getElementById("h3").innerHTML = "Estimated Time: " + (parseFloat(shortestPath[shortestPath.length - 1]) * 0.003246753246753247).toFixed(1) + " Minutes";
        shortestPath.pop();

        for (let i = 0; i < shortestPath.length; i++)
        {
            // changes color of the path and makes the circles bigger
            let station = document.getElementById(shortestPath[i]);
            let radius = parseFloat(station.getAttribute('r')) + 2;
            station.setAttribute('r', radius);
            station.setAttribute('fill', "#FAED27");
        }
    }

    // Sends a request to the selected url and waits for response
    function getRequest(url)
    {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send()
        request.onload = function()
        {
            // gets from python and sends the shortest path and path length to mark path
            if (this.status >= 200 && this.status < 400)
            {
                markPath(this.response);
            }
        }
    }

    let shortestPath = [];
    let waypoints = [];

    // All the points on the map
    let links = document.getElementById("waypoint_icons");

    // Listens for click of any of the circles on the map
    links.addEventListener('click', function(event)
    {
        // source pressed just lights up
        if (waypoints.length == 0)
        {
            event.target.setAttribute('fill', "#FF0000");
            waypoints.push(event.target.id);
        }
        // second waypoint pressed sends the source and destination to Djikstra's in python
        else if (waypoints.length == 1)
        {
            event.target.setAttribute('fill', "#00FF00");
            waypoints.push(event.target.id);
            
            // builds url with the source, destination and whether handicap accessibility is checked
            let url = "/api/v1/?source=" + waypoints[0] + "&destination=" + waypoints[1] + "&handicap=" + handicap;
            console.log(url);
            getRequest(url);
        }
        event.preventDefault();
    });

    // On double click run reset
    document.addEventListener('dblclick', reset);
    let tapped = false;
    // sets timeout for double clicked
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
    
    // if handicap check box is checked make unaccessible waypoints not available
    document.getElementById("Handicap").addEventListener('click', function(e)
    {
        // gets checkbox
        handicap = document.getElementById("Handicap").checked

        if (handicap)
        {
            // makes the non handicap accessible vertices unavailable
            for (let i = 0; i < unacceptable_vertices.length; i++)
            {
                let waypoint = document.getElementById(unacceptable_vertices[i]);
                waypoint.setAttribute('r', 0);
            }

            // sets red circles around entrance vertices which have stairs
            for (let i = 0; i < warning_entrances.length; i++)
            {
                let waypoint = document.getElementById(warning_entrances[i]);
                waypoint.setAttribute('stroke', "#FF0000");
            }
            let url = "/api/v1/?source=" + waypoints[0] + "&destination=" + waypoints[1] + "&handicap=" + handicap;
            console.log(url);
            getRequest(url);
        }
        else
        {
            // Sets back to default
            for (let i = 0; i < unacceptable_vertices.length; i++)
            {
                let waypoint = document.getElementById(unacceptable_vertices[i]);
                waypoint.setAttribute('r', 3);
            }
            // Sets back to default
            for (let i = 0; i < warning_entrances.length; i++)
            {
                let waypoint = document.getElementById(warning_entrances[i]);
                waypoint.setAttribute('stroke', "#000000");
            }
            let url = "/api/v1/?source=" + waypoints[0] + "&destination=" + waypoints[1] + "&handicap=" + handicap;
            console.log(url);
            getRequest(url);
        }
    });
}())
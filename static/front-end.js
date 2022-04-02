'use strict';
(function()
{
    function printOutSomething(x)
    {
        document.write(x)
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

    document.addEventListener('dblclick', function(event)
    {
        let url = "/api/v1/"
        getRequest(url);
    });
}())
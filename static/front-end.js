'use strict';
(function()
{
    function printOutSomething()
    {
        document.write(5 + 1)
    }

    function getRequest(url)
    {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send()
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            printOutSomething()
          }
        }
    }

    document.addEventListener('dblclick', function()
    {
        let url = "/api/v1/"
        getRequest(url);
    });
}())
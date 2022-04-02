'use strict';
(function()
{
    function printOutSomething()
    {

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
}())
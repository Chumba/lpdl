function click(event) {
    
    var trackID = event.srcElement.parentNode.getAttribute("id");
    trackID = String.prototype.replace.call(trackID, "track-", "");
    httpGetAsync("http://www.livephish.com/bigriver/subPlayer.aspx?HLS=1&callback=angular.callbacks._9&trackID=" + trackID, download);

}

function download(responseText)
{
    var dlLink = String.prototype.substring.call(responseText, 36);
    dlLink = String.prototype.split.call(dlLink, '\"')[0];

    var link = document.createElement("a");
    link.download = "song.m4a";
    link.href = dlLink;
    document.body.appendChild(link);
    link.click();
    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();

  

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    
    xmlHttp.send(null);
}

function main()
{
    rows = document.getElementsByClassName("track-row");
    rows = Array.prototype.slice.call(rows, 0);

    for(var i = 0;i < rows.length; i++) {
        var button = document.createElement("button");
        var textNode = document.createTextNode("download");
        button.setAttribute("id", "download_" + i);
        button.setAttribute("href", "javascript:void(0)");
        button.setAttribute("style", "margin-left: 5px; margin-top: 5px;");
        button.appendChild(textNode);
        rows[i].insertBefore(button, rows[i].childNodes[0]);
        button.addEventListener('click', click);
    }   
}


window.onload = function(){
    main();
};
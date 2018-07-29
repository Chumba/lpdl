/* Click event for the download buttons */
function click(event) {
    var trackID = event.srcElement.parentNode.getAttribute("id");
    trackID = String.prototype.replace.call(trackID, "track-", "");
    httpGetAsync("http://www.livephish.com/bigriver/subPlayer.aspx?HLS=1&callback=angular.callbacks._9&trackID=" + trackID, download);
}

async function clickAll(event) {
    var downloadButtons = document.getElementsByClassName("downloadTrack");
    for(var i = 0; i < downloadButtons.length; i++) {
        var trackID = downloadButtons[i].parentNode.getAttribute("id");
        trackID = String.prototype.replace.call(trackID, "track-", "");
        await httpGetAsync("http://www.livephish.com/bigriver/subPlayer.aspx?HLS=1&callback=angular.callbacks._9&trackID=" + trackID, download);
        await Wait();
    }   
}


/* parses the response text, and downloads the file */
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

async function Wait() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two second later');
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

/* Gets the page which contains our download link */
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    
    xmlHttp.send(null);
}

/* Main functionality was done this way to be able to wait for onload event  */
window.onload = function(){
    rows = document.getElementsByClassName("track-row");

    for(var i = 0;i < rows.length; i++) {
        var button = document.createElement("button");
        var textNode = document.createTextNode("Download track");
        button.setAttribute("id", "download_" + i);
        button.setAttribute("class", "downloadTrack")
        button.setAttribute("href", "javascript:void(0)");
        button.setAttribute("style", "margin-left: 5px; margin-top: 5px;");
        button.appendChild(textNode);
        rows[i].insertBefore(button, rows[i].childNodes[0]);
        button.addEventListener('click', click);
    }   

    playSection = document.getElementsByClassName("recording-controls")[0];
    var button = document.createElement("button");
    var textNode = document.createTextNode("Download Release");
    button.setAttribute("id", "downloadAll_" + i);
    button.setAttribute("href", "javascript:void(0)");
    button.setAttribute("style", "margin-left: 5px; margin-top: 5px;");
    button.appendChild(textNode);
    playSection.insertBefore(button, playSection.childNodes[0]);
    button.addEventListener('click', clickAll);

};
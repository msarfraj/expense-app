function changeMonth(sel) {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    console.log(path);
    console.log(sel);
    var xhttp = new XMLHttpRequest();
    let json = JSON.stringify({
        month: sel
    });
    xhttp.open("POST", "/getMothData", true);
    xhttp.setRequestHeader('Content-type','application/json');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("content").innerHTML = xhttp.responseText;
        }
    };

    xhttp.send(json);

}
window.onload = function()	{
    var fetch_get_url = "https://payroctest-default-rtdb.europe-west1.firebasedatabase.app/[PATH].json";
    
    //path is the key in fireabase datastore
    var path = window.location.pathname;
    
    if(path != "/" && path.length > 0) {   //redirect user if correct key
        fetch_get_url = fetch_get_url.replace("[PATH]", path);
        
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        //fetch original url from firebase realtime datastore and return
        fetch(fetch_get_url)
          .then(response => (response.json())
          .then(data => JSON.stringify(data))
          .then(data => {
              let originalUrl_json = JSON.parse(data);
              parse_json(originalUrl_json);
            })
          .catch(error => console.log('error', error)));
          
    }   else    {
        //display generic readme if no path specified
        document.getElementById("readme").innerHTML = "<div><p><h2>Hello World! (=</h2></p> Thank you for using the URL shortening service. Please go to <b><a href='http://irelandmalayalikal.ie/add.html'>http://irelandmalayalikal.ie/add.html</a></b> to shorten new URL. The final shortened URL will be shown as alert.</div>";
        document.getElementById("readme").style.display = "block";
    }
};

/*
Function to parse the JSON from fireabse realtime datastore. JSON received contain the path as key and original url as value.
*/
function parse_json(originalUrl_json)    {
    let originalUrl = "";
    for(var i in originalUrl_json)
    {
        originalUrl = JSON.stringify(originalUrl_json[i]);
    }
    
    redirect(originalUrl);
}

//redirect to original url
function redirect(originalUrl) {
    var protocol = "";
    protocol = originalUrl.substring(1, originalUrl.indexOf(':')+3);
    originalUrl = originalUrl.substring(originalUrl.indexOf(":")+3, originalUrl.length-1);
    window.location.replace(protocol + "" + originalUrl);
}

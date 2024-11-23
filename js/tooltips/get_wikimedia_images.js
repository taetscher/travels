export function fetch_wiki_images (page_name){
    return new Promise(function(resolve, reject) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        list: "allimages",
        titles: page_name,
        aifrom: page_name,
        format: "json",
        aiprop: "url",
        aisort: "name",
        aidir: "newer",
        ailimit: "18"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(`requesting ${url}`)

    var img_response = [];

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var imgs = response.query.allimages;

            for (var i = 0; i < imgs.length; i++) {
                var img_url = imgs[i].url;
                img_response.push(img_url);
            }
        })
        .then(function(){
            if (img_response.length < 1){
                console.log('did not find any images on wikimedia commons.');
                reject();
            }
            else {
                console.log(`found some nice images on wikimedia commons! :-)`);
                resolve(img_response);
            }
        })
        .catch(function(error){console.log(error);});
    }
    )
}


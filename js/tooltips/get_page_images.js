export function fetch_wiki_images (page_name){
    return new Promise(function(resolve, reject) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        prop: "images",
        titles: page_name,
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(`requesting ${url}`)

    var img_response = [];

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            for (var page in pages) {
                for (var img of pages[page].images) {
                    var img_title = img.title;
                    var img_name = img_title.replaceAll(' ', '_');
                    var media_url = fetch(String.raw`https://commons.wikimedia.org/wiki/${img_name}#/media/${img_name}`);
                    img_response.push(media_url);
                }
            }
        })
        .then(function(){
            console.log(img_response)
            console.log(`found ${img_response.length} images`)

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

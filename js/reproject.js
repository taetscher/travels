export async function reprojectFromLink(link, targetCRS){
    /** takes a link to a geojson file and reprojects it into its target CRS using OGRE
    *@param {string} link        link to geojson file
    *@param {string} targetCRS   target coordinate system (e.g. EPSG:4326)
    *@return {geojson object} parsed   the reprojected geojson
    *@return {string} timestamp   timestamp of the data
    */
    
    const json_file = await fetch(link)
    .then(function(response){
        const json = response.json();
        return json})
    
    const reprojected = await ogrePOSTrequest(json_file, targetCRS);

 
    return [reprojected, reprojected.timestamp]
};



export async function ogrePOSTrequest(json_file, targetCRS){
    /** Takes a json file and a target coordinate system and sends a POST request to http://ogre.adc4gis.com/convert for reprojection of the input file.
    *@param {string} json_file   json object
    *@param {string} targetCRS   target coordinate system 
    *@return {geojson object}   returns the reprojected geojson
    */
    
    
    //prepare FormData (fake a json file to be able to upload it to ogre)
    var formData = new FormData();
    var blob = new Blob([JSON.stringify(json_file)], { type: 'text/json' });
    formData.append('upload', blob, 'bafujson.json');
    formData.append('targetSrs', targetCRS)
    
    //make the POST request
    var ogre = 'http://ogre.adc4gis.com/convert';
    const request = await fetch(ogre, {
        method: 'POST',
        body: formData
    })
    .then(function(response){
        return response.json()
    })
    
    return request
}
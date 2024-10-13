//CHECK LICENCE FIRST!
//LICENCING: https://www.geo.admin.ch/de/geo-dienstleistungen/geodienste/darstellungsdienste-webmapping-webgis-anwendungen/web-map-services-wms.html
//SEE http://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&lang=de for more Layers



export function addWasserTemp(map){
    
    var name = 'wasserTempMess';
    var link = ['http://wms.geo.admin.ch/?&BBOX={bbox-epsg-3857}&LAYERS=ch.bafu.hydroweb-messstationen_temperatur&FORMAT=image/png&STYLE=default&SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&SRS=EPSG:3857&WIDTH=512&HEIGHT=512']
    
    //add source 
    map.addSource(name, {type: "raster", tiles: link, tilesize: 256});
    
    //add layer
    map.addLayer({
        id: name + "_layer",
        type: "raster",
        source: name,
        paint:{"raster-opacity": 0.8}
    });
}
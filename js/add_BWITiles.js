export function addBWIRasterTiles(map) {
    /** Adds BWI-Raster Tiles to a map object
    *@param  {mapbox map object}   map   The map object which receives the BWI rastertiles
    */
    
    //adding a local raster tile source
    map.addSource('raster_Tiling_test', {
            'type': 'raster',
            'tiles': ['./rasterTiles/randomTiles/{z}/{x}/{y}.png'],
            'tileSize': 256
            
        })
    
    //only after a source was set can the feature be added
    map.addLayer({
        'id': 'randomTiles',
        'type': 'raster',
        'source': 'raster_Tiling_test',
        'minzoom': 6,
        'maxzoom': 20
        })
    
    //adjust opacity of raster tiles
    map.setPaintProperty('randomTiles', 'raster-opacity', 0.2);
    
    //-------------- USER INTERACTION HANDLING START --------------------

        
    //WORK IN PROGRESS: GET RASTER VALUES UNDER MOUSE CURSOR
    //getRGBAunderCursor(map)

    
    //-------------- USER INTERACTION HANDLING END --------------------
}

function getRGBAunderCursor(map){
    
    //WORK IN PROGRESS: GET RASTER VALUES UNDER MOUSE CURSOR
    //TODO: find out if there is a way with which only the raster tiles can be read 
    map.on('mousemove', function (e) {
        const canvas = map.getCanvas(); 
        const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
        if (gl) {
            const { point } = e;
            const { x, y } = point;            
            const data = new Uint8Array(4);
            const canvasX = x - canvas.offsetLeft;
            const canvasY = canvas.height - y - canvas.offsetTop;
            gl.readPixels(canvasX, canvasY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
            const [r, g, b, a] = data;
            const color = `rgba(${r}, ${g}, ${b}, ${a})`;
            console.log(`Color at (${x}, ${y}) = ${color}`);
        }
    })
}
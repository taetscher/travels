
import {addPOIs} from './add_poi.js';
import {addTravels} from './add_travels.js';


//-------------- INITIALIZE MAP START --------------------
//create new map
const map = new maplibregl.Map({
            container: 'map',
            style: 'https://api.maptiler.com/maps/landscape/style.json?key=9evOdBDbZ9ckseqCzPcE', // 100k free requests per Month
            hash: true, //set this to true when productive (shows xyz in URL and updates it on the fly)
            minZoom: 1,
            maxZoom: 19,
            center: [28.43, -8.09],
            zoom: 2
            //,preserveDrawingBuffer: true
          });

//add map control (navigation) buttons
map.addControl(new maplibregl.NavigationControl());

//create a popup object (not added to map yet)
//do this here, so only one is added
const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
    });

//when map is loaded, load additional layers
map.on('load', function() {
    
    addTravels(map, popup);
    addPOIs(map, popup);

});

//-------------- INITIALIZE MAP END --------------------

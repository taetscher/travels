
import {addPOIs} from './add_poi.js';
import {addTravels} from './add_travels.js';


//-------------- INITIALIZE MAP START --------------------
//create new map
var map = new mapboxgl.Map({
            container: 'map',
            style: 'https://api.maptiler.com/maps/landscape/style.json?key=9evOdBDbZ9ckseqCzPcE', // 100k free requests per Month
            hash: true, //set this to true when productive (shows xyz in URL and updates it on the fly)
            minZoom: 1,
            maxZoom: 19,
            center: [8.38,46.747],
            zoom: 6.2
            //,preserveDrawingBuffer: true
          });

//add map control (navigation) buttons
map.addControl(new mapboxgl.NavigationControl());

//create a popup object (not added to map yet)
//do this here, so only one is added
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });

//when map is loaded, load additional layers
map.on('load', function (){
    
    addTravels(map, popup);
    addPOIs(map, popup);

});

//-------------- INITIALIZE MAP END --------------------

export async function loadIcons(map){

    const airport = await map.loadImage('./mapstyles/icons/custom_airport.png');
    const city = await map.loadImage('./mapstyles/icons/custom_city.png');
    const hotel = await map.loadImage('./mapstyles/icons/custom_hotel.png');
    const metropolitan_signature = await map.loadImage('./mapstyles/icons/custom_metropolitan_area.png');
    const poi_signature = await map.loadImage('./mapstyles/icons/custom_point_of_interest.png');
    const port = await map.loadImage('./mapstyles/icons/custom_port.png');
    const small_dwelling = await map.loadImage('./mapstyles/icons/custom_small_dwelling.png');
    const village = await map.loadImage('./mapstyles/icons/custom_village.png');
    
    map.addImage('custom_airport', airport.data);
    map.addImage('custom_city', city.data);
    map.addImage('custom_hotel', hotel.data);
    map.addImage('custom_metropolitan_area', metropolitan_signature.data);
    map.addImage('custom_point_of_interest', poi_signature.data);
    map.addImage('custom_port', port.data);
    map.addImage('custom_small_dwelling', small_dwelling.data);
    map.addImage('custom_village', village.data);

}
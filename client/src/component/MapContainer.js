import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

Geocode.setApiKey("put your api key");
// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("ca");
// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
Geocode.enableDebug();
export default function MapContainer(props) {
	// const [defaultCenter, setDefaultCenter] = useState({});
	const mapStyles = {
		height: "200px",
		width: "200px",
	};

	return (
		<LoadScript googleMapsApiKey="put your api key">
			<GoogleMap mapContainerStyle={mapStyles} zoom={13} center={props.temp}>
				<Marker position={props.temp} />
			</GoogleMap>
		</LoadScript>
	);
}

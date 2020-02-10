import React from "react";

import Itineraries from "../components/Itineraries";
import Footer from "../components/Footer";

export default function CityView(props) {
  console.log(props);

  return (
    <div>
      <h2>City details go Here</h2>
      <Itineraries city_ref={props.match.params.id} />
      <Footer />
    </div>
  );
}

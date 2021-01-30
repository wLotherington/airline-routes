import React from 'react';

const Map = ({ filteredRoutes, airportFilter, setAirportFilter, DATA }) => {
  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        
        {filteredRoutes().map(route => {
          let airport1 = DATA.airports.find(airport => airport.code === route.src)
          let airport2 = DATA.airports.find(airport => airport.code === route.dest)

          let x1 = airport1.long
          let y1 = airport1.lat
          let x2 = airport2.long
          let y2 = airport2.lat

          const handleClick = airport => {
            if (airportFilter === airport) {
              setAirportFilter("");
            } else {
              setAirportFilter(airport);
            }
          };

          const destClass = {
            fill: "black",
          };

          const routeSize = (airport) => {
            return DATA.routes.filter(route => route.src === airport || route.dest === airport).length / 10 + 0.5
          };

          return (
            <g key={route.airline + route.src + route.dest}>
              <circle className="airport" style={{r: routeSize(route.src)}} cx={x1} cy={y1} onClick={() => handleClick(route.src)}>
                <title></title>
              </circle> 
              <circle className="airport" style={{r: routeSize(route.dest)}} cx={x2} cy={y2} onClick={() => handleClick(route.dest)}>
                <title></title>
              </circle>
              <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
            </g>
          );
        })}


      </g>
    </svg>
  );
};

export default Map;
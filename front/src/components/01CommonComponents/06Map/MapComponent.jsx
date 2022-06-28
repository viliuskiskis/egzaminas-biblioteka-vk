import React, { useState, useEffect } from "react";
import Select from "react-select";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { redIcon, greenIcon, blueIcon, orangeIcon } from "../../05ReusableComponents/LeafletIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function MapComponent(props) {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState();
  const [selectedKindergarten, setSelectedKindergarten] = useState(null);
  const [width, setWidth] = useState("");

  const breakpoint = 768;
  const houseIcon = <FontAwesomeIcon icon={Icons.faHouse} />
  const homeButton = width < breakpoint ? houseIcon : "Mano vieta";

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return function cleanup() {
      window.removeEventListener("resize", updateWidth);
    }
  })

  function updateWidth() {
    setWidth(document.getElementById("map-size").getBoundingClientRect().width);
  }

  function handleMyLocation() {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 15, { animate: true, duration: 1 });
    });
  }

  function LeafletGeosearch() {
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: "bar",
        showPopup: true,
        searchLabel: "Įveskite adresą",
        retainZoomLevel: true,
        animateZoom: true,
        keepResult: true,
        marker: {
          icon: redIcon,
          draggable: false,
        }
      });

      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }

  function handleKindergarten(event) {
    let selected = props.kindergartens.find(kindergarten => event.value === kindergarten.value);
    setSelectedKindergarten(selected);
    map.flyTo([selected.latitude, selected.longitude], 15, { animate: true, duration: 1 });
  }

  return (
    <div style={{ height: "100%", width: "100%" }} id="map-size">

      {props.selectKindergarten &&
        <div className="form-group mb-3">
          <span id="selectKindergarten">
            <Select
              className="basic-single selectKindergarten"
              classNamePrefix="select"
              name="selected"
              id="selectedKindergarten"
              placeholder="Pasirinkite darželį iš sąrašo"
              options={props.kindergartens}
              onChange={(e) => handleKindergarten(e)}
            />
          </span>
        </div>
      }


      <MapContainer
        style={{ height: "100%" }}
        center={props.center}
        zoom={props.zoom}
        whenCreated={setMap}
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedKindergarten && (
          <Marker
            id="selected"
            key="selected"
            position={[selectedKindergarten.latitude, selectedKindergarten.longitude]}
            icon={orangeIcon}
          >
            <Popup
            >{selectedKindergarten.label}</Popup>
          </Marker>
        )}

        {props.kindergartens.map(kindergarten =>
          <Marker
            id={kindergarten.value}
            key={kindergarten.value}
            position={[kindergarten.latitude, kindergarten.longitude]}
            icon={blueIcon}
          >
            <Popup
            >{kindergarten.label}</Popup>
          </Marker>
        )}

        {position && (
          <Marker
            id="yourLocation"
            key="yourLocation"
            position={position}
            icon={greenIcon}>
            <Popup>Jūs esate čia</Popup>
          </Marker>
        )}

        {map &&
          <LeafletGeosearch />
        }

        {map &&
          <div
            id="ManoVietaButton"
            className="mano-vieta-button"
            onClick={handleMyLocation}
          >{homeButton}
          </div>
        }

      </MapContainer>
    </div>
  )
}
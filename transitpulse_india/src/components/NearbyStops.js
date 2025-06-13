import React, { useEffect, useRef, useState } from "react";

// PUBLIC_INTERFACE
/**
 * NearbyStops displays a map centered on the user's current location and scaffolds markers for nearby bus/metro stops.
 * Uses Leaflet (OpenStreetMap) for a lightweight, mobile-friendly experience. Minimalistic and in app brand style.
 * Handles location permissions natively and falls back gracefully.
 */
function NearbyStops() {
  const mapDiv = useRef(null);
  const [locationError, setLocationError] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletMap = useRef(null);
  const leaflet = useRef(null);

  // Example hard-coded stops (for demo purposes)
  const stops = [
    {
      id: 1,
      name: "Sector 17 Bus Stand",
      lat: 28.567002,
      lng: 77.324002,
      type: "bus",
    },
    {
      id: 2,
      name: "Rohini West Metro",
      lat: 28.704060,
      lng: 77.102493,
      type: "metro",
    },
    {
      id: 3,
      name: "Mandi House",
      lat: 28.628905,
      lng: 77.224968,
      type: "metro",
    },
  ];

  // Dynamically injects leaflet.js & CSS (no npm required for runtime)
  useEffect(() => {
    if (window.L) {
      leaflet.current = window.L;
      setMapLoaded(true);
      return;
    }
    // Load leaflet.min.css
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href =
      "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    // Load leaflet.min.js
    const leafletScript = document.createElement("script");
    leafletScript.src =
      "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.async = true;
    leafletScript.onload = () => {
      leaflet.current = window.L;
      setMapLoaded(true);
    };
    document.body.appendChild(leafletScript);

    return () => {
      document.head.removeChild(leafletCSS);
      document.body.removeChild(leafletScript);
    };
  }, []);

  // Get user geolocation on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not available on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setLocationError(
          err.code === 1
            ? "Location permission denied."
            : "Unable to get location."
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
      }
    );
  }, []);

  // Initializes the map once everything is ready
  useEffect(() => {
    if (!mapLoaded || !mapDiv.current) return;
    if (!leaflet.current) return;

    const L = leaflet.current;

    // Prefer user's location; fallback to Delhi center
    const defaultLatLng = userPosition || { lat: 28.6139, lng: 77.2090 };
    if (leafletMap.current) {
      leafletMap.current.remove();
      leafletMap.current = null;
    }
    leafletMap.current = L.map(mapDiv.current, {
      center: [defaultLatLng.lat, defaultLatLng.lng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Add tiles (OpenStreetMap, minimal appearance)
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        minZoom: 8,
      }
    ).addTo(leafletMap.current);

    // Add user location marker, if available
    if (userPosition) {
      const userMarker = L.circleMarker(
        [userPosition.lat, userPosition.lng],
        {
          radius: 10,
          color: "#00ffff",
          fillColor: "#00ffff",
          fillOpacity: 0.7,
          weight: 2,
        }
      ).addTo(leafletMap.current);
      userMarker.bindTooltip("You are here", { permanent: false });
      leafletMap.current.setView([userPosition.lat, userPosition.lng], 15);
    }

    // Add hard-coded stop markers
    stops.forEach((stop) => {
      const icon = L.divIcon({
        html: stop.type === "metro"
          ? `<div style='width:17px; height:17px; border-radius:50%; background-color:#1976D2; border:2px solid #fff; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; font-weight:bold;'>M</div>`
          : `<div style='width:17px; height:17px; border-radius:50%; background-color:#FFC107; border:2px solid #fff; display:flex; align-items:center; justify-content:center; color:#111; font-size:10px; font-weight:bold;'>B</div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [11, 17]
      });
      const marker = L.marker([stop.lat, stop.lng], {
        icon,
        title: stop.name
      }).addTo(leafletMap.current);
      marker.bindPopup(`<b>${stop.name}</b><br/>${stop.type === "metro" ? "Metro" : "Bus"} Stop`);
    });
  // eslint-disable-next-line
  }, [mapLoaded, userPosition]);

  // Main rendering
  return (
    <div
      className="nearby-stops-container"
      style={{
        paddingTop: 68,
        background: "var(--base-dark)",
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          color: "var(--base-light)",
          fontWeight: 700,
          fontSize: 22,
          margin: "8px 0 2px 16px",
        }}
      >
        Nearby Stops
      </h2>
      <div
        style={{
          color: "var(--text-secondary)",
          fontWeight: 400,
          margin: "0 0 10px 16px",
          fontSize: 15,
        }}
      >
        Map view: Find buses and metro stops near your location.
      </div>
      <div
        ref={mapDiv}
        id="osm-map"
        style={{
          minHeight: 340,
          width: "94vw",
          maxWidth: 480,
          margin: "0 auto 18px auto",
          borderRadius: 13,
          boxShadow: "0 3px 24px 0 rgba(16,16,45,.13)",
          border: "1px solid var(--border-color)",
        }}
      />
      {/* Permission/Error messaging */}
      {locationError && (
        <div style={{
          color: "#FF6B6B",
          margin: "0 auto",
          textAlign: "center",
          fontSize: 14,
          background: "rgba(30,0,0,0.10)",
          borderRadius: 7,
          maxWidth: 400,
          padding: 6,
        }}>
          {locationError}
        </div>
      )}
      {/* Extras: marker legend for demo */}
      <div style={{
        margin: "0 auto 16px auto",
        display: "flex",
        gap: 12,
        fontSize: 13,
        color: "var(--text-secondary)",
        alignItems: "center",
        maxWidth: 360,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <span>
          <span style={{
            width: 17,
            height: 17,
            background: "#1976D2",
            borderRadius: "50%",
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4,
            border: "2px solid #fff"
          }} /> Metro Stop
        </span>
        <span>
          <span style={{
            width: 17,
            height: 17,
            background: "#FFC107",
            borderRadius: "50%",
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4,
            border: "2px solid #fff"
          }} /> Bus Stop
        </span>
        <span>
          <span style={{
            width: 17,
            height: 17,
            borderRadius: "50%",
            border: "3px solid #00ffff",
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4
          }} /> You
        </span>
      </div>
    </div>
  );
}

export default NearbyStops;

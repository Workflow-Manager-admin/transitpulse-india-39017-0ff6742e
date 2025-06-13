import React from "react";
import NearbyStops from "./NearbyStops";
import PlanTrip from "./PlanTrip";
import SavedRoutes from "./SavedRoutes";
import MyCity from "./MyCity";

// PUBLIC_INTERFACE
/**
 * The MainContainer provides the main navigation shell for TransitPulse India.
 * It includes a bottom navigation bar to switch between major app sections.
 * This is only a structural placeholder; navigation will be implemented later.
 */
function MainContainer() {
  const [activeTab, setActiveTab] = React.useState("NearbyStops");

  const renderActiveSection = () => {
    switch (activeTab) {
      case "NearbyStops":
        return <NearbyStops />;
      case "PlanTrip":
        return <PlanTrip />;
      case "SavedRoutes":
        return <SavedRoutes />;
      case "MyCity":
        return <MyCity />;
      default:
        return <NearbyStops />;
    }
  };

  return (
    <div className="main-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        {renderActiveSection()}
      </div>
      <nav className="bottom-nav" style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 56,
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--base-dark)",
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}>
        <NavButton label="Nearby Stops" active={activeTab === "NearbyStops"} onClick={() => setActiveTab("NearbyStops")} />
        <NavButton label="Plan Trip" active={activeTab === "PlanTrip"} onClick={() => setActiveTab("PlanTrip")} />
        <NavButton label="Saved Routes" active={activeTab === "SavedRoutes"} onClick={() => setActiveTab("SavedRoutes")} />
        <NavButton label="My City" active={activeTab === "MyCity"} onClick={() => setActiveTab("MyCity")} />
      </nav>
    </div>
  );
}

// Helper component for navigation buttons
function NavButton({ label, active, onClick }) {
  return (
    <button
      className="bottom-nav-btn"
      style={{
        background: "none",
        border: "none",
        color: active ? "var(--base-light)" : "var(--text-secondary)",
        fontWeight: active ? "bold" : "normal",
        fontSize: 14,
        cursor: "pointer",
        padding: 0,
        outline: "none"
      }}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

export default MainContainer;

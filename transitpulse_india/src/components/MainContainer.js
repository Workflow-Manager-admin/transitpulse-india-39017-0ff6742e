import React from "react";
import NearbyStops from "./NearbyStops";
import PlanTrip from "./PlanTrip";
import SavedRoutes from "./SavedRoutes";
import MyCity from "./MyCity";

// PUBLIC_INTERFACE
/**
 * The MainContainer provides the main navigation shell for TransitPulse India.
 * It includes a bottom navigation bar to switch between major app sections.
 * Implements mobile-first, minimal UI for smooth tab switching.
 */
function MainContainer() {
  // Tabs as an array for composability and DRY button construction
  const tabs = [
    { key: "NearbyStops", label: "Nearby Stops", icon: <LocationIcon /> },
    { key: "PlanTrip", label: "Plan Trip", icon: <TripIcon /> },
    { key: "SavedRoutes", label: "Saved Routes", icon: <BookmarkIcon /> },
    { key: "MyCity", label: "My City", icon: <CityIcon /> },
  ];

  const [activeTab, setActiveTab] = React.useState("NearbyStops");

  // PUBLIC_INTERFACE
  /** Renders the appropriate section based on the active tab. */
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
    <div
      className="main-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--base-dark)",
      }}
    >
      {/* Main content with bottom spacing to avoid overlap */}
      <div style={{ flex: 1, marginBottom: 60 /* Reserve space for nav bar */ }}>
        {renderActiveSection()}
      </div>

      {/* Bottom Navigation Bar */}
      <nav
        className="bottom-nav"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 56,
          borderTop: "1px solid var(--border-color)",
          background: "var(--base-dark)",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: "0 -4px 12px 0 rgba(0,0,0,0.1)",
        }}
      >
        {tabs.map((tab) => (
          <NavButton
            key={tab.key}
            icon={tab.icon}
            label={tab.label}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </nav>
    </div>
  );
}

/**
 * NavButton
 * Minimal touch-friendly nav button with icon & label.
 * Highlights when active.
 */
function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      className="bottom-nav-btn"
      style={{
        background: "none",
        border: "none",
        color: active ? "var(--base-light)" : "var(--text-secondary)",
        fontWeight: active ? 600 : 400,
        fontSize: 13,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        outline: "none",
        padding: 0,
        transition: "color 0.15s",
        gap: 2,
      }}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      <span
        aria-hidden="true"
        style={{
          fontSize: 21,
          marginBottom: 0,
          color: active ? "var(--base-light)" : "var(--text-secondary)",
          transition: "color 0.2s",
        }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

// --- SVG icon components: minimal, brand-colored

function LocationIcon() {
  // Place "location/pin" style, aligns with branding
  return (
    <svg width="21" height="21" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M10 18c2.75-3 6-6.576 6-9.384A6 6 0 0 0 4 8.616C4 11.424 7.25 15 10 18z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={false ? "currentColor" : "none"}
      />
    </svg>
  );
}

function TripIcon() {
  // Simple forward "route/arrow" indicator
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <polyline
        points="5,15 10,5 15,15"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="5" r="1.3" fill="currentColor" />
      <circle cx="5" cy="15" r="1" fill="currentColor" />
      <circle cx="15" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

function BookmarkIcon() {
  // Typical "bookmark/saved" shape
  return (
    <svg width="19" height="20" viewBox="0 0 18 20" fill="none">
      <path
        d="M4.2 2.7C3.54 2.7 3 3.24 3 3.9V18l6-3.4 6 3.4V3.9c0-.66-.54-1.2-1.2-1.2H4.2z"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CityIcon() {
  // Stylized minimal "city/scenery" shape
  return (
    <svg width="20" height="18" viewBox="0 0 21 18" fill="none">
      <rect x="2.5" y="7.5" width="4" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8.5" y="3.5" width="4" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14.5" y="10.5" width="4" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default MainContainer;

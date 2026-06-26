import { Bell } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header style={styles.navbar}>
      {/* Brand / Logo — left side, matches sidebar width */}
      <div style={styles.brand}>
        {/* Snake/pretzel logo icon placeholder — matches the screenshot's orange icon */}
        <div style={styles.logoIcon}>
          {/* <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" fill="#E8472A" opacity="0.12" />
            <path
              d="M8 18 C8 12 12 10 14 14 C16 18 20 16 20 10"
              stroke="#E8472A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg> */}
        </div>
        {/* <span style={styles.brandName}>EVERSTITCH</span> */}
      </div>

      {/* Search bar — center */}
      <div style={styles.searchWrapper}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search orders, products, customers..."
          style={styles.searchInput}
        />
      </div>

      {/* Right side — bell + user */}
      <div style={styles.rightSection}>
        {/* Notification bell */}
        <button style={styles.bellBtn}>
          <Bell size={20} color="#4b5563" />
        </button>

        {/* User avatar + info */}


      </div>
    </header>
  );
}

const styles = {
  navbar: {
    height: 64,
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    paddingRight: 28,
  },
  brand: {
    width: 220,
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingLeft: 20,
    flexShrink: 0,
  },
  logoIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: "#E8472A",
    letterSpacing: "0.06em",
  },
  searchWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: "0 14px",
    height: 40,
    marginLeft: 16,
    marginRight: 24,
    maxWidth: 520,
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 13,
    color: "#374151",
    fontFamily: "Inter, sans-serif",
    width: "100%",
    "::placeholder": { color: "#9ca3af" },
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginLeft: "auto",
  },
  bellBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 8,
  },
  userBlock: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#E8472A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarInner: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    fontFamily: "Inter, sans-serif",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.3,
  },
  userName: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: "#111827",
  },
  userEmail: {
    fontFamily: "Inter, sans-serif",
    fontSize: 11,
    color: "#9ca3af",
  },
};
import { Bell } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header style={styles.navbar}>
      {/* Brand / Logo — left side, matches sidebar width */}
      <div style={styles.brand}>
        <img src="/Png-01.png" alt="Logo" style={{ height: 44, width: "auto", objectFit: "contain" }} />
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
        <div style={styles.userBlock}>
          <div style={styles.avatar}>
            <span style={styles.avatarInner}>A</span>
          </div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>Admin</span>
            <span style={styles.userEmail}>admin@everstitch.com</span>
          </div>
        </div>
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
    gap: 10,
    paddingLeft: 20,
    flexShrink: 0,
  },
  logoIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  brandName: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: "#E8472A",
    letterSpacing: "0.08em",
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
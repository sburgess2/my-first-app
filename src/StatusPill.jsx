const statusColours = {
  "Endemic": { background: "#5a8a3c33", color: "#3f6b2e" },
  "Native": { background: "#6e80b233", color: "#4a5d95" },
  "Self-introduced": { background: "#f6bc5566", color: "#7a5410" },
  "Introduced": { background: "#ab241226", color: "#ab2412" },
  "Biocontrol release": { background: "#7b5a9a33", color: "#6f4f8f" },
  "Migrant": { background: "#98867133", color: "#6b5d4c" },
};

const StatusPill = ({ status }) => {
  const colours = statusColours[status] ?? { background: "#231d191a", color: "#231d19" };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 14px",
        borderRadius: 999,
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: colours.background,
        color: colours.color,
      }}
    >
      {status}
    </span>
  );
};

export default StatusPill;
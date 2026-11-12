const Card = ({ children }) => {
  return (
    <div
      style={{
        width: 300,
        height: 350,
        border: "1px solid #988671",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#fdf5e6",
        color: "#231d19",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
import React from "react";

const Qidiruv = ({ qidiruv, setQidiruv }) => {
  return (
    <input
      type="text"
      placeholder="Qidiruv: ism, familya, ID yoki telefon..."
      value={qidiruv}
      onChange={(e) => setQidiruv(e.target.value)}
      style={{ marginTop: "20px", padding: "8px", width: "100%", maxWidth: "400px" }}
    />
  );
};

export default Qidiruv;

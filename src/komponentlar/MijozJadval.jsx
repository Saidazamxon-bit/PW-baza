import React from "react";

const MijozJadval = ({ mijozlar }) => {
  return (
    <table border="1" cellPadding="8" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ism</th>
          <th>Familya</th>
          <th>Telefon</th>
          <th>Email</th>
          <th>Manzil</th>
          <th>Distibyutr</th>
          <th>Sana</th>
          <th>YATT</th>
        </tr>
      </thead>
      <tbody>
        {mijozlar.length === 0 ? (
          <tr><td colSpan="9" align="center">Mijozlar topilmadi</td></tr>
        ) : (
          mijozlar.map((m, i) => (
            <tr key={i}>
              <td>{m.id}</td>
              <td>{m.ism}</td>
              <td>{m.familya}</td>
              <td>{m.telefon}</td>
              <td>{m.email}</td>
              <td>{m.manzil}</td>
              <td>{m.distibyutr}</td>
              <td>{m.sana}</td>
              <td>{m.yatt}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default MijozJadval;

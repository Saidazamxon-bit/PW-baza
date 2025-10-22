import React, { useState, useEffect } from "react";

const MijozForma = ({ onAdd, editMijoz }) => {
  const [mijoz, setMijoz] = useState({
    id: "",
    ism: "",
    familya: "",
    telefon: "+998 ",
    email: "",
    manzil: "",
    distibyutr: "",
    sana: "",
    yatt: "",
  });

  useEffect(() => {
    if (editMijoz) setMijoz(editMijoz);
  }, [editMijoz]);

  const o_zgarish = (e) => setMijoz({ ...mijoz, [e.target.name]: e.target.value });

  const yuborish = (e) => {
    e.preventDefault();
    if (!mijoz.id || !mijoz.ism || !mijoz.familya) return alert("Majburiy maydonlar to‘ldirilishi kerak!");
    onAdd(mijoz);
    setMijoz({ id:"", ism:"", familya:"", telefon:"", email:"", manzil:"", distibyutr:"", sana:"", yatt:"" });
  };

  const formStyle = { display:"grid", gap: "10px", maxWidth: "400px", marginTop: 20, backgroundColor: "#fff", padding: 15, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" };
  const inputStyle = { padding: 8, borderRadius: 4, border: "1px solid #ccc", fontSize: 14 };
  const buttonStyle = { padding: "8px 12px", border: "none", borderRadius: 4, backgroundColor: "#61dafb", color: "#fff", cursor: "pointer", transition: "0.2s" };

  return (
    <form onSubmit={yuborish} style={formStyle}>
      {["id","ism","familya","telefon","email","manzil","distibyutr","sana","yatt"].map((nom) => (
        <input
          key={nom}
          name={nom}
          placeholder={nom.toUpperCase()}
          value={mijoz[nom]}
          onChange={o_zgarish}
          required={["id","ism","familya"].includes(nom)}
          style={inputStyle}
        />
      ))}
      <button type="submit" style={buttonStyle}>
        {editMijoz ? "✏️ Tahrirlash" : "➕ Mijoz qo‘shish"}
      </button>
    </form>
  );
};

export default MijozForma;

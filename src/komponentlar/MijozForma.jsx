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

  // Telefonni avtomatik formatlash funksiyasi
  const formatTelefon = (value) => {
    // faqat raqamlarni qoldiramiz
    let raqam = value.replace(/\D/g, "");

    // agar +998 bilan boshlanmasa, boshiga 998 qo‘shamiz
    if (!raqam.startsWith("998")) {
      raqam = "998" + raqam;
    }

    // +998 dan keyingi raqamlar formati
    let formatted = "+998 ";

    if (raqam.length > 3) formatted += raqam.slice(3, 5); // 12
    if (raqam.length >= 5) formatted += " " + raqam.slice(5, 8); // 345
    if (raqam.length >= 8) formatted += " " + raqam.slice(8, 10); // 67
    if (raqam.length >= 10) formatted += " " + raqam.slice(10, 12); // 89

    return formatted.trim();
  };

  const o_zgarish = (e) => {
    const { name, value } = e.target;

    // faqat telefon maydoni uchun formatlash
    if (name === "telefon") {
      setMijoz({ ...mijoz, [name]: formatTelefon(value) });
    } else {
      setMijoz({ ...mijoz, [name]: value });
    }
  };

  const yuborish = (e) => {
    e.preventDefault();
    if (!mijoz.id || !mijoz.ism || !mijoz.familya)
      return alert("Majburiy maydonlar to‘ldirilishi kerak!");

    onAdd(mijoz);
    setMijoz({
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
  };

  // dizaynlar
  const formStyle = {
    display: "grid",
    gap: "10px",
    maxWidth: "400px",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
  };

  const buttonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: 4,
    backgroundColor: "#61dafb",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
  };

  return (
    <form onSubmit={yuborish} style={formStyle}>
      {["id", "ism", "familya", "telefon", "email", "manzil", "distibyutr", "sana", "yatt"].map(
        (nom) => (
          <input
            key={nom}
            name={nom}
            placeholder={nom.toUpperCase()}
            value={mijoz[nom]}
            onChange={o_zgarish}
            required={["id", "ism", "familya"].includes(nom)}
            style={inputStyle}
          />
        )
      )}
      <button type="submit" style={buttonStyle}>
        {editMijoz ? "✏️ Tahrirlash" : "➕ Mijoz qo‘shish"}
      </button>
    </form>
  );
};

export default MijozForma;

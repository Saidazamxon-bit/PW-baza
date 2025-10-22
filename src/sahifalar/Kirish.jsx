import React, { useState } from "react";

const Kirish = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const correctUser = "PwAdmin";
    const correctPass = "Pw4321";

    if (user === correctUser && pass === correctPass) {
      localStorage.setItem("isAuth", "true");
      onLogin(true);
    } else {
      alert("❌ Foydalanuvchi nomi yoki parol notoʻgʻri!");
      setPass("");
    }
  };

  const containerStyle = {
    maxWidth: 360,
    margin: "80px auto",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    textAlign: "center",
    fontFamily: "sans-serif",
  };

  const inputStyle = {
    width: "95%",
    padding: "10px 8px",
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
    transition: "0.2s",
  };

  const btnStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
    fontSize: 14,
    transition: "0.2s",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: 20, color: "#333" }}>Admin kirish</h2>
      <form
        onSubmit={submit}
        style={{ display: "grid", gap: 10 }}
        autoComplete="on" // <-- BRAUZERGA SAQLASHGA RUXSAT
      >
        <input
          type="text"
          name="username" // <-- MUHIM: brauzer user nomini taniydi
          placeholder="Foydalanuvchi (user)"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          style={inputStyle}
          autoComplete="username" // <-- BRAUZERGA USER MAYDONI
        />
        <input
          type="password"
          name="password" // <-- MUHIM: parol uchun tanish nom
          placeholder="Parol (password)"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          style={inputStyle}
          autoComplete="current-password" // <-- BRAUZERGA PAROL MAYDONI
        />
        <button type="submit" style={btnStyle}>
          Kirish
        </button>
      </form>
    </div>
  );
};

export default Kirish;

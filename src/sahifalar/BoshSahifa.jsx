import React, { useState, useEffect } from "react";
import MijozForma from "../komponentlar/MijozForma";

// ===== Boshlang'ich mijozlar (har doim sayt ochilganda ko'rinadi) =====
const defaultMijozlar = [
  {
    id: "1",
    ism: "Jasur",
    familya: "Orifov",
    telefon: "+998901234567",
    email: "jasur@example.com",
    manzil: "Toshkent, Shayxontohur",
    distibyutr: "Distribyuter A",
    sana: "2025-10-21",
    yatt: "1000"
  }
];

const BoshSahifa = () => {
  const [mijozlar, setMijozlar] = useState(() => {
    const saqlangan = JSON.parse(localStorage.getItem("mijozlar")) || [];
    return saqlangan.length ? saqlangan : defaultMijozlar;
  });

  const [qidiruv, setQidiruv] = useState("");
  const [showKodlar, setShowKodlar] = useState(false);
  const [showBoshqarish, setShowBoshqarish] = useState(false);
  const [editMijoz, setEditMijoz] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("mijozlar", JSON.stringify(mijozlar));
  }, [mijozlar]);

  // ===== Funksiyalar =====
  const mijozQoshish = (yangiMijoz) => {
    if (editMijoz) {
      setMijozlar(mijozlar.map(m => m.id === editMijoz.id ? yangiMijoz : m));
      setEditMijoz(null);
    } else {
      setMijozlar([...mijozlar, yangiMijoz]);
    }
    setShowForm(false);
  };

  const oChirish = (id) => {
    if (window.confirm("Rostdan o‘chirmoqchimisiz?")) {
      setMijozlar(mijozlar.filter(m => m.id !== id));
    }
  };

  const tahrirlash = (m) => {
    setEditMijoz(m);
    setShowForm(true);
  };

  const copyKodlar = () => {
    navigator.clipboard.writeText(JSON.stringify(mijozlar, null, 2));
    alert("✅ Mijoz kodlari nusxa olindi!");
  };

  const filterlangan = mijozlar.filter(m =>
    [m.ism, m.familya, m.id, m.telefon].some(x => x && x.toLowerCase().includes(qidiruv.toLowerCase()))
  );

  // ===== STYLE =====
  const headerStyle = { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10, flexWrap:"wrap" };
  const btnStyle = { padding:"8px 12px", border:"none", borderRadius:4, backgroundColor:"#61dafb", color:"#fff", cursor:"pointer", marginRight: 8, marginBottom:5, fontSize:"14px", transition:"0.2s" };
  const inputStyle = { marginBottom:10, padding:6, width:"100%", maxWidth:400, borderRadius:4, border:"1px solid #ccc", fontSize:"14px" };
  const tableContainerStyle = { overflowX:"auto" };
  const tableStyle = { width:"100%", borderCollapse:"collapse", boxShadow:"0 2px 6px rgba(0,0,0,0.1)", borderRadius:6, overflow:"hidden", backgroundColor:"#fff", fontSize:"14px" };
  const thStyle = { backgroundColor:"#61dafb", color:"#fff", padding:8, textAlign:"left", fontSize:"13px" };
  const tdStyle = { padding:8, borderBottom:"1px solid #eee", fontSize:"13px" };

  return (
    <div style={{ marginTop:20, padding:"0 10px" }}>
      {/* ===== Header va tugmalar ===== */}
      <div style={headerStyle}>
        <h2 style={{margin:"10px 0"}}>Mijozlar bazasi</h2>
        <div>
          <button style={btnStyle} onClick={()=>setShowForm(!showForm)}>{showForm ? "Yopish" : "Mijoz qo‘shish"}</button>
          <button style={btnStyle} onClick={()=>setShowKodlar(!showKodlar)}>{showKodlar ? "Yopish" : "Mijoz kodlari"}</button>
          <button style={btnStyle} onClick={()=>setShowBoshqarish(!showBoshqarish)}>{showBoshqarish ? "Yopish" : "Boshqarish"}</button>
          {showKodlar && <button style={btnStyle} onClick={copyKodlar}>Nusxa olish</button>}
        </div>
      </div>

      {/* ===== Mijoz kodlari oynasi ===== */}
      {showKodlar && (
        <textarea
          readOnly
          style={{width:"100%", height:300, marginTop:10, padding:10, borderRadius:6, border:"1px solid #ccc", backgroundColor:"#f9f9f9", fontFamily:"monospace", fontSize:13}}
          value={JSON.stringify(mijozlar,null,2)}
        />
      )}

      {/* ===== Mijoz qo‘shish/tahrirlash formasi ===== */}
      {showForm && <MijozForma onAdd={mijozQoshish} editMijoz={editMijoz} key={editMijoz ? editMijoz.id : "new"} />}

      {/* ===== Qidiruv ===== */}
      <input type="text" placeholder="Qidiruv: ism, familya, ID yoki telefon..." value={qidiruv} onChange={e=>setQidiruv(e.target.value)} style={inputStyle} />

      {/* ===== Mijozlar jadvali ===== */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {["ID","Ism","Familya","Telefon","Email","Manzil","Distibyutr","Sana","YATT", showBoshqarish?"Harakatlar":null].map((h,i)=>h?<th key={i} style={thStyle}>{h}</th>:null)}
            </tr>
          </thead>
          <tbody>
            {filterlangan.length===0 ? (
              <tr><td colSpan={showBoshqarish?10:9} align="center" style={tdStyle}>Mijoz topilmadi</td></tr>
            ) : (
              filterlangan.map(m=>(
                <tr key={m.id} style={{cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.backgroundColor="#f0f8ff"} onMouseLeave={e=>e.currentTarget.style.backgroundColor=""}>
                  {["id","ism","familya","telefon","email","manzil","distibyutr","sana","yatt"].map(f=><td key={f} style={tdStyle}>{m[f]}</td>)}
                  {showBoshqarish && (
                    <td style={tdStyle}>
                      <button style={{...btnStyle, marginRight:5}} onClick={()=>tahrirlash(m)}>Tahrirlash</button>
                      <button style={btnStyle} onClick={()=>oChirish(m.id)}>O‘chirish</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoshSahifa;

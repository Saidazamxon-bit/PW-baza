import React, { useState, useEffect, useRef } from "react";
import BoshSahifa from "./sahifalar/BoshSahifa";
import Kirish from "./sahifalar/Kirish";

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    const v = localStorage.getItem("isAuth");
    return v === "true";
  });

  const timeRef = useRef(null); // timeoutni saqlash uchun

  // ⏳ 2 daqiqa harakatsizlikdan so‘ng logout
  const startInactivityTimer = () => {
    // avval eski timer tozalanadi
    if (timeRef.current) clearTimeout(timeRef.current);

    // yangi 2 daqiqalik timer
    timeRef.current = setTimeout(() => {
      localStorage.removeItem("isAuth");
      setIsAuth(false);
      alert("⏰ 2 daqiqa davomida faoliyat bo‘lmagani uchun avtomatik chiqdingiz.");
    }, 2 * 60 * 1000); // 2 daqiqa = 120000 ms
  };

  // faollikni kuzatish uchun eventlar
  useEffect(() => {
    if (isAuth) {
      // foydalanuvchi harakat qilganida timer qayta boshlanadi
      const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
      events.forEach((e) => window.addEventListener(e, startInactivityTimer));

      startInactivityTimer(); // dastlab timer ishga tushadi

      return () => {
        events.forEach((e) => window.removeEventListener(e, startInactivityTimer));
        if (timeRef.current) clearTimeout(timeRef.current);
      };
    }
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      {isAuth ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: 0 }}>Mijozlar bazasi — admin</h1>
            <button onClick={handleLogout} style={{ padding: "6px 10px" }}>
              Chiqish
            </button>
          </div>
          <BoshSahifa />
        </>
      ) : (
        <Kirish onLogin={setIsAuth} />
      )}
    </div>
  );
}

export default App;

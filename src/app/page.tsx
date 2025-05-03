"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [adminHover, setAdminHover] = useState(false);
  const [userHover, setUserHover] = useState(false);

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "40px",
      backgroundColor: "#121212",
      color: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "0 20px",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0" }}>Welcome to SafeMove</h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "400px", margin: "0 auto 20px" }}>
        Choose your route to continue:
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/admin" passHref>
          <button
            onMouseEnter={() => setAdminHover(true)}
            onMouseLeave={() => setAdminHover(false)}
            style={{
              backgroundColor: adminHover ? "#3c3f9f" : "#4c51bf",
              border: "none",
              borderRadius: "8px",
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
              transition: "background-color 0.3s ease"
            }}
          >
            Admin
          </button>
        </Link>
        <Link href="/user" passHref>
          <button
            onMouseEnter={() => setUserHover(true)}
            onMouseLeave={() => setUserHover(false)}
            style={{
              backgroundColor: userHover ? "#d53f8c" : "#ed64a6",
              border: "none",
              borderRadius: "8px",
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
              transition: "background-color 0.3s ease"
            }}
          >
            User
          </button>
        </Link>
      </div>
    </main>
  );
}

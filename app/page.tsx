"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    
    router.push("/login");
  }, [router]);

  return (
    <div style={{ backgroundColor: "#050505", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      
      <div style={{ color: "#fb8500", fontFamily: "monospace", fontSize: "12px" }}>
        REDIRECTING_TO_AUTH_GATEWAY...
      </div>
    </div>
  );
}
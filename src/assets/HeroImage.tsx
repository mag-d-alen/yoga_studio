import { relative } from "path";
import { ReactNode } from "react";

export const HeroImage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div
    id="hero"
    style={{
      width: "100%",
      height: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      margin: 0,
      padding: 0,
      backgroundSize: "cover",
      backgroundImage: `url(${require("./hero.jpg")})`,
    }}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        color: "white",
      }}>
      {children}
    </div>
  </div>
);

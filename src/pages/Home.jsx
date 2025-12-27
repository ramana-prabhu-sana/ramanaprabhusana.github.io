import React from "react";
import { profile } from "../data/profile";

export default function Home() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>{profile?.basics?.name || "Name missing in profile.js"}</h1>
      <p>{profile?.basics?.headline || "Headline missing in profile.js"}</p>
    </div>
  );
}

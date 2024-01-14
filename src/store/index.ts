import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: "#34495e",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./logo.png",
    fullDecal: "./logo.png",
});

export default state;

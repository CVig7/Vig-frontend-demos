const darkColorsArr = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
  "#4B0082",
  "#2E4053",
  "#1C2833",
  "#17202A",
  "#1B2631",
  "#212F3D",
  "#FFFFFF",
  "#000000",
  "#808080",
  "#A9A9A9",
  "#696969",
  "#708090",
  "#778899",
  "#B0C4DE",
  "#4682B4",
  "#5F9EA0",
  "#20B2AA",
  "#008B8B",
  "#008080",
  "#2F4F4F",
  "#191970",
  "#00008B",
  "#0000CD",
  "#4169E1",
  "#6495ED",
  "#00BFFF",
  "#1E90FF",
  "#00CED1",
  "#20B2AA",
  "#5F9EA0",
  "#4682B4",
  "#87CEEB",
  "#87CEFA",
  "#00BFFF",
  "#1E90FF",
  "#00CED1",
  "#20B2AA",
  "#5F9EA0",
  "#4682B4",
  "#87CEEB",
  "#87CEFA",
  "#00BFFF",
  "#1E90FF",
  "#00CED1",
];

function getRandomIndex() {
  const randomIndex = Math.floor(darkColorsArr.length * Math.random());
  return randomIndex;
}

const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

function changeBackgroundColor() {
  const color = darkColorsArr[getRandomIndex()];

  bgHexCodeSpanElement.innerText = color;
  body.style.backgroundColor = color;
}
const btn = document.querySelector("#btn");

btn.onclick = changeBackgroundColor;
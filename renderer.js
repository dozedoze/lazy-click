const inp = document.getElementById("inp");
const btn = document.getElementById("btn");

inp.onblur = (event) => {
  const nowValue = event.target.value;
  if (nowValue < 10) {
    event.target.value = "10";
  }
};

btn.onclick = () => {
  window.times.setClickTime(inp.value);
};

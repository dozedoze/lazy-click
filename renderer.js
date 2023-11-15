const inp = document.getElementById("inp");

console.log("tamaiaaaaaaaaa");

const handleStart = (event) => {
  console.log(event, "veent");
};

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'
};

func();

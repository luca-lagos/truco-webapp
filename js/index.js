import { Counter } from "./counter.js";

const matchInMemory = JSON.parse(localStorage.getItem("truco"));
console.log(matchInMemory);
const p1Name = "TEAM N°1";
const p2Name = "TEAM N°2";

const p1 = new Counter(
  p1Name,
  document.getElementById("player1Container"),
  matchInMemory && matchInMemory[p1Name] ? matchInMemory[p1Name] : 0
);
const p2 = new Counter(
  p2Name,
  document.getElementById("player2Container"),
  matchInMemory && matchInMemory[p2Name] ? matchInMemory[p2Name] : 0
);

p1.selectRival(p2);
p2.selectRival(p1);

document.querySelector(".reset").addEventListener("click", () => {
  Swal.fire({
    title: "You are sure to reset this match?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "rgb(196, 40, 40)",
  }).then((result) => {
    if (result.isConfirmed) {
      p1.reset();
      p2.reset();
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Match reset successful!",
        position: "top",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const saveMatch = {
      [p1.name]: p1.num,
      [p2.name]: p2.num,
    };
    localStorage.setItem("truco", JSON.stringify(saveMatch));
    console.log("GUARDADO");
  });
});

export class Counter {
  num = 0;
  name;
  rival;
  finalMatch;
  counterElement;
  containerElement;

  constructor(name, containerElement, counter = 0) {
    this.name = name;
    this.num = counter;
    this.containerElement = containerElement;
    containerElement.querySelector("h2").innerText = name;
    containerElement
      .querySelector(".add")
      .addEventListener("click", () => this.add());
    containerElement
      .querySelector(".delete")
      .addEventListener("click", () => this.delete());
    this.counterElement = containerElement.querySelector(".counter");
    this.updateCounter(this.rival);
  }

  selectRival(rival) {
    this.rival = rival;
  }

  add(cant = 1) {
    this.num += cant;
    this.updateCounter(this.rival);
    console.log(this.num);
  }

  delete(cant = 1) {
    this.num = Math.max(0, this.num - cant);
    this.updateCounter(this.rival);
  }

  reset() {
    this.num = 0;
    this.updateCounter(this.rival);
  }

  updateCounter(rival) {
    const actualPoints = this.containerElement.querySelectorAll("span");
    const actualGroups = this.containerElement.querySelectorAll(".group");
    if (actualGroups.length > 0) {
      actualGroups.forEach((group) => this.counterElement.removeChild(group));
    }
    let actualGroup;
    for (let i = 0; i < this.num; i++) {
      if (i % 5 === 0) {
        actualGroup = document.createElement("div");
        actualGroup.classList.add("group");
        this.counterElement.appendChild(actualGroup);
      }
      const point = document.createElement("span");
      point.classList.add("individual-point-" + ((i % 5) + 1));
      actualGroup.appendChild(point);
      if (this.num == 15) {
        this.finishMatch(rival);
      }
    }
  }

  finishMatch(rival) {
    Swal.fire({
      icon: "success",
      title: `Contragulations! ${this.name} is the winner!`,
      showCloseButton: false,
      confirmButtonText: "Restart the game",
      confirmButtonColor: "rgb(165, 42, 42)",
    }).then(() => {
      this.reset();
      rival.reset();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const imagen1 = document.getElementById("jorge");
  let posX1 = 0;
  let posY1 = 300;
  let direccionX1 = 0;
  let direccionY1 = 0;

  const imagen2 = document.getElementById("juan");
  let posX2 = 1000;
  let posY2 = 300;
  let direccionX2 = 0;
  let direccionY2 = 0;

  const paso = 10; // Tamaño del paso de movimiento
  const limiteMinX = 0;
  const limiteMaxX = container.clientWidth - imagen1.offsetWidth;
  const limiteMinY = 0;
  const limiteMaxY = container.clientHeight - imagen1.offsetHeight;

  function moverImagenes() {
    let nuevaPosX1 = posX1 + direccionX1 * paso;
    let nuevaPosY1 = posY1 + direccionY1 * paso;

    if (nuevaPosX1 < limiteMinX) {
      nuevaPosX1 = limiteMinX;
    } else if (nuevaPosX1 > limiteMaxX) {
      nuevaPosX1 = limiteMaxX;
    }
    if (nuevaPosY1 < limiteMinY) {
      nuevaPosY1 = limiteMinY;
    } else if (nuevaPosY1 > limiteMaxY) {
      nuevaPosY1 = limiteMaxY;
    }

    posX1 = nuevaPosX1;
    posY1 = nuevaPosY1;

    imagen1.style.left = posX1 + "px";
    imagen1.style.top = posY1 + "px";

    let nuevaPosX2 = posX2 + direccionX2 * paso;
    let nuevaPosY2 = posY2 + direccionY2 * paso;

    if (nuevaPosX2 < limiteMinX) {
      nuevaPosX2 = limiteMinX;
    } else if (nuevaPosX2 > limiteMaxX) {
      nuevaPosX2 = limiteMaxX;
    }

    if (nuevaPosY2 < limiteMinY) {
      nuevaPosY2 = limiteMinY;
    } else if (nuevaPosY2 > limiteMaxY) {
      nuevaPosY2 = limiteMaxY;
    }

    posX2 = nuevaPosX2;
    posY2 = nuevaPosY2;

    imagen2.style.left = posX2 + "px";
    imagen2.style.top = posY2 + "px";
  }

  document.addEventListener("keydown", function (event) {
    const tecla = event.key.toLowerCase();
    switch (tecla) {
      case "w":
        direccionY1 = -1;
        break;
      case "a":
        direccionX1 = -1;
        break;
      case "s":
        direccionY1 = 1;
        break;
      case "d":
        direccionX1 = 1;
        break;
      case "i":
        direccionY2 = -1;
        break;
      case "j":
        direccionX2 = -1;
        break;
      case "k":
        direccionY2 = 1;
        break;
      case "l":
        direccionX2 = 1;
        break;
      default:
        break;
    }
  });

  document.addEventListener("keyup", function (event) {
    const tecla = event.key.toLowerCase();
    switch (tecla) {
      case "w":
      case "s":
        direccionY1 = 0;
        break;
      case "a":
      case "d":
        direccionX1 = 0;
        break;
      case "i":
      case "k":
        direccionY2 = 0;
        break;
      case "j":
      case "l":
        direccionX2 = 0;
        break;

      default:
        break;
    }
  });

  setInterval(moverImagenes, 50);
  class Character {
    constructor(name, health, damage) {
      //Atributos
      this.name = name;
      this.health = health;
      this.maxhealth = health;
      this.damage = damage;
    }
    isAlive() {
      return this.health > 0;
    }

    atacar(target) {
      var atacar;
      var numeroAleatorio = Math.floor(Math.random() * 100);
      if (90 > numeroAleatorio) {
        atacar = this.damage * 2;
      } else {
        atacar = this.damage;
      }
      const targetRect = imagen1.getBoundingClientRect();
      const atacarerRect = imagen2.getBoundingClientRect();
      if (isColliding(atacarerRect, targetRect)) {
        target.health -= atacar;
      }

      console.log(`${this.name} deals ${atacar} DMG to ${target.name}`);
    }

    status() {
      return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
  }
  function isColliding(rect1, rect2) {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }
  //Creación de personajes
  const hero = new Character("Heroe", 100, Math.floor(Math.random() * 10) + 5);
  const enemy = new Character("Enemy", 100, Math.floor(Math.random() * 10) + 5);

  alert(
    "Pelea a muerte con cuchillos " +
      "\n Hp del heroe: " +
      hero.health +
      " \nHp del enemigo: " +
      enemy.health
  );
  fight(hero, enemy);
  async function fight(firstCharacter, secondCharacter) {
    console.log("Empieza el combate!");
    updateHealthBars();
    while (true) {
      if (firstCharacter.isAlive()) {
        await delay(100);
        updateHealthBars();
      } else {
        console.log(`${firstCharacter.name} died!`);
        displayWinner(secondCharacter);
        break;
      }

      if (secondCharacter.isAlive()) {
        await delay(100); 
        updateHealthBars();
      } else {
        console.log(`${secondCharacter.name} died!`);
        displayWinner(firstCharacter);
        break;
      }
    }
  }
  fight(hero, enemy);

  document.addEventListener("keydown", function (event) {
   if (event.key === "r") {
      hero.atacar(enemy);
    } else if (event.key === "u") {
     enemy.atacar(hero);
    }
  });

  function updateHealthBars() {
   const heroHealthBar = document
      .getElementById("hero-health-bar")
      .querySelector(".health");
    const heroHealthPercent = (hero.health / hero.maxhealth) * 100;
    heroHealthBar.style.width = `${
      heroHealthPercent < 0 ? 0 : heroHealthPercent
    }%`;

    const enemyHealthBar = document
      .getElementById("enemy-health-bar")
      .querySelector(".health");
    const enemyHealthPercent = (enemy.health / enemy.maxhealth) * 100;
    enemyHealthBar.style.width = `${
      enemyHealthPercent < 0 ? 0 : enemyHealthPercent
    }%`;

    document.getElementById("hero-health").innerText = `${hero.name} - HP ${
      hero.health < 0 ? 0 : hero.health
    }/${hero.maxhealth}`;

    document.getElementById("enemy-health").innerText = `${enemy.name} - HP ${
      enemy.health < 0 ? 0 : enemy.health
    }/${enemy.maxhealth}`;
  }



  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
  function displayWinner(winner) {
    const winnerText = document.createElement("p");
    winnerText.textContent = `${winner.name} won the fight!`;
    document.body.appendChild(winnerText);
  }

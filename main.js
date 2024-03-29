let mainPlayer = {
    name: "Walter White",
    level: localStorage.getItem("mainPlayerLevel")
}

let enemies = []
const response = fetch("https://raw.githubusercontent.com/lcdovictor/files/main/enemies.json")
                    .then(response => response.json())
                    .then(data => {       
                        enemies = data;                  
                        document.getElementById("displayNameEnemyOne").innerText = enemies[0].name
                        document.getElementById("displayNameEnemyTwo").innerText = enemies[1].name
                        document.getElementById("displayNameEnemyThree").innerText = enemies[2].name
                        document.getElementById("displayNameEnemyFour").innerText = enemies[3].name
                        document.getElementById("displayLevelEnemyOne").innerText = enemies[0].level
                        document.getElementById("displayLevelEnemyTwo").innerText = enemies[1].level
                        document.getElementById("displayLevelEnemyThree").innerText = enemies[2].level
                        document.getElementById("displayLevelEnemyFour").innerText = enemies[3].level
                    })
                    .catch(error => console.error(error));


document.getElementById("displayLevel").innerText = mainPlayer.level
if (!mainPlayer.level) {
    localStorage.setItem("mainPlayerLevel", 2);
}
let nameButton = document.getElementById("nameButton")
nameButton.addEventListener("click", setName)
let resetLevelButton = document.getElementById("resetLevelButton")
resetLevelButton.addEventListener("click", resetLevel)

function setName() {
    let username = document.getElementById("name").value
    document.getElementById("displayName").innerText = username
}
function resetLevel() {
    //localStorage.setItem("mainPlayerLevel", 2);
    
    mainPlayer.level = Math.floor(Math.random() * 15);


    let nivelJugador = mainPlayer.level
    let nivelesEnemigos = []

    for (let index = 0; index < enemies.length; index++) {
        nivelesEnemigos[index] = enemies[index].level;
    }

    let nivelesEnemigosDerrotables = nivelesEnemigos.map(x => x > nivelJugador)

    let cantidadDeEnemigosDerrotables = 0 
    
    nivelesEnemigosDerrotables.forEach(x => {
        cantidadDeEnemigosDerrotables += !x? 1:0
    })

    console.log(cantidadDeEnemigosDerrotables)

    document.getElementById("displayLevel").innerText = mainPlayer.level

    Swal.fire({
        title: "Puedes derrotar a " + cantidadDeEnemigosDerrotables + " enemigos",
        text: "",
        icon: 'success',
        confirmButtonText: 'Entendido'
      })
}

function attackEnemy(enemyId) {
    const enemy = enemies[enemyId-1]
    const nextEnemy = enemies[enemyId]
    if (mainPlayer.level > enemy.level) {
        Swal.fire({
            title: "Haz derrotado a " + enemy.name,
            text: "",
            icon: 'success',
            confirmButtonText: 'Entendido'
          })
        let newLevel = nextEnemy.level + 1
        if (newLevel > mainPlayer.level) {
            mainPlayer.level = newLevel
        }
        document.getElementById("displayLevel").innerText = mainPlayer.level
        localStorage.setItem("mainPlayerLevel", mainPlayer.level);
    }else{
        Swal.fire({
            title: "Tu nivel no es suficiente para derrotar a " + enemy.name,
            text: "",
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
    }
}

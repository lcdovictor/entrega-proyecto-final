
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
    localStorage.setItem("mainPlayerLevel", 2);
    mainPlayer.level = 2
    document.getElementById("displayLevel").innerText = mainPlayer.level
    alert("Nivel de jugador principal reiniciado")
}

function attackEnemy(enemyId) {
    const enemy = enemies[enemyId-1]
    const nextEnemy = enemies[enemyId]
    if (mainPlayer.level > enemy.level) {
        alert("Haz derrotado a " + enemy.name)
        let newLevel = nextEnemy.level + 1
        if (newLevel > mainPlayer.level) {
            mainPlayer.level = newLevel
        }
        document.getElementById("displayLevel").innerText = mainPlayer.level
        localStorage.setItem("mainPlayerLevel", mainPlayer.level);
    }else{
        alert("Tu nivel no es suficiente para derrotar a " + enemy.name)
    }
}
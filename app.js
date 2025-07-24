let config = true
const forest = [6, 7, 8, 10, 16, 17]
const mountain = [2, 3, 9, 11, 13, 18]
const water = [1, 4, 5, 12, 14, 15]
const allTerrains = forest.concat(mountain).concat(water)
const monster = { 1: 10, 2: 12, 3: 8 }

function changeConfig() {
    config = !config
    document.getElementById("configButton").setAttribute("src", `./token/${config}.png`)
}

function _getRandom(type, plus) {
    let random = Math.floor(Math.random() * type.length)
    if (plus) {
        random = Math.floor((Math.random() * type) + 1)
    }
    return random
}

function _clearImage2() {
    const image2 = document.getElementById("image2");
    image2.setAttribute("src", '')
}

function randomTerrain(type) {
    _clearImage2()
    const randomIndex = _getRandom(type)
    document.getElementById("image1").setAttribute("src", `./token/${type[randomIndex]}.png`)
}

function randomCarpeado(type) {
    const randomIndex1 = _getRandom(type)
    let randomIndex2 = _getRandom(type)

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = _getRandom(type)
    }

    document.getElementById("image1").setAttribute("src", `./token/${type[randomIndex1]}.png`)
    document.getElementById("image2").setAttribute("src", `./token/${type[randomIndex2]}.png`)
}

function randomMonster(type) {
    _clearImage2()
    let image = "image1"
    if (config) {
        randomTerrain(allTerrains)
        image = "image2"
    }
    document.getElementById(image).setAttribute("src", `./monster/${type}/${_getRandom(monster[type], true)}.png`)
}
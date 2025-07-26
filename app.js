let config = true
const forest = [6, 7, 8, 10, 16, 17, 21]
const mountain = [2, 3, 9, 11, 13, 18, 19]
const water = [1, 4, 5, 12, 14, 15, 20]
const allTerrains = forest.concat(mountain).concat(water)
const monster = { 1: 10, 2: 12, 3: 8 }

function changeConfig() {
    config = !config
    document.getElementById('configButton').setAttribute('src', `./token/${config}.webp`)
}

function _getRandom(type, plus) {
    let random = Math.floor(Math.random() * type.length)
    if (plus) {
        random = Math.floor((Math.random() * type) + 1)
    }
    return random
}

function _clearImage2() {
    document.getElementById('image2').setAttribute('src', '')
    document.getElementById('image2').setAttribute('width', '0')
    document.getElementById('image2').setAttribute('height', '0')
}

function _setTerrain(image, position) {
    const url = `./token/${image}.webp`
    _setImage(url, position)
}

function _setMonster(image, type, position) {
    const url = `./monster/${type}/${image}.webp`
    _setImage(url, position)
}

function _setImage(url, position) {
    document.getElementById(position).setAttribute('src', url)
    document.getElementById(position).setAttribute('width', '200')
    document.getElementById(position).setAttribute('height', '200')
}

function randomTerrain(type) {
    _clearImage2()
    _setTerrain(type[_getRandom(type)], 'image1')
}

function randomCarpeado(type) {
    const randomIndex1 = _getRandom(type)
    let randomIndex2 = _getRandom(type)

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = _getRandom(type)
    }
    _setTerrain(type[randomIndex1], 'image1')
    _setTerrain(type[randomIndex2], 'image2')
}

function randomMonster(type) {
    _clearImage2()
    let position = 'image1'
    if (config) {
        randomTerrain(allTerrains)
        position = 'image2'
    }
    _setMonster(_getRandom(monster[type], true), type, position)
}
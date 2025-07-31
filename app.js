let config = true
const forest = [6, 7, 8, 10, 16, 17, 21]
const mountain = [2, 3, 9, 11, 13, 18, 19]
const water = [1, 4, 5, 12, 14, 15, 20]
const allTerrains = forest.concat(mountain).concat(water)
const monster = { 1: 10, 2: 12, 3: 8 }
const witchers = 7
const mages = 5

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

function _inativeImage2() {
    const image2 = document.getElementById('image2')
    image2.setAttribute('src', '')
    image2.setAttribute('width', '0')
    image2.setAttribute('height', '0')
    image2.hidden = true
}

function _activeImage2() {
    document.getElementById('image2').hidden = false
}

function _setTerrain(image, position, type) {
    const url = `./token/${image}.webp`
    _setImage(url, position)
    const terrain = document.getElementById(position)
    if (type === 'all') {
        terrain.setAttribute('onclick', 'randomCarpeado(allTerrains)')
    } else {
        terrain.setAttribute('onclick', `randomTerrain('${type}')`)
    }
}

function _setMonster(image, type, position) {
    const url = `./monster/${type}/${image}.webp`
    _setImage(url, position)
    document.getElementById(position).setAttribute('onclick', `randomMonster(${type},'${position}')`)
}

function _setChar(image, position, type) {
    let url = `./witchers/${image}.webp`
    if (type === 'mage') {
        url = `./mages/${image}.webp`
    }
    _setImage(url, position)
    const image1 = position === 'image1' ? true : false
    const image2 = position === 'image2' ? true : false
    document.getElementById(position).setAttribute('onclick', `randomChar('${type}', ${image1}, ${image2})`)
}

function _setImage(url, position) {
    const img = document.getElementById(position)
    img.src = url
    img.width = 200
    img.height = 200
}

function _getDoubleRandom(type, plus) {
    const randomIndex1 = _getRandom(type, plus)
    let randomIndex2 = _getRandom(type, plus)

    do {
        randomIndex2 = _getRandom(type, plus)
    } while (randomIndex1 === randomIndex2)

    return [randomIndex1, randomIndex2]
}

function randomTerrain(type) {
    const terrainMap = {
        forest,
        mountain,
        water,
        allTerrains
    }

    if (type === 'allTerrains' || type === 'monster') {
        const terrain = allTerrains[_getRandom(allTerrains)]
        _setTerrain(terrain, 'image1', type === 'monster' ? 'monster' : 'all')
        if (type !== 'monster') _inativeImage2()
    } else if (terrainMap[type]) {
        const terrain = terrainMap[type][_getRandom(terrainMap[type])]
        _setTerrain(terrain, 'image1', type)
        _inativeImage2()
    }
}

function randomCarpeado(type) {
    _activeImage2()
    const [randomIndex1, randomIndex2] = _getDoubleRandom(type)
    _setTerrain(type[randomIndex1], 'image1', 'all')
    _setTerrain(type[randomIndex2], 'image2', 'all')
}

function randomMonster(type, position) {
    _inativeImage2()
    position = position || 'image1'
    if (config) {
        _activeImage2()
        if (position != 'image2') {
            randomTerrain('monster', 'image2')
            position = 'image2'
        }
    }

    _setMonster(_getRandom(monster[type], true), type, position)
}

function randomChar(type, image1, image2) {
    _activeImage2()
    const charMap = {
        witcher: witchers,
        mage: mages
    }

    const [randomIndex1, randomIndex2] = _getDoubleRandom(charMap[type], true)

    if (image1) _setChar(randomIndex1, 'image1', type)
    if (image2) _setChar(randomIndex2, 'image2', type)
}
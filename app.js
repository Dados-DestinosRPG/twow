const forest = [6, 7, 8, 10, 16, 17, 21]
const mountain = [2, 3, 9, 11, 13, 18, 19]
const water = [1, 4, 5, 12, 14, 15, 20]
const allTerrains = forest.concat(mountain).concat(water)
const monster = { 1: 10, 2: 12, 3: 7 }
const witchers = 7
const mages = 5
const attack = 2
const harbor = [1, 5, 6, 9, 12, 13]
const wild = 12

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

function _inativeImage3() {
    const image3 = document.getElementById('image3')
    image3.setAttribute('src', '')
    image3.setAttribute('width', '0')
    image3.setAttribute('height', '0')
    image3.hidden = true
}

function _activeImage3() {
    document.getElementById('image3').hidden = false
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
    } else if (type === 'harbor') {
        terrain.setAttribute('onclick', 'randomHarbor(harbor)')
    } else {
        terrain.setAttribute('onclick', `randomTerrain('${type}')`)
    }
}

function _setWild(image, position, type) {
    const url = `./wildhunt/${image}.webp`
    _setImage(url, position)
    const terrain = document.getElementById(position)
    terrain.setAttribute('onclick', 'randomWild(wild)')
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
    img.classList.remove("girar")
    img.offsetWidth
    img.classList.add("girar")
}

function _getDoubleRandom(type, plus) {
    const randomIndex1 = _getRandom(type, plus)
    let randomIndex2 = _getRandom(type, plus)

    do {
        randomIndex2 = _getRandom(type, plus)
    } while (randomIndex1 === randomIndex2)

    return [randomIndex1, randomIndex2]
}

function _getTripleRandom(type, plus) {
    const randomIndex1 = _getRandom(type, plus)
    let randomIndex2 = _getRandom(type, plus)
    let randomIndex3 = _getRandom(type, plus)

    do {
        randomIndex2 = _getRandom(type, plus)
        randomIndex3 = _getRandom(type, plus)
    } while (randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3)

    return [randomIndex1, randomIndex2, randomIndex3]
}

function _setAttack(url) {
    const image1 = document.getElementById('image1')
    image1.setAttribute('onclick', 'randomAttack(attack)')
    _setImage(url, 'image1')
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
        _inativeImage3()
    }
}

function randomCarpeado(type) {
    _inativeImage3()
    _activeImage2()
    const [randomIndex1, randomIndex2] = _getDoubleRandom(type)
    _setTerrain(type[randomIndex1], 'image1', 'all')
    _setTerrain(type[randomIndex2], 'image2', 'all')
}

function randomMonster(type, position) {
    _inativeImage2()
    _inativeImage3()
    position = position || 'image1'
    _activeImage2()
    if (position != 'image2') {
        randomTerrain('monster', 'image2')
        position = 'image2'
    }

    _setMonster(_getRandom(monster[type], true), type, position)
}

function randomChar(type, image1, image2) {
    _inativeImage3()
    _activeImage2()
    const charMap = {
        witcher: witchers,
        mage: mages
    }

    const [randomIndex1, randomIndex2] = _getDoubleRandom(charMap[type], true)

    if (image1) _setChar(randomIndex1, 'image1', type)
    if (image2) _setChar(randomIndex2, 'image2', type)
}

function randomAttack(attack) {
    _inativeImage2()
    _inativeImage3()
    const url = `./monster/${_getRandom(attack, true)}.webp`
    _setAttack(url)
}

function randomHarbor(harbor) {
    _activeImage2()
    _activeImage3()
    const [randomIndex1, randomIndex2, randomIndex3] = _getTripleRandom(harbor)
    _setTerrain(harbor[randomIndex1], 'image1', 'harbor')
    _setTerrain(harbor[randomIndex2], 'image2', 'harbor')
    _setTerrain(harbor[randomIndex3], 'image3', 'harbor')
}

function randomWild() {
    _activeImage2()
    _activeImage3()

    let imgs = 1

    do {
        const position = `image${imgs}`
        switch (_getRandom(3, true)) {
            case 1:
                _setChar(_getRandom(witchers, true), position, 'witcher')
                break;
            case 2:
                _setChar(_getRandom(mages, true), position, 'mage')
                break;
            case 3:
                const url = `./token/tavern.webp`
                _setImage(url, position)
                break;
        }

        document.getElementById(`image${imgs}`).setAttribute('onclick', 'randomWild()')
        imgs++
    } while (imgs <= 3);
}
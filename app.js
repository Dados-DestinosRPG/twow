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

function _clearImage2() {
    document.getElementById('image2').setAttribute('src', '')
    document.getElementById('image2').setAttribute('width', '0')
    document.getElementById('image2').setAttribute('height', '0')
}

function _setTerrain(image, position, type) {
    const url = `./token/${image}.webp`
    _setImage(url, position)

    if (type === 'monster') {

    }

    if (type === 'all') {
        document.getElementById(position).setAttribute('onclick', 'randomCarpeado(allTerrains)')
    } else {
        document.getElementById(position).setAttribute('onclick', `randomTerrain('${type}')`)
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
    document.getElementById(position).setAttribute('src', url)
    document.getElementById(position).setAttribute('width', '200')
    document.getElementById(position).setAttribute('height', '200')
}

function randomTerrain(type) {
    switch (type) {
        case 'forest':
            _setTerrain(forest[_getRandom(forest)], 'image1', type)
            _clearImage2()
            break;
        case 'mountain':
            _setTerrain(mountain[_getRandom(mountain)], 'image1', type)
            _clearImage2()
            break;
        case 'water':
            _setTerrain(water[_getRandom(water)], 'image1', type)
            _clearImage2()
            break;
        case 'allTerrains':
            _setTerrain(allTerrains[_getRandom(allTerrains)], 'image1', 'all')
            _clearImage2()
            break;
        case 'monster':
            _setTerrain(allTerrains[_getRandom(allTerrains)], 'image1', 'monster')
            break;
    }
}

function _getDoubleRandom(type, plus) {
    const randomIndex1 = _getRandom(type, plus)
    let randomIndex2 = _getRandom(type, plus)

    while (randomIndex1 === randomIndex2) {
        randomIndex2 = _getRandom(type, plus)
    }

    return [randomIndex1, randomIndex2]
}

function randomCarpeado(type) {
    const [randomIndex1, randomIndex2] = _getDoubleRandom(type)
    _setTerrain(type[randomIndex1], 'image1', 'all')
    _setTerrain(type[randomIndex2], 'image2', 'all')
}

function randomMonster(type, position) {
    _clearImage2()
    position = position || 'image1'
    if (config && position != 'image2') {
        randomTerrain('monster', 'image2')
        position = 'image2'
    }
    _setMonster(_getRandom(monster[type], true), type, position)
}

function randomChar(type, image1, image2) {
    if (type === 'witcher') {
        const [randomIndex1, randomIndex2] = _getDoubleRandom(witchers, true)
        if (image1) {
            _setChar(randomIndex1, 'image1', 'witcher')
        }
        if (image2) {
            _setChar(randomIndex2, 'image2', 'witcher')
        }
    } else {
        const [randomIndex1, randomIndex2] = _getDoubleRandom(mages, true)
        if (image1) {
            _setChar(randomIndex1, 'image1', 'mage')
        }
        if (image2) {
            _setChar(randomIndex2, 'image2', 'mage')
        }
    }
}
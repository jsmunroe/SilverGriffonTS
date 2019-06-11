var DefaultTheme = {
    floor: [
        { id: 0x0001, sprite: './img/tilesets/stone/floor.gray.png', connect: true }
    ],
    wall: [
        { id: 0x0010, sprite: './img/tilesets/stone/wall.gray.png', connect: true }
    ],
    upStair: [
        { id: 0x0020, sprite: './img/tiles/stone/upstair.png' }
    ],
    downStair: [
        { id: 0x0021, sprite: './img/tiles/stone/downstair.png' }
    ],
    chest: [
        { id: 0x0031, sprite: './img/items/containers/chest.png' }
    ],
    coin: [
        { id: 0x0032, sprite: './img/items/misc/coin.png' }
    ],
    map: [
        { id: 0x0033, sprite: './img/items/misc/map.png' }
    ]
}

var Config = {
    keys: {
        moveUp : ['ArrowUp', 'KeyW'],
        moveDown: ['ArrowDown', 'KeyS'],
        moveLeft: ['ArrowLeft', 'KeyA'], 
        moveRight: ['ArrowRight', 'KeyD'],
        pause: ['Escape']
    },
    tileSize: 48,
    playerZoom: 2,
    theme: DefaultTheme,
    characters: {
        player: {
            spritePath: './img/characters/player/player.png',
            speed: 150,
        },
        sewer: {
            rat: {
                spritePath: './img/characters/sewer/rat.png',
                speed: 100,
            }
        }
    }
};


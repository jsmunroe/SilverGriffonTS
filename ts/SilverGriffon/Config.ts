var DefaultTheme = {
    floor: [
        { id: 0x0001, sprite: './img/tiles/stone/floor00.png', freq: 1.0 },
        { id: 0x0002, sprite: './img/tiles/stone/floor01.png', freq: 0.015 },
        { id: 0x0003, sprite: './img/tiles/stone/floor02.png', freq: 0.015 },
        { id: 0x0004, sprite: './img/tiles/stone/floor03.png', freq: 0.015 },
        { id: 0x0005, sprite: './img/tiles/stone/floor04.png', freq: 0.015 },
        { id: 0x0006, sprite: './img/tiles/stone/floor05.png', freq: 0.015 },
        { id: 0x0007, sprite: './img/tiles/stone/floor06.png', freq: 0.015 }
    ],
    wall: [
        { id: 0x0010, sprite: './img/tiles/stone/wall00.png' }
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
    tileSize: 40,
    playerZoom: 2,
    theme: DefaultTheme,
    characters: {
        player: {
            spritePath: './img/characters/player/player.png'
        }
    }
};


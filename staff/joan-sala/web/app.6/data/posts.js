const posts = []
posts.count = 0

// populate posts

posts.push({
    id: ++posts.count,
    user: users[0].id,
    image: 'https://i0.wp.com/elretohistorico.com/wp-content/uploads/2022/07/pinocho_portada_ea8c8dcc.webp?fit=1920%2C1080&ssl=1',
    text: 'Medidating in the mountains'
})

posts.push({
    id: ++posts.count,
    user: users[1].id,
    image: 'https://img.wattpad.com/cover/308439499-256-k414519.jpg',
    text: 'No pain, no gain'
})

posts.push({
    id: ++posts.count,
    user: users[2].id,
    image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/12/Ada-Lovelace.jpg',
    text: 'Posing'
})

posts.push({
    id: ++posts.count,
    user: users[0].id,
    image: 'https://static.tvtropes.org/pmwiki/pub/images/pinoc.jpg',
    text: 'Accident'
})
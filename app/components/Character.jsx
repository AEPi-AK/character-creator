import 'whatwg-fetch'
const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']
const MAX_LEVEL = 8
const DRAGONSLAYER_LEVEL = 4

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
}

function calculateLevel(points) {
  if (points < 50) return 1
  if (points < 230) return 2
  if (points < 420) return 3
  if (points < 660) return 4
  if (points < 840) return 5
  if (points < 1270) return 6
  if (points < 1690) return 7
  return 8
}

async function getCharacter(identifier) {
  console.log(`getCharacter(${identifier})`)
  const response = await fetch(window.API_BASE + `/characters/${identifier}`)
  if (response.status == 404) { // not found
    return null
  }
  return await response.json()
}

async function createCharacter(character) {
  console.log('createCharacter')
  const response = await fetch(window.API_BASE + '/characters/create', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(character),
  })

  if (response.status == 201) { // created
    return await response.json()
  }

  throw response
}

async function updateCharacter(character) {
  console.log('updateCharacter')
  const response = await fetch(window.API_BASE + '/characters/update', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    // pro_id is the only thing we ever want to update from the kiosk
    body: JSON.stringify({
      id: character.id,
      pro_id: character.pro_id
    }),
  })

  if (response.status == 200) { // updated
    return await response.json()
  }

  throw response
}

export {
  RACES,
  STATS,
  MAX_LEVEL,
  DRAGONSLAYER_LEVEL,
  rollDie,
  calculateLevel,
  getCharacter,
  createCharacter,
  updateCharacter,
}
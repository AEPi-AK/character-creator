import 'whatwg-fetch'
const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']
const MAX_LEVEL = 8
const DRAGONSLAYER_LEVEL = 4
const api_base = 'http://api.ExileFromMorewood.com'

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
}

function calculateLevel(points) {
  if (points < 50) return 1
  if (points < 110) return 2
  if (points < 220) return 3
  if (points < 420) return 4
  if (points < 660) return 5
  if (points < 840) return 6
  if (points < 1270) return 7
  return 8
}

async function getCharacter(identifier) {
  const response = await fetch(api_base + `/characters/${identifier}`)
  if (response.status == 404) { // not found
    return null
  }
  return await response.json()
}

async function createCharacter(character) {
  console.log('creating character')
  console.log(character)
  const response = await fetch(api_base + '/characters/create', {
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

export {
  RACES,
  STATS,
  MAX_LEVEL,
  DRAGONSLAYER_LEVEL,
  rollDie,
  calculateLevel,
  getCharacter,
  createCharacter,
}

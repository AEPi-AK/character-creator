import 'whatwg-fetch'
const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']
const MAX_LEVEL = 8
const DRAGONSLAYER_LEVEL = 4
const api_base = 'http://api.ExileFromMorewood.com'

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
}

function calculateLevel(experience) {
  if (experience < 50) return 1
  if (experience < 110) return 2
  if (experience < 220) return 3
  if (experience < 420) return 4
  if (experience < 660) return 5
  if (experience < 840) return 6
  if (experience < 1270) return 7
  return 8
}

async function getCharacter(identifier) {
  const response = await fetch(api_base + `/characters/${identifier}`)
  if (response.status == 404) {
    return null
  }
  return await response.json()
}

function createCharacter(character, callback) {
  return fetch(api_base + '/characters/create', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(character),
  })
  .then(data => data.json())
  .then(character => {
    callback(null, character)
  })
  .catch(callback)
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

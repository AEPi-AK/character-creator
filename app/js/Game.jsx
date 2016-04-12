import 'whatwg-fetch'
const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']
const MAX_LEVEL = 6
const api_base = 'http://api.ExileFromMorewood.com'

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
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
  rollDie,
  getCharacter,
  createCharacter,
}

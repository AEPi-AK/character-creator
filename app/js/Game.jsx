const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']
const MAX_LEVEL = 6
const api_base = 'http://api.ExileFromMorewood.com'

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
}

function createCharacter(character, callback) {
  return fetch(api_base + '/characters/create', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: character.id}),
  })
  .then(data => data.json())
  .then(response => {
    // TODO: Set character directly from response once endpoint is updated.
    character.num = response.num
    callback(null, character)
  })
  .catch(callback)
}


export {
  RACES,
  STATS,
  MAX_LEVEL,
  rollDie,
  createCharacter,
}

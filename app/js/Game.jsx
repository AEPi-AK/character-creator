const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']
const MAX_LEVEL = 6

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
}

export {
  RACES,
  STATS,
  rollDie,
  MAX_LEVEL,
}

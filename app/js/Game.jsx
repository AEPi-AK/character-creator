const RACES = ['Human', 'Dwarf', 'Elf']
const STATS = ['strength', 'wisdom', 'dexterity']

function rollDie() {
   return Math.floor(Math.random() * 20) + 1
}

export {
  RACES,
  STATS,
  rollDie,
}

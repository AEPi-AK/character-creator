var gaussian = require('./gaussian.js')

const PLAYER_HP_MULTIPLIER = 5

function playerHP(level, strength) {
  return (PLAYER_HP_MULTIPLIER*level*strength)
}

function playerDamage(level, strength, sDev) {
  var meanDamage = level*strength
  var distribution = gaussian(meanDamage, sDev)
  return Math.floor(distribution.ppf(Math.random()))
}

function monsterDamage(meanDamage, sDev) {
  var distribution = gaussian(meanDamage, sDev)
  return Math.floor(distribution.ppf(Math.random()))
}
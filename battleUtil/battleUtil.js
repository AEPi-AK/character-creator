
const PLAYER_HP_MULTIPLIER = 5

var gaussian = require('./gaussian/lib/gaussian.js');

console.log(monsterDamage(monsterAttackBase, monsterConstant))

function playerHP(level, strength) {
  return (PLAYER_HP_MULTIPLIER*level*strength)
}

function playerDamage(level, strength, variance) {
  var meanDamage = level*strength
  var distribution = gaussian(meanDamage, variance)
  return Math.floor(distribution.ppf(Math.random()))
}

function monsterDamage(meanDamage, variance) {
  var distribution = gaussian(meanDamage, variance)
  return Math.floor(distribution.ppf(Math.random()))
}
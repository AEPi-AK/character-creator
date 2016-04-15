import 'whatwg-fetch'

import { rollDie, DRAGONSLAYER_LEVEL, calculateLevel, calculateHp } from '../Character.jsx'

const PLAYER_HP_MULTIPLIER = 5
const MONSTERS = [
  {
    id: 'gnoll',
    name: 'Forest Gnoll',
    hp: 30,
    hp_max: 30,
    level: 3,
    color: 'green-light',
    baseDamage: 10,
    variance: 4,
    pointsAwarded: 50,
  },
  {
    id: 'hill-giant',
    name: 'Hill Giant',
    hp: 80,
    hp_max: 80,
    level: 5,
    color: 'green-light',
    baseDamage: 20,
    variance: 8,
    pointsAwarded: 75,
  },
  {
    id: 'werebear',
    name: 'Werebear',
    hp: 190,
    hp_max: 190,
    level: 5,
    color: 'green-light',
    baseDamage: 40,
    variance: 12,
    pointsAwarded: 100,
  },
  {
    id: 'dragon',
    name: 'Forest Dragon',
    hp: 400,
    hp_max: 400,
    level: 5,
    color: 'green-light',
    baseDamage: 60,
    pointsAwarded: 300,
    variance: 5,
  },
]

// Adds a player, returns state
async function helloPlayer(player, number) {
  console.log(`helloPlayer(id="${player.id}" number=${number})`)
  const response = await fetch(window.GAME_BASE + '/hello', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      player: {
        id: player.id,
        hitpoints: player.hp_max,
      },
      player_number: number,
    }),
  })

  if (response.status == 200) {
    const state = await response.json()
    return state
  }_

  throw response
}

// Adds a monster, returns state.
// This state will be fresh (no characters other than the monster).
async function helloMonster(monster) {
  console.log(`helloMonster(id="${monster.id}")`)
  const response = await fetch(window.GAME_BASE + '/hello-monster', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      monster: {
        id: monster.id,
        hitpoints: monster.hp,
      }
    }),
  })

  if (response.status == 200) {
    const state = await response.json()
    return state
  }

  throw response
}

// Does an attack of "damage" to the identifier, returns the state.
async function attack(target_id, attacker_id, damage, name) {
  // console.log(`attack(id=${target_id}, id=${attacker_id}, ${damage})`)
  const response = await fetch(window.GAME_BASE + '/attack', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      attacker: attacker_id,
      target: target_id,
      damage,
      attack_name: name,
    }),
  })

  if (response.status == 200) {
    const state = await response.json()
    return state
  }

  throw response
}

// Returns true if identifier can take another attack, otherwise false.
// Returns state
async function poll(identifier) {
  // console.log(`poll(identifier="${identifier}")`)
  const response = await fetch(window.GAME_BASE + '/poll', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: identifier,
    }),
  })

  if (response.status == 200) {
    const data = await response.json()
    return {
      canAttack: data.can_attack,
      gameState: data.state,
    }
    return data
  }

  throw response
}

function monsterFromId(id) {
  return MONSTERS.find(monster => monster.id === id)
}

function getRandomMonster() {
  return MONSTERS[Math.floor(Math.random() * 10) % MONSTERS.length]
}

function playerFromCharacter(character) {
  let player = {}
  player.level = calculateLevel(character.points)
  player.points = character.points
  player.hp_max = calculateHp(character)
  player.hp = player.hp_max
  player.isDragonSlayer = player.level >= DRAGONSLAYER_LEVEL && character.pro_id
  player.color = player.isDragonSlayer ? 'red' : 'yellow'
  player.name = character.name
  player.strength = character.strength
  player.dexterity = character.dexterity
  player.wisdom = character.wisdom
  player.race = character.race
  player.id = character.id
  return player
}

export {
  helloPlayer,
  helloMonster,
  attack,
  poll,
  monsterFromId,
  getRandomMonster,
  playerFromCharacter,
}

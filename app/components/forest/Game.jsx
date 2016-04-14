import 'whatwg-fetch'

import { rollDie } from '../Character.jsx'

// Adds a player, returns state
async function helloPlayer(player, number) {
  console.log('helloPlayer()')
  const response = await fetch(window.GAME_BASE + '/hello', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      player: {
        id: player.id,
        hitpoints: 100,
        player_number: number,
      }
    }),
  })

  if (response.status == 200) {
    const state = await response.json()
    return state
  }

  throw response
}

// Adds a monster, returns state.
// This state will be fresh (no characters other than the monster).
async function helloMonster(monster) {
  console.log('helloMonster()')
  const response = await fetch(window.GAME_BASE + '/hello-monster', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      monster: {
        id: monster.race,
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
async function attack(player, monster, damage) {
  console.log(`attack(id=${player.id}, id=${monster.id}, ${damage})`)
  const response = await fetch(window.GAME_BASE + '/attack', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      attacker: player.id,
      monster: monster.race,
      damage,
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
  console.log(`poll(${identifier})`)
  const response = await fetch(window.GAME_BASE + '/poll', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      identifier,
    }),
  })

  if (response.status == 200) {
    const data = await response.json()
    return {
      can_attack: data.can_attack,
      state: data.state,
    }
    return data
  }

  throw response
}

const MONSTERS = [
  {
    race: 'gnoll',
    name: 'Forest Gnoll',
    hp: 300,
    hp_max: 300,
    level: 3,
    color: 'green-light',
  },
  {
    race: 'hill-giant',
    name: 'Hill Giant',
    hp: 500,
    hp_max: 400,
    level: 5,
    color: 'green-light',
  }
]

function getRandomMonster() {
  return MONSTERS[Math.floor(Math.random() * 10) % MONSTERS.length]
}

export {
  helloPlayer,
  helloMonster,
  attack,
  poll,
  getRandomMonster,
}

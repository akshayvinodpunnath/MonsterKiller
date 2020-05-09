const ATTACK_VALUE = 10;
const STONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

//Global Constants
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum Life for you and the monster.', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth : playerHealth
    }

    switch(event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case  LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_GAME_OVER:
            break;
    }

    // if (event === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = 'MONSTER';
    // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry.target = 'MONSTER';
    // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry.target = 'PLAYER';
    // } else if (event === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry.target = 'PLAYER';
    // }  else if (event === LOG_EVENT_GAME_OVER) {
    // }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    // if (!hasBonusLife) {
    //     addBonusLife();
    // }
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    )

    if (currentPlayerHealth <= 0  && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert('You would be dead but the bonus live saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You Won!!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
          );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth >0 ) {
        alert('You Lost!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
          );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0 ) {
        alert('You have a draw!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
          );
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth  <=0) {
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = 
        mode === MODE_ATTACK ? 
        ATTACK_VALUE : STONG_ATTACK_VALUE;
    const logEvent = 
        mode === MODE_ATTACK ? 
        LOG_EVENT_PLAYER_ATTACK: LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    
    const damage = dealMonsterDamage(maxDamage)
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
      );
    endRound();
}

function healPlayer() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('You cannot heal more than you max initial health.')
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
      );
    endRound();
}

function printLogHandler() {
    // for (let i = 0; i < battleLog.length; i++) {
    //     console.log(battleLog[i]);
    // }
    //console.log(battleLog);
    for (const logEntry of battleLog) {
        for (const key in logEntry) {
            console.log(`${key} => ${logEntry[key]}`);
        }
    }
}
// function attackHandler() {
//     attackMonster('ATTACK');
// }

// function strongAttachHandler() {
//     attackMonster('STRONG_ATTACK');
// }

attackBtn.addEventListener('click', function() {
    attackMonster(MODE_ATTACK)
});

strongAttackBtn.addEventListener('click', function() {
    attackMonster(MODE_STRONG_ATTACK)
});

healBtn.addEventListener('click', healPlayer);

logBtn.addEventListener('click', printLogHandler);
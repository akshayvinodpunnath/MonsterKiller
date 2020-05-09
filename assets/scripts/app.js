const ATTACK_VALUE = 10;
const STONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

//Global Constants
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const enteredValue = prompt('Maximum Life for you and the monster.', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

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

    if (currentPlayerHealth <= 0  && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert('You would be dead but the bonus live saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You Won!!!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth >0 ) {
        alert('You Lost!!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0 ) {
        alert('You have a draw!!!');
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth  <=0) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STONG_ATTACK_VALUE;
    }
    
    const damage = dealMonsterDamage(maxDamage)
    currentMonsterHealth -= damage;
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
    endRound();
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


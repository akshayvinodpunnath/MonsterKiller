const ATTACK_VALUE = 10;
const STONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STONG_ATTACK_VALUE;
    }
}

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE)
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You Won!!!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth >0 ) {
        alert('You Lost!!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0 ) {
        alert('You have a draw!!!');
    }
}

function strongAttachHandler() {
    const damage = dealMonsterDamage(STONG_ATTACK_VALUE)
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You Won!!!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth >0 ) {
        alert('You Lost!!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0 ) {
        alert('You have a draw!!!');
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttachHandler);
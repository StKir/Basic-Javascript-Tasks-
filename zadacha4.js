const readlineSync = require('readline-sync');
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}
const person = {
    maxHealth: 0,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

const setLevel = () => {
    const level = readlineSync.question('Enter a level (easy, normal, hard) ');
    switch (level){
        case 'easy':
            person.maxHealth = 50;
            break;
        case 'normal':
            person.maxHealth = 25;
            break
        case 'hard':
            person.maxHealth = 10;
            break
        default:
            console.log('Неверные данные');
    }
}

const checkSteck = (punch, steck) => {
   //проверка не в кулдауне ли способность
   if(steck.find(el => el.name === punch.name)) {
        return steck.find((el,i) => el.name === punch.name && i+1 > punch.cooldown)
   } else {
        return true
   }
}

const monsterAtack = (steck) => {
    let n = null
    let attackPick = false;
    while(attackPick === false) {
        n = Math.floor(Math.random() * (4 - 1))
        if(checkSteck(monster.moves[n], steck.monsterSteck)) {
            steck.monsterSteck = [monster.moves[n], ...steck.monsterSteck]
            console.log(`Монстр готовится сделать ${monster.moves[n].name}`);
            attackPick = true
        }
    }
}

const personAtack = (steck) => {
    let attackPick = false;
    while(attackPick === false) {
        const n = readlineSync.question(`
        Enter a punch number 
        0 -  Удар боевым кадилом
        1 -  Вертушка левой пяткой
        2 -  Каноничный фаербол
        3 -  Магический блок`);

        if(checkSteck(person.moves[n], steck.personSteck)) {
            steck.personSteck = [person.moves[n], ...steck.personSteck]
            console.log(`Евстафий готовится сделать ${person.moves[n].name}`);
            attackPick = true
        } else {
            console.log('Способность недоступна');
        }
    }
}

setLevel();
console.log('Битва начинается Лютый VS Евстафий');
const steck = {
    personSteck: [],
    monsterSteck: []
    };
let i=0
while(i != 5){
    monsterAtack(steck);
    personAtack(steck)
    i++
}
console.log(steck);
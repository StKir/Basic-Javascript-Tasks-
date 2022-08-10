const readlineSync = require('readline-sync');

//ПЕРСОНАЖИ
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
//КОНЕЦ ПЕРСОНАЖЕЙ

// СКРИПТЫ ИГРЫ
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
} //Устанавливает уровень сложности easy - 50хп, normal - 25хп, hard - 10хп

const checkSteck = (punch, steck) => {
   if(steck.find(el => el.name === punch.name)) {
        return steck.find((el) => el.name === punch.name && steck.indexOf(el) >= punch.cooldown)
   } else {
        return true
   }
}//Проверка доступна ли способность

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
}//Монстр атакует

const personAtack = (steck) => {
    let attackPick = false;
    while(!attackPick) {
        const n = readlineSync.question(`
        Enter a punch number 
        0 -  Blow with a military censer 
        1 -  Left heel spinner  
        2 -  Canonical fireball
        3 -  Magic Block
        Your choice -- `);

        if(checkSteck(person.moves[n], steck.personSteck)) {
            steck.personSteck = [person.moves[n], ...steck.personSteck]
            console.log(`Евстафий готовится сделать ${person.moves[n].name}, способность будет не доступна ${person.moves[n].cooldown} хода/ов`);
            attackPick = true
        } else {
            console.log('Способность недоступна');
        }
    }
}//Маг атакует

const dealingDamage = (steck) => {
    const monsterLastPunch = steck.monsterSteck[0]
    const personLastPunch = steck.personSteck[0]
    let magicDmgMonster = personLastPunch.magicArmorPercents - monsterLastPunch.magicDmg;//Магический урон монстра
    let magicDmgPerson = monsterLastPunch.magicArmorPercents - personLastPunch.magicDmg; //Магический урон мага
    let physicDmgMonster = personLastPunch.physicArmorPercents - monsterLastPunch.physicalDmg; //Физический урон монстра
    let physicDmgPerson = monsterLastPunch.physicArmorPercents - personLastPunch.physicalDmg; //Физический урон мага
    magicDmgMonster > 0? (magicDmgMonster = 0): (magicDmgMonster) //Если урон меньше чем защита, то нанесенный урон = 0
    magicDmgPerson > 0? (magicDmgPerson = 0): (magicDmgPerson) //Если урон меньше чем защита, то нанесенный урон = 0
    physicDmgMonster > 0? (physicDmgMonster = 0): (physicDmgMonster) //Если урон меньше чем защита, то нанесенный урон = 0
    physicDmgPerson > 0? (physicDmgPerson = 0): (physicDmgPerson) //Если урон меньше чем защита, то нанесенный урон = 0
    console.log('Урон мага - ', magicDmgPerson + physicDmgPerson ,'Урон монстра - ', magicDmgMonster + physicDmgMonster);
    return {monsterDamage: Number(magicDmgMonster + physicDmgMonster), 
                personDamage: Number(magicDmgPerson + physicDmgPerson)} //Возвращаем общий урон физическтй + магический (Сумма - всегда отрицательная или = 0)
}//Нанесение урона
//КОНЕЦ СКРИПТОВ

//НАЧАЛО ИГРОВОГО СЦЕНАРИЯ
while(person.maxHealth === 0) {
    setLevel();
} // Игра не начнется пока не выбран уровень сложности

console.log('----------------------------------');
console.log('Битва начинается Лютый VS Евстафий');
console.log('----------------------------------');

const steck = {
    personSteck: [],
    monsterSteck: []
    };//Стек выбранных способностей

let monsterHp = Number(monster.maxHealth);
let personHp = Number(person.maxHealth);
//Установка начальных значений здоровья 

while(monsterHp > 0 && personHp > 0){
    monsterAtack(steck);
    personAtack(steck)
    monsterHp += dealingDamage(steck).personDamage;
    personHp += dealingDamage(steck).monsterDamage;
    console.log(`Здоровье Лютого - ${monsterHp} ХП. Здоровье Евстафия - ${personHp} ХП`);
}
console.log('----------------------------------');
monsterHp > personHp? console.log('Победил Лютый'): console.log('Победил Евстафий');
console.log('----------------------------------');

//ЗАПУСК - node zadacha4.js
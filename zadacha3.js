const readlineSync = require('readline-sync');
// const userName = readlineSync.question('Как тебя зовут? ');

const getRandomNum = () => {
    let trueNum = '';
    num = Math.floor(Math.random() * (6 - 3)) + 3; // Колличество цифр в загаданном числе от 3х до 6ти
    while (trueNum.length != num) {
        const n = Math.floor(Math.random() * (9 - 1)) + 1;
        if(!trueNum.includes(n)) {trueNum += n }
    }
    return trueNum;
}

const getNumbersMissed = (HiddenNumber, number) => {
    let i1 = 0;
    let mas1 = [];
    for(let j = 0; j < number.length; j++){
        if(HiddenNumber.includes(number[j]) 
            && HiddenNumber.indexOf(number[j]) != j
            && HiddenNumber.lastIndexOf(number[j]) != number.lastIndexOf(number[j]))
            {
                mas1.push(number[j])
                i1++;
            }
    }
    return {i1,mas1}
} // Вычисляет цифры не на своем месте 

const getNumbersCaught = (HiddenNumber, number) => {
    let i2 = 0;
    let mas2 = [];
    for(let j = 0; j < number.length; j++){
        if(HiddenNumber.indexOf(number[j]) === j)
            {
                mas2.push(number[j])
                i2++;
            }
    }
    return {i2,mas2}
} // Вычисляет цифры на своем месте 

const numberOfAttempts = 5; // колличсетво попыток

const HiddenNumber = getRandomNum()

for(let i = 0; i < numberOfAttempts; i++){
    const number = readlineSync.question('Enter a number ');
    if(HiddenNumber === number){
        console.log(`ДА! это число - ${number}`);
        return 
    } else {
        const {i1, mas1} = getNumbersMissed(HiddenNumber, number)
        const {i2, mas2} = getNumbersCaught(HiddenNumber, number)
        console.log(`Cовпавших цифр не на своих местах - ${i1} (${mas1}), цифр на своих местах - ${i2} (${mas2})`);
    }
}

console.log('Число - ',HiddenNumber);
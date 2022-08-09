// Задача 1.
let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

const days = [
    {
        rus: 'ПОНЕДЕЛЬНИК',
        eng: 'MONDAY'
    },
    {
        rus: 'ВТОРНИК',
        eng: 'TUESDAY'
    },
    {
        rus: 'СРЕДА',
        eng: 'WEDNESDAY'
    },
    {
        rus: 'ЧЕТВЕРГ',
        eng: 'THURSDAY'
    },
    {
        rus: 'ПЯТНИЦА',
        eng: 'FRIDAY'
    },
    {
        rus: 'СУББОТА',
        eng: 'SATURDAY'
    },
    {
        rus: 'ВОСКРЕСЕНЬЕ',
        eng: 'SUNDAY'
    },
]

const getNewTxt = (str, arr) => {
    arr.forEach(el => {
        if(str.includes(el.rus)){
            const num = str.indexOf(el.rus);
            str = str.slice(0,num)
                    + el.eng 
                    + str.slice(num + el.rus.length)
        }
    })
    console.log(str);
}

getNewTxt(str, days);
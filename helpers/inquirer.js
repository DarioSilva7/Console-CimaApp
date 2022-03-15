const inquirer = require('inquirer');
require('colors');

const preguntas= [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name:  `${'2.'.green} Historial`
            },
            {
                value: 0,
                name:  `${'0.'.green} Salir`
            }
        ]
    }
]

module.exports.inquirerMenu= async()=>{
    console.clear()
    console.log("==================================".green)
    console.log("Selecciona una opcion:".white)
    console.log("==================================\n".green)

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion
}

module.exports.pausa= async ()=>{
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione  ${'enter'.green } para continuar.`
        }
    ]
    console.log('\n')
    await  inquirer.prompt(question)
}

module.exports.leerInput= async (message)=>{
    const question= [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0){
                    return "Por favor ingrese un valor"
                }
                return true
            }
        }
    ]
    const {desc} = await inquirer.prompt(question)

    return desc
}

module.exports.listarLugares= async( lugares= [])=>{

    const choices = lugares.map((lugar,i)=>{
        const index= `${ i+1 }.`.green
        return {
            value: lugar.id,
            name: `${index} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        massage: 'Seleccione lugar:',
        choices
    }]
    const {id} = await inquirer.prompt(preguntas)
    return id
}

module.exports.confirmar = async (message)=>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(pregunta)
    return ok
}

module.exports.mostrarCheckList = async (tareas=[]) => {
    const choices= tareas.map( (tarea, i)=>{
        const index= `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true: false 
        }
    })
    const pregunta= [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta)
    return ids
}
//FORMULARIOS --------------------------------------------------------------------------------------------------------------
// 1- Expresiones Regulares. -> Llamadas RegExp o RegEx
// 2- Validaciones HTML5.
// 3- Validaciones solo con JS.
// 4- Ejemplo práctico con Bootstrap 5.
// 5- FormData.

/* 
1- Regular Expressions (opens new window): Las expresiones regulares (a menudo llamadas RegExp o RegEx) son patrones que se utilizan para hacer coincidir combinaciones de caracteres en cadenas.
Fuente #02 (opens new window): Son un sistema para buscar, capturar o reemplazar texto utilizando patrones.
Estos patrones permiten realizar una búsqueda de texto de una forma relativamente sencilla y abstracta, de forma que abarca una gran cantidad de posibilidades que de otra forma sería imposible o muy costosa.

/patron/flags

Flags de una RegExp :
    i Ignora mayúsculas y minúsculas. Se suele denominar insensible a mayús/minús.
    g Búsqueda global. Sigue buscando coincidencias en lugar de pararse al encontrar una.
    m Multilínea. Permite a ^ y $ tratar los finales de línea \r o \n.


Métodos de RegExp
El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
Retorna true si existe una coincidencia entre la expresión regular y la cadena especificada; de lo contrario retorna false.
Use test()cuando desee saber si existe la ocurrencia de un patrón en una cadena

Carácteres especiales
    [ ] Rango de carácteres. Cualquiera de los caracteres del interior de los corchetes.
    | Establece una alternativa: lo que está a la izquierda o lo que está a la derecha. 

    [0-9] Un dígito del 0 al 9.
    [A-Z] Letra mayúscula de la A a la Z. Excluye ñ o letras acentuadas.
    [a-z] Letra minúscula de la a a la z. Excluye ñ o letras acentuadas.
    [A-Za-z0-9] Carácter alfanumérico (letra mayúscula, minúscula o dígito).


    PARA VALIDAR SOLO NUMEROS: /^\d+$/gi;
    PARA VALIDAR SOLO LETRAS(sin tilde): /^[a-zA-Z ]*$/;
    PARA VALIDAR LETRAS(con tide): /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    PARA VALIDAR EMAIL: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/ **********************************
*/

//notacion literal
// const regExp = /[0-9]/gi;

//notacion de objeto
// const regExpObjeto = new RegExp('bluweb|bluuweb', 'gi'); //en la notacion de objeto la i(segundo parametro) va entre comillas

// console.log(regExp.test('123123'));




//VALIDACION DE FORMULARIOS -----------------------------------------------------------------------------------------------------
/* Hay dos tipos diferentes de validación por parte del cliente que encontrarás en la web:

La validación de formularios incorporada: utiliza características de validación de formularios HTML5, Esta validación generalmente no requiere mucho JavaScript. La validación de formularios incorporada tiene un mejor rendimiento que JavaScript, pero no es tan personalizable como la validación con JavaScript.

La validación con JavaScript: se codifica utilizando JavaScript. Esta validación es completamente personalizable, pero debes crearlo todo (o usar una biblioteca).
 */



//EVENTOS DE CAPTURA EN JAVASCRIPT ------------------------------------------------------------------------------------------

const formulario = document.getElementById('formulario'); //capturamos el formulario
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

//expresione regulares
const regUserName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

//expresiones de alerta
const alertName = document.getElementById('alertName');
const alertEmail = document.getElementById('alertEmail');
const enviar = document.getElementById('enviar');


const mostrarMensajeExito = () => {
    enviar.classList.remove('d-none');
    enviar.textContent = 'Mensaje enviado con éxito';
}


const mostrarMensajeError = (errores) => {
    errores.forEach( item => {
        
        item.tipo.classList.remove('d-none');
        item.tipo.textContent = item.mensaje

    });
}

formulario.addEventListener('submit', e => {
    e.preventDefault() //detiene lo que el navegador hace por defecto
    // console.log('Formulario vinculado');

    // console.log(userName.value);
    // console.log(userEmail.value);

    enviar.classList.add('d-none')

    const errores = [];

    if(!regUserName.test(userName.value) || !userName.value.trim()){ //trim nos ahorra saber si tenemos espacios en nuestros campos
        // console.log('Formato no valido');
        // return //con eso evitamos el else, sino pasa el return termina
        userName.classList.add('is-invalid');
        errores.push({
            tipo: alertName,
            mensaje : 'Formato no valido en el campo nombre, solo letras.',
        })
    }
    else{
        userName.classList.remove('is-invalid')
        userName.classList.add('is-valid')
        alertName.classList.add('d-none')
    }

    if(!regUserEmail.test(userEmail.value) || !userEmail.value.trim()){
        // console.log('Email no valido');
        // return
        userEmail.classList.add('is-invalid');
        errores.push({
            tipo: alertEmail,
            mensaje : 'Ingrese un correo valido.',
        })
    }
    else{
        userEmail.classList.remove('is-invalid')
        userEmail.classList.add('is-valid')
        alertEmail.classList.add('d-none')
    }


    if(errores.length !== 0){
        mostrarMensajeError(errores);
        return
    }


    console.log('Formulario enviado');
    mostrarMensajeExito();
});




//FORM DATA ------------------------------------------------------------------------------------------------
/* 
formData (opens new window): La interfaz FormData proporciona una manera sencilla de construir un conjunto de parejas clave/valor que representan los campos de un formulario y sus valores, que pueden ser enviados fácilmente. Están destinados principalmente para el envío de los datos del formulario, pero se pueden utilizar de forma independiente con el fin de transmitir los datos tecleados.
API/FormData)(opens new window)
FormData.get() Devuelve el primer valor asociado con una clave dada en un objeto FormData.
FormData.entries() Devuelve un iterator que permite recorrer todas las parejas clave/valor contenidas en este objeto.
FormData.values() Devuelve un iterator que permite recorrer todos los valores contenidos en este objeto.

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("funciona");

    const inputs = new FormData(formulario);
    console.log(inputs.get("userName"));
    console.log(inputs.get("userEmail"));

    for (let campo of inputs.values()) {
        console.log(campo);
    }

    for (let campo of inputs.entries()) {
        console.log(campo);
    }
});

*/




















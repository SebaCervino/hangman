var btnGuardarPalabra = document.querySelector("#btn-guardar");
var masOcho = document.querySelector("#mas-ocho");
var textoConNumeros = document.querySelector("#texto-con-numeros");
var menosUno = document.querySelector("#menos-uno");
var acentos = document.querySelector("#no-acentos");

var newWord = document.querySelector("#ingresar-palabra");
newWord.focus();

let numeros=["0","1","2","3","4","5","6","7","8","9"];
let noAcentos=["á","é","í","ó","ú","ñ"];

btnGuardarPalabra.addEventListener("click",function(){

    var errores = true;
    var palabra = newWord.value;

    for(let i = 0; i < palabra.length; i++){

        for(let j = 0; j < numeros.length; j++){
            if(palabra[i].includes(numeros[j])){
                textoConNumeros.classList.remove("invisible");
                errores = false;
                break;
            }
            else{
                textoConNumeros.classList.add("invisible");
            }
        }
    }

    for(let i = 0; i < palabra.length;i++){

        for(let j = 0; j < noAcentos.length;j++){
            if(palabra[i].includes(noAcentos[j])){
                acentos.classList.remove("invisible");
                errores = false;
                break;
            }
        }
    }

    if(palabra.length > 8){
        masOcho.classList.remove("invisible");
        errores = false;
    }
    else{
        masOcho.classList.add("invisible");
    }

    if(palabra.length <= 0){
        menosUno.classList.remove("invisible");
        masOcho.classList.add("invisible");
        textoConNumeros.classList.add("invisible");
        errores = false;
    }
    else{
        menosUno.classList.add("invisible");
    }

    if(errores){
        guardarLocalStg(palabra.toUpperCase());
        window.location.href = "./start.html";
    }    
})

function guardarLocalStg(contenido){
    sessionStorage.setItem("palabra",contenido);
}
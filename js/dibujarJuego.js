//funcion para pedir la palabra ingresada
function llamarDatosStg() {
    var palabraNueva = sessionStorage.getItem("palabra");
    return palabraNueva;
}

//Secciones de dibujar horca
function dibujarSuelo(pincel) {

    pincel.lineWidth = 10;
    pincel.beginPath();
    pincel.moveTo(5, 490);
    pincel.lineTo(445, 490);
    pincel.stroke();
}

function dibujarHorca(pincel) {

    pincel.beginPath();
    pincel.moveTo(100, 10);
    pincel.lineTo(100, 490);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(100, 15);
    pincel.lineTo(350, 15);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(345, 15);
    pincel.lineTo(345, 100);
    pincel.stroke();
}

function dibujarCabeza(pincel) {
    pincel.beginPath();
    pincel.arc(345, 145, 45, 0, 2 * Math.PI);
    pincel.stroke();
}

function dibujarTronco(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(345, 350);
    pincel.stroke();
}

function dibujarBrzIzq(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(295, 280);
    pincel.stroke();
}

function dibujarBrzDer(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(395, 280);
    pincel.stroke();
}

function dibujarPrnIzq(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 338);
    pincel.lineTo(305, 450);
    pincel.stroke();
}

function dibujarPrnDer(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 338);
    pincel.lineTo(385, 450);
    pincel.stroke();
}

function dibujarLineas(palabraSecreta) {

    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "#0A3871";

    var sizeLine = 800 / palabraSecreta.length;

    for (let i = 0; i < palabraSecreta.length; i++) {
        lineas.beginPath()
        lineas.moveTo(230 + (sizeLine * i), 130);
        lineas.lineTo(285 + (sizeLine * i), 130);
        lineas.stroke();
        lineas.closePath();
    }
}

function dibujarLetrasCorrectas(palabraSecreta, ubicacion) {

    lineas.font = "bold 52px Montserrat";
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "#0A3871";
    lineas.fillStyle = "#0A3871";

    var sizeLine = 800 / palabraSecreta.length;
    lineas.fillText(palabraSecreta[ubicacion], 235 + (sizeLine * ubicacion), 100);
}

function dibujarLetrasIncorrectas(letra, contadorErrores) {

    lineas.font = "bold 40px Montserrat";
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "#0A3871";
    lineas.fillStyle = "#0A3871";

    lineas.fillText(letra, 250 + (40 * (10 - contadorErrores)), 200, 40);
}

function verificarTecla(teclaPress) {
    if (letras.length < 1 || letras.indexOf(teclaPress) < 0) {
        letras.push(teclaPress)
        return false;
    }
    else {
        letras.push(teclaPress)
        return true;
    }
}

//Funcion de dibujar Horca
function horca(contadorErrores, palabraSecreta) {

    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 10;
    //Dibujamos el ahorcado
    //450 x 500 pixeles

    if (contadorErrores == 1) {
        //Dibujar horca
        dibujarSuelo(pincel);
    }

    if (contadorErrores == 2) {
        //Dibujar horca
        dibujarHorca(pincel);
    }

    if (contadorErrores == 3) {
        //Dibujar cabeza
        dibujarCabeza(pincel);
    }

    if (contadorErrores == 4) {
        //Dibujar tronco
        dibujarTronco(pincel);
    }

    if (contadorErrores == 5) {
        //Dibujar brazo izquierdo
        dibujarBrzIzq(pincel);
    }

    if (contadorErrores == 6) {
        //Dibujar brazo derecho
        dibujarBrzDer(pincel);
    }

    if (contadorErrores == 7) {
        //Dibujar pierna izquierda
        dibujarPrnIzq(pincel);
    }

    if (contadorErrores == 8) {
        //Dibujar pierna derecha
        dibujarPrnDer(pincel);
        swal({
            title: "Perdiste",
            text: "La palabra correcta es " + palabraSecreta,
            icon: 'error',
            button: "Nuevo Juego",
        }).then(respuesta => {
            if (respuesta == true) {
                window.location.href = "./start.html";
            }
            else {
                window.location.href = "./index.html";
            }
        })
    }
}

//Logica de la horca
function logicaHorca(palabraSecreta) {
    dibujarLineas(palabraSecreta);
    var contenedorLetras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    document.addEventListener("keydown", function (letraIngresada) {
        var letra = letraIngresada.key.toUpperCase();

        for(var k = 0; k < contenedorLetras.length;k++){
            if(contenedorLetras[k]==letra){
                //Detectar letras repetidas o presionadas
                if (!verificarTecla(letraIngresada.key)) {
    
                    //Detectar Si se acierta la letra
                    if(palabraSecreta.includes(letra)){
    
                        //Si se acierta la letra se dibuja en el canvas
                        for(var i = 0; i < palabraSecreta.length; i++){
                            if(palabraSecreta[i] == letra){
                                dibujarLetrasCorrectas(palabraSecreta, i);
                                contadorAciertos++;
                            }
                        }
    
                        if(contadorAciertos == palabraSecreta.length){
                            swal({
                                title: "Ganaste",
                                text: "La palabra correcta es " + palabraSecreta,
                                icon: 'success',
                                button: "Nuevo Juego",
                            }).then(respuesta => {
                                if (respuesta == true) {
                                    window.location.href = "./start.html";
                                }
                                else {
                                    window.location.href = "./index.html";
                                }
                            })
                        }
                    }
                    else{
                        contadorErrores++;
                        dibujarLetrasIncorrectas(letra, contadorErrores);
                        horca(contadorErrores, palabraSecreta);
                    }
                }
            }
        }      
    })
}
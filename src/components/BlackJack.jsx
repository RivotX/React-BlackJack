import Card from "./Card";
import cards from "./CardImages";
import { useState, useEffect } from "react";

function BlackJack({ onPerdidoChange, onGanadoChange, onEmpateChange }) {
    const [cartas, setCartas] = useState([]);
    const [cartasEnemigo, setcartasEnemigo] = useState([]);
    const [contador, setcontador] = useState(0);
    const [contadorEnemigo, setcontadorEnemigo] = useState(0);
    const [isPlantado, setisPlantado] = useState(false);
    const [juegoFinalizado, setJuegoFinalizado] = useState(false);
    const [randomNumber3, setRandomNumber3] = useState(0);

    let ganado = false;
    let perdido = false;
    let empate = false;

    const generarCartas = () => {
        const randomNumber1 = Math.floor(Math.random() * 48);
        const randomNumberE = Math.floor(Math.random() * 48);
        const randomNumber3 = Math.floor(Math.random() * 48);
        setCartas([{ img: cards[randomNumber1].img, value: cards[randomNumber1].valuee }]);
        setcartasEnemigo([{ img: cards[randomNumberE].img, value: cards[randomNumberE].valuee }, { img: cards[48].img, value: cards[randomNumber3].valuee }]);
        setcontador(cards[randomNumber1].valuee[0]);
        setcontadorEnemigo(cards[randomNumberE].valuee[0]);
        setRandomNumber3(randomNumber3);
    };

    useEffect(() => {
        generarCartas();
    }, []);

    const handlePedir = () => {
        const randomNumber = Math.floor(Math.random() * 48);
        setCartas([...cartas, { img: cards[randomNumber].img, value: cards[randomNumber].valuee }]);
    };

    const handlePlantarse = () => {
        if (!isPlantado) {
            let nuevoContadorEnemigo = 0;
            let asesEnemigo = 0;
    
            // Calcular el contador del crupier
            cartasEnemigo.forEach((carta) => {
                let valorCarta = carta.value[0];
                if (carta.value.length > 1) {
                    asesEnemigo++;
                    if (nuevoContadorEnemigo + 11 <= 21) {
                        valorCarta = carta.value[1]; 
                    }
                }
                nuevoContadorEnemigo += valorCarta;
            });
    
            setisPlantado(true);
            const nuevasCartasEnemigo = [...cartasEnemigo];
            nuevasCartasEnemigo[1] = { ...nuevasCartasEnemigo[1], img: cards[randomNumber3].img }; 
            setcartasEnemigo(nuevasCartasEnemigo); 
    
            // Pedir cartas adicionales si el contador del crupier es menor que 17
            if (nuevoContadorEnemigo < 17) {
                while (nuevoContadorEnemigo < 17) {
                    const newRandomNumber = Math.floor(Math.random() * 48);
                    const nuevaCarta = { img: cards[newRandomNumber].img, value: cards[newRandomNumber].valuee };
                    nuevasCartasEnemigo.push(nuevaCarta);
                    nuevoContadorEnemigo = nuevasCartasEnemigo.reduce((total, carta) => total + parseInt(carta.value), 0);

                    for (let i = 0; i < asesEnemigo; i++) {
                        if (nuevoContadorEnemigo + 10 <= 21) {
                            nuevoContadorEnemigo += 10;
                        }
                    }
                }
                setcartasEnemigo([...nuevasCartasEnemigo]);
            }
            // Marcar el juego como finalizado cuando el jugador se planta
            setJuegoFinalizado(true);
        }
    }
    

    //contador jugador
    useEffect(() => {
        let suma = 0;
        let tieneAs = false;

        cartas.forEach((carta) => {
            const valorCarta = carta.value.length > 1 ? carta.value[1] : carta.value[0];
            suma += valorCarta;

            if (carta.value.length > 1 && valorCarta === 11) {
                tieneAs = true;
            }
        });

        if (suma > 21 && tieneAs) {
            suma -= 10;
        }

        setcontador(suma);

        if (suma > 21) {
            setJuegoFinalizado(true);
            // setPerdido(true);
            perdido = true;
            onPerdidoChange(true)
        }
    }, [cartas]);

    //contador groupier
    useEffect(() => {
        let suma = 0;
        let tieneAs_e = false;

        cartasEnemigo.forEach((carta) => {
            const valorCarta = carta.value.length > 1 ? carta.value[1] : carta.value[0];
            suma += valorCarta;

            if (carta.value.length > 1 && valorCarta === 11) {
                tieneAs_e = true;
            }
        });

        if (suma > 21 && tieneAs_e) {
            suma -= 10;
        }
        if (suma > 21) {
            setJuegoFinalizado(true);
            // setGanado(true);
            ganado = true;
            onGanadoChange(true)
        }
        setcontadorEnemigo(suma);
    }, [cartasEnemigo]);

    //verificar ganador 
    useEffect(() => {
        let nuevoContador = 0;
        let nuevoContadorEnemigo = 0;
        let asesJugador = 0;
        let asesEnemigo = 0;

        // Calcular el contador del jugador
        cartas.forEach((carta) => {
            let valorCarta = carta.value[0];
            if (carta.value.length > 1) {
                asesJugador++;
            } else {
                nuevoContador += Number(valorCarta);
            }
        });

        // Manejar el valor de los ases del jugador
        for (let i = 0; i < asesJugador; i++) {
            if (nuevoContador + 11 <= 21) {
                nuevoContador += 11;
            } else {
                nuevoContador += 1;
            }
        }

        // Calcular el contador del crupier
        cartasEnemigo.forEach((carta) => {
            let valorCarta = carta.value[0];
            if (carta.value.length > 1) {
                asesEnemigo++;
            } else {
                nuevoContadorEnemigo += Number(valorCarta);
            }
        });

        // Manejar el valor de los ases del crupier
        for (let i = 0; i < asesEnemigo; i++) {
            if (nuevoContadorEnemigo + 11 <= 21) {
                nuevoContadorEnemigo += 11;
            } else {
                nuevoContadorEnemigo += 1;
            }
        }

        console.log("nuevoContadorEnemigo", nuevoContadorEnemigo);
        console.log("nuevoContador", nuevoContador);

        // Función para actualizar los estados
        const actualizarEstados = () => {
            if (nuevoContador > 21) {
                empate = false;
                ganado = false;
                perdido = true;
                console.log("Perdido: jugador pasó de 21");
            } else if (nuevoContadorEnemigo > 21) {
                empate = false;
                perdido = false;
                ganado = true;
                console.log("Ganado: crupier pasó de 21", "ganado", ganado, "perdido", perdido);
            } else if (nuevoContador < nuevoContadorEnemigo) {
                empate = false;
                ganado = false;
                perdido = true;
                console.log("Perdido: contador jugador menor que contador crupier", "ganado", ganado, "perdido", perdido);
            } else if (nuevoContador > nuevoContadorEnemigo) {
                empate = false;
                perdido = false;
                ganado = true;
                console.log("Ganado: contador jugador mayor que contador crupier");
            } else if (nuevoContador === nuevoContadorEnemigo) {
                perdido = false;
                ganado = false;
                empate = true;
                console.log("Empate: contadores iguales", "ganado", ganado, "perdido", perdido);
            }
        };

        actualizarEstados();
    }, [cartas, cartasEnemigo]); // Dependencias del useEffect

    useEffect(() => {
        if (juegoFinalizado) {
            if (perdido) {
                onPerdidoChange(true);
            } else if (ganado) {
                onGanadoChange(true);
            } else if (empate) {
                onEmpateChange(true);
            }
        }
    }, [juegoFinalizado, ganado, empate, perdido, onPerdidoChange, onGanadoChange, onEmpateChange]);


    return (
        <>
            <div className="flex justify-center w-full gap-2">
                {cartasEnemigo.map((carta, index) => (
                    <div key={index} className={index > 1 ? 'fade-in' : ''} >
                        <Card img={carta.img} value={carta.value} />
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap w-1/5 gap-10 py-2">
                <p className="flex items-center justify-center w-full h-10 text-black bg-blue-600 rounded-md">
                    <span>{isPlantado && (contadorEnemigo)}</span>
                </p>
                <p className="flex items-center justify-center w-full h-10 text-black bg-red-400 rounded-md">
                    <span>{contador}</span>
                </p>
            </div>
            <div className="flex justify-center w-full gap-2">
                {cartas.map((carta, index) => (
                    <div key={index} className={index != 0 ? 'fade-in' : ''} >
                        <Card img={carta.img} value={carta.value} />
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between w-full mt-4 rounded-md">
                <button className="w-2/5 p-2 bg-gray-200 rounded-lg" onClick={handlePedir}>
                    Pedir carta
                </button>
                <button className="w-2/5 p-2 bg-gray-200 rounded-lg" onClick={handlePlantarse}>Plantarse</button>
            </div>
        </>
    );
}

export default BlackJack;

import bg from './img/bg.png';
import BlackJack from './components/BlackJack';
import { useState } from 'react';
import ModalResultado from "./components/ModalResultado";
import XD from './img/XD.png'
import clown from './img/clown.png'
import gigachad from './img/gigachad.png'
import gigachad2 from './img/gigachad2.png'
import pokerface from './img/._..png'
import casino25 from './img/casino25.png'
import casino50 from './img/casino50.png'
import casino100 from './img/casino100.png'
import casino500 from './img/casino500.png'
import pobre from './img/pobre.png'
import pobre2 from './img/pobre2.png'


export default function App() {
  const [perdido, setPerdido] = useState(false);
  const [ganado, setGanado] = useState(false);
  const [empate, setEmpate] = useState(false);
  const [BlackJackVisible, setBlackJackVisible] = useState(false);
  const [botonVisible, setbotonVisible] = useState(true);
  const [Dinero, setDinero] = useState(500);
  const [Apuesta, setApuesta] = useState(0);
  const [resetKey, setResetKey] = useState(0); // State para forzar la remontada del componente BlackJack
  const [visibleApuestas, setVisibleApuestas] = useState(true);
  const [error, setError] = useState(false);

  const handlePerdidoChange = (nuevoEstado) => {
    setTimeout(() => {
      setPerdido(nuevoEstado);
    }, 500);
  };

  const handleGanadoChange = (nuevoEstado) => {
    setTimeout(() => {
      setGanado(nuevoEstado);
    }, 500);
  };

  const handleEmpateChange = (nuevoEstado) => {
    setTimeout(() => {
      setEmpate(nuevoEstado);
    }, 500);
  };

  const HandleBoton = () => {
    if (Apuesta === 0) {
      setError(true)

    } else {
      setBlackJackVisible(true);
      setbotonVisible(false);
      setVisibleApuestas(false)
      setError(false)

    }

  }

  const clickmodal = () => {
    setBlackJackVisible(false);
    setbotonVisible(true);
    setVisibleApuestas(true);
    if (ganado) setDinero(Dinero + Apuesta * 2)
    if (empate) setDinero(Dinero + Apuesta)

    setEmpate(false)
    setPerdido(false)
    setGanado(false)
    setApuesta(0)
    setResetKey(prevKey => prevKey + 1); // Incrementar la clave de reinicio para forzar la remontada del componente BlackJack
  }
  const apostar = (cantidad) => {
    if (Dinero - cantidad >= 0) {
      setApuesta(Apuesta + cantidad);
      setDinero(Dinero - cantidad);
    } else {
      setApuesta(Apuesta + Dinero);
      setDinero(0)
    }
  }
  const resetApuesta = () => {
    setDinero(Dinero + Apuesta);
    setApuesta(0);
  }
  const reset = () => {
    window.location.reload();
  }
  return (
    <div className="min-h-screen p-5 bg-gray-800 " style={{ backgroundImage: `url(${bg})` }}>
      <div>
        <h1 className="text-3xl font-bold text-center text-white underline">
          BlackJack
        </h1>
        <br/>
        <div className='sm:flex sm:justify-center'>
          <div className='flex justify-center gap-7 me-5'>
            <p className='flex justify-center mx-auto text-xl text-center text-green-500'>Dinero Actual:<span className='text-xl ms-2'>{Dinero}</span></p>
            <p className='flex justify-center mx-auto text-xl text-center text-yellow-500'>Apuesta:<span className='text-xl ms-2'>{Apuesta}</span></p>
          </div>
          {!BlackJackVisible && (
            <p className='flex justify-center pt-5 text-xl text-center text-white sm:pt-0'>
              <button onClick={() => resetApuesta()} className='bg-amber-600 px-2 py-0.5 rounded-md ms-2'>Reset</button>
            </p>
          )}

        </div>

      </div>


      <div className='flex items-center justify-center pt-20 md:min-h-full md:pt-5 '>
        <div className="w-full h-full border-8 border-solid rounded-lg border-amber-950 sm:w-3/5 md:w-2/5 ">
          <div className="flex flex-wrap justify-center w-full h-full px-5 py-24 bg-gray-600 md:p-5 bg-opacity-80 ">
            {botonVisible && (<div className='flex flex-wrap justify-center w-full'>
              <button onClick={HandleBoton} className='p-2 bg-gray-400 rounded-md'> Empezar partida</button>
              {error &&
                (<p className='w-full font-bold text-center text-red-600'>* Debes hacer una apuesta obligatoriamente</p>)}
            </div>)}
            {BlackJackVisible && (
              <BlackJack
                key={resetKey} // Forzar la remontada del componente al cambiar la clave
                onPerdidoChange={handlePerdidoChange}
                onGanadoChange={handleGanadoChange}
                onEmpateChange={handleEmpateChange}
              />
            )}
            {visibleApuestas && (
              <div className='flex justify-center w-full mt-10'>
                <img src={casino25} onClick={() => apostar(25)} className='w-1/5 cursor-pointer me-2' />
                <img src={casino50} onClick={() => apostar(50)} className='w-1/4 cursor-pointer' />
                <img src={casino100} onClick={() => apostar(100)} className='w-1/4 cursor-pointer' />
                <img src={casino500} onClick={() => apostar(500)} className='w-1/5 cursor-pointer ms-2' />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Renderizar Modal resultado*/}
      {perdido && BlackJackVisible && (
        <ModalResultado texto={"🤣🤡XDD Has perdido (you lost) XDXD🤡🤣"} img={clown} img2={XD} img3={XD} img4={clown} onClick={clickmodal} botonTexto="Jugar de nuevo" />

      )}
      {/* Renderizar Modal has ganado*/}
      {ganado && BlackJackVisible && (
        <ModalResultado texto={"🗿You won, easy game🗿"} img={gigachad} img2={gigachad2} img3={gigachad2} img4={gigachad} onClick={clickmodal} botonTexto="Jugar de nuevo" />
      )}
      {/* Renderizar Modal has ganado*/}
      {empate && BlackJackVisible && (
        <ModalResultado texto={"empate (draw)"} img={pokerface} img2={pokerface} img3={pokerface} img4={pokerface} onClick={clickmodal} botonTexto="Juegar de nuevo" />
      )}
      {/* Renderizar Modal no tienes dinero*/}
      {Dinero == 0 && Apuesta == 0 && (
        <ModalResultado texto={"💰💲Te quedaste sin dinero💲💰"} img={pobre} img2={pobre2} img3={pobre2} img4={pobre} onClick={reset} botonTexto="Intentarlo otra vez" />
      )}

    </div>
  );
}

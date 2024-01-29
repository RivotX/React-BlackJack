const ModalResultado = ({ texto, img, img2, img3, img4, onClick, botonTexto }) => {

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center">
            <div className='border h-4/5 w-3/4 flex items-center flex-wrap justify-center bg-gray-400 rounded-md '>
                <div className='flex justify-between w-4/5'>
                    <img className="w-1/4 h-1/4" src={img} />
                    <img className="w-1/4 h-1/4" src={img2} />
                </div>

                <h1 className='text-white text-3xl font-bold w-full text-center'>{texto}</h1>
                <button className='bg-yellow-400 p-3 rounded-md my-2' onClick={onClick}>{botonTexto}</button>
                <h1 className='text-white text-3xl font-bold w-full text-center'>{texto}</h1>

                <div className='flex justify-between w-4/5'>
                    <img className="w-1/4 h-1/4" src={img3} />
                    <img className="w-1/4 h-1/4" src={img4} />
                </div>
            </div>


        </div>
    )
}
export default ModalResultado
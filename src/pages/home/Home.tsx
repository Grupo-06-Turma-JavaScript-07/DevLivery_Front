function Home() {


  return (
<>
 <div className="bg-[#f0eff2] flex justify-center">
     <div className="flex justify-center ">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem Página Home"
              className='w-2/3'
            />    
          </div>

        <div className='container grid grid-cols-2 text-white'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold'>
              Mudar texto
            </h2>
            <p className='text-xl'>
              alterar
            </p>

            <div className="flex justify-around gap-4">
              <div className="flex justify-around gap-4">
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Ondinha da home */}
      <svg
          className="w-full h-12 text-[#f0eff2] transform"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,64L48,69.3C96,75,192,85,288,96C384,107,480,117,576,106.7C672,96,768,64,864,48C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>

      {/* ListaPostagens */}

     


</>

  )
}

export default Home
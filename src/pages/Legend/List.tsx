import { Input } from "@/components/ui/input"

const List = () => {
  return (
    <div className="h-full min-h-screen bg-slate-900 relative text-white">
      <div
        className="fixed top-0 left-0 h-screen w-full opacity-25"
        style={{ backgroundImage: 'url("/bg_login.jpg")' }}
      />
      <div className="relative bg-slate-900 w-full p-5 text-white flex justify-center">
        <header className="flex w-full max-w-3xl justify-between">
          <div className="flex gap-5 items-center">
            <a href="#">Início</a>
            <a href="#">Criar uma história</a>
            <a href="#">Coleção</a>
            <a href="#">Ajuda</a>
          </div>
          <Input placeholder="Procurar uma lenda" className="w-fit" />
        </header>
      </div>
      <main className="relative h-full w-full p-10 flex flex-col gap-10 justify-center items-center">
        <img src={"/logo.png"} className="h-fit w-fit" />

        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Bem vindo ao Lendas da Amazônia!
          </h1>
          <h2 className="text-xl font-semibold mt-1">
            Conheça e compartilhe suas lendas!
          </h2>
        </div>
      </main>
      <div className="relative bg-slate-900 w-full h-full px-5 py-10 text-white flex flex-col gap-7 items-center justify-center">
        <section className="w-full max-w-3xl">
          <div className="flex justify-between">

          <h1 className="text-lg font-bold">Últimas publicações</h1>
          <a href="#" className="text-blue-400">Ver mais</a>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full mt-5">
            {[...new Array(3)].map(() => (
              <div>
                <div className="aspect-video col-span-1 bg-slate-700 rounded"></div>
                <p className="font-bold">Mula sem cabeça</p>
                <p className="mt-3 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full max-w-3xl">
      <div className="flex justify-between">

          <h1 className="text-lg font-bold">Continuações</h1>
          <a href="#" className="text-blue-400">Ver mais</a>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full mt-5">
            {[...new Array(3)].map(() => (
              <div>
                <div className="aspect-video col-span-1 bg-slate-700 rounded"></div>
                <p className="font-bold">Mula sem cabeça</p>
                <p className="mt-3 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full max-w-3xl">
      <div className="flex justify-between">

          <h1 className="text-lg font-bold">Mais lidas</h1>
          <a href="#" className="text-blue-400">Ver mais</a>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full mt-5">
            {[...new Array(3)].map(() => (
              <div>
                <div className="aspect-video col-span-1 bg-slate-700 rounded"></div>
                <p className="font-bold">Mula sem cabeça</p>
                <p className="mt-3 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="relative bg-slate-700 w-full p-5 text-white flex justify-center">
        <header className="flex w-full max-w-3xl justify-between">
          <div className="flex gap-5 items-center">
            <a href="#">Início</a>
            <a href="#">Criar uma história</a>
            <a href="#">Coleção</a>
            <a href="#">Ajuda</a>
          </div>
          <p>Todos os direitos reservados</p>
        </header>
      </div>
    </div>
  )
}

export default List

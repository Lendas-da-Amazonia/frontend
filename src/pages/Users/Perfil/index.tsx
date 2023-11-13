import { PerfilPage } from "./PerfilPage"
import { PerfilPageProvider } from "./controller"

const Perfil = () => {
  return (
    <PerfilPageProvider>
      <PerfilPage />
    </PerfilPageProvider>
  )
}

export default Perfil

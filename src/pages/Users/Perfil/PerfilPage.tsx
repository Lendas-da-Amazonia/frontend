import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { getInitialsFromName } from "@/lib/getInitialsFromName"

import { Loading } from "@/layouts/Loading"

import { useController } from "./controller"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyPostsTabs } from "./MyPostsTabs"
import { LikedPostsTab } from "./LikedPostsTab"
// import { useUsers } from "@/app/ContextUsers"
export const PerfilPage = () => {
  const { perfil } = useController()

  if (!perfil) return <Loading />

  return (
    <div className="h-full w-full flex justify-center px-5 bg-slate-950 text-white py-10">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-7">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/" />
            <AvatarFallback className="text-black text-4xl font-bold text-center">
              {getInitialsFromName(perfil.user.username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">{perfil.user.username}</p>
            <p className="text-lg">
              <b>{perfil.totalMyths}</b> publicações
            </p>
          </div>
        </div>

        <Tabs defaultValue="my_posts" className="w-full mt-10">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="my_posts">
              Publicações
            </TabsTrigger>
            <TabsTrigger className="w-full" value="liked">
              Curtidas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my_posts">
            <MyPostsTabs />
          </TabsContent>
          <TabsContent value="liked">
            <LikedPostsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

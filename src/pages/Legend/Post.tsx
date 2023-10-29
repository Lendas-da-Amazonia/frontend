import { useMyth } from "@/app/ContextMyths"
import { convertStringToHTML } from "@/lib/convertStringToHtml"
import { MythModel } from "@/model/Myth.model"
import { api } from "@/services/api"

import { format, formatDistance, formatDistanceStrict, isBefore } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { PostSkeleton } from "./PostSkeleton"
import { Button } from "@/components/Button"
import { Button as ButtonUi } from "@/components/ui/button"
import { useUsers } from "@/app/ContextUsers"
import { UserModel } from "@/model/User.model"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitialsFromName } from "@/lib/getInitialsFromName"
import { Loader2, MoreHorizontal } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { getFuso } from "@/lib/utils"
import { toast } from "react-toastify"
import { useAuth } from "@/app/ContextAuth"
// import { ArrowLeft } from "lucide-react";

const Post = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [commentText, setCommentText] = useState("")
  const [publishingComment, setPublishingComment] = useState(false)

  const { status } = useAuth()

  const { authors, setAuthors } = useUsers()
  const {
    readMyths,
    setReadMyths,
    loading,
    setLoading,
    loadingComments,
    setLoadingComments,
    comments,
    setComments,
  } = useMyth()

  console.log("authors ", authors)

  const myth = readMyths?.[id as string] || {}
  const author = authors?.[myth?.id_autor as string] || {}
  const comment = comments?.[id as string] || []

  useEffect(() => {
    if (id) {
      if (readMyths?.[id]?._id) return setLoading(false)

      const load = async () => {
        try {
          const resp = await api().get(`myth/${id}`)

          const mythAux = MythModel(resp.data)

          setReadMyths((prev) => ({
            ...prev,
            [id]: mythAux,
          }))

          const authorResp = await api().get(`user/${mythAux.id_autor}`)

          setAuthors((prev) => ({
            ...prev,
            [mythAux.id_autor]: UserModel(authorResp.data?.buscado),
          }))
        } catch (e) {
          console.error(e)
        }

        setLoading(false)
      }
      load()
    }

    return () => {
      setLoading(true)
    }
  }, [id, setLoading, setAuthors, setReadMyths])

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsAux = await api().get(`/comment/myth/${id}`)

        console.log("commentsAux ", commentsAux)

        for (const comm of commentsAux.data) {
          console.log("comm ", comm)

          if (!authors[comm?.id_user]?._id) {
            const authorResp = await api().get(`user/${comm?.id_user}`)

            setAuthors((prev) => ({
              ...prev,
              [comm.id_user]: UserModel(authorResp.data?.buscado),
            }))
          }
        }

        if (id) {
          setComments((prev) => ({
            ...prev,
            [id]: commentsAux.data,
          }))
        }
      } catch (e) {
        console.error(e)
      }

      setLoadingComments(false)
    }

    if (id || publishingComment === false) loadComments()
  }, [id, setComments, setLoadingComments, publishingComment, setAuthors])

  const toPublishComment = async () => {
    if (commentText.trim().length === 0) return

    setPublishingComment(true)

    try {
      await api().post(`/comment/${id}/create`, {
        mythId: id,
        text: commentText,
      })
      toast.success("Comentário publicado!")
    } catch (e) {
      console.error(e)
      toast.error("Erro ao publicar comentário")
    }

    setPublishingComment(false)
  }

  return (
    <div className="relative min-h-screen h-full bg-black flex lg:flex-row flex-col lg:justify-center">
      <div className="fixed w-full h-screen bg-[url('/bg_login.jpg')] opacity-20" />
      <div className="relative z-10 w-full max-w-2xl bg-slate-950/70 text-neutral-300 px-5 pt-10 pb-20">
        {/* <ArrowLeft className="h-4 w-4" /> */}
        <div className="w-fit">
          <ButtonUi variant="link" onClick={() => navigate(-1)}>
            Voltar
          </ButtonUi>
        </div>

        {loading ? (
          <PostSkeleton />
        ) : (
          <>
            <div className="flex items-center gap-5 mt-10">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/" />
                <AvatarFallback className="text-black text-3xl font-bold text-center">
                  {getInitialsFromName(author?.username)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold">{author?.username}</h1>
                <p className="text-neutral-400">{author?.email}</p>
                <p className="text-neutral-400">
                  {myth?.created_at &&
                    format(
                      new Date(myth?.created_at),
                      "dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-bold overflow-auto mt-5">
              {myth?.titulo}
            </h1>

            <div className="mt-7">{convertStringToHTML(myth?.texto)}</div>
          </>
        )}
      </div>
      <div
        id={"comments-post-" + id}
        className="relative z-10 w-full h-screen max-w-md bg-slate-950/70 text-neutral-300 py-10"
      >
        <section
          id="comments-from-post"
          className="flex flex-col gap-5 flex-1 h-full"
        >
          <div className="flex items-center justify-between px-2">
            {loading ? (
              <></>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/" />
                  <AvatarFallback className="text-black text-xs font-bold text-center">
                    {getInitialsFromName(author?.username)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">{author.username}</p>
              </div>
            )}
            <ButtonUi variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </ButtonUi>
          </div>
          <Separator orientation="horizontal" />
          {loadingComments ? (
            <PostSkeleton />
          ) : (
            <div
              id="comments-list"
              className="flex-1 overflow-auto flex flex-col gap-5 px-2"
            >
              {comment
                .sort((a, b) =>
                  isBefore(new Date(a.created_at), new Date(b.created_at))
                    ? 1
                    : -1
                )
                .map((comm) => (
                  <div
                    key={comm._id}
                    className="flex items-start justify-between gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/" />
                        <AvatarFallback className="text-black text-xs font-bold text-center">
                          {getInitialsFromName(
                            authors[comm?.id_user]?.username
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <b>{authors[comm.id_user]?.username}</b> {comm.text}
                        </p>
                        {comm.created_at && (
                          <p className="text-xs text-white/50">
                            {formatDistanceStrict(
                              getFuso(comm.created_at),
                              new Date(),
                              {
                                locale: ptBR,
                                addSuffix: true,
                              }
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* <ButtonUi
                    className="flex-shrink-0"
                    variant="ghost"
                    size="icon"
                  >
                    <Heart className="h-4 w-4" />
                  </ButtonUi> */}
                  </div>
                ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-2 px-2">
            {status === "not_authenticated" ? (
              <p className="text-sm w-full border border-white/30 p-2 rounded-lg">
                Faça login para comentar
              </p>
            ) : (
              <Input
                placeholder={"Adicione um comentário..."}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            )}
            <div>
              {status === "not_authenticated" ? (
                <Link to="/login">
                  <ButtonUi variant="ghost">Entrar</ButtonUi>
                </Link>
              ) : (
                <ButtonUi
                  disabled={
                    publishingComment ||
                    loadingComments ||
                    commentText.trim().length === 0
                  }
                  variant="ghost"
                  onClick={toPublishComment}
                >
                  {publishingComment && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {publishingComment ? "Publicando" : "Publicar"}
                </ButtonUi>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Post

import { useMyth } from "@/app/ContextMyths"
import { convertStringToHTML } from "@/lib/convertStringToHtml"
import { MythModel } from "@/model/Myth.model"
import { api } from "@/services/api"

import { format, formatDistanceStrict, isBefore } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { PostSkeleton } from "./PostSkeleton"
import { Button as ButtonUi } from "@/components/ui/button"
import { useUsers } from "@/app/ContextUsers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitialsFromName } from "@/lib/getInitialsFromName"
import { Loader2, MessageCircle, MoreHorizontal } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { getFuso } from "@/lib/utils"
import { toast } from "react-toastify"
import { useAuth } from "@/app/ContextAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fnMyth } from "@/services/myth"
import { fnComment } from "@/services/comment"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { TypeComment } from "@/types/comment.type"
// import { ArrowLeft } from "lucide-react";

const Post = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [commentText, setCommentText] = useState("")
  const [publishingComment, setPublishingComment] = useState(false)
  const [reloadComments, setReloadComments] = useState(false)

  const { status, user } = useAuth()

  const [openModalEditComment, setOpenModalEditComment] = useState("")

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
    setReload,
  } = useMyth()

  const myth = readMyths?.[id as string] || {}
  const comment = comments?.[id as string] || []

  const [commentEdit, setCommentEdit] = useState({} as TypeComment)

  useEffect(() => {
    if (openModalEditComment) {
      const commentEditAux = comment?.find(
        (comm) => comm._id === openModalEditComment
      )

      if (commentEditAux) {
        setCommentEdit(commentEditAux)
      }
    }
  }, [openModalEditComment])

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
  }, [
    id,
    setComments,
    setLoadingComments,
    reloadComments,
    publishingComment,
    setAuthors,
  ])

  const toPublishComment = async () => {
    if (commentText.trim().length === 0) return

    setPublishingComment(true)

    try {
      await api().post(`/comment/${id}/create`, {
        mythId: id,
        text: commentText,
      })
      toast.success("Comentário publicado!")
      setCommentText("")
    } catch (e) {
      console.error(e)
      toast.error("Erro ao publicar comentário")
    }

    setPublishingComment(false)
  }

  const toEditComment = async (id: string, text: string) => {
    if (text.trim().length === 0) return

    setPublishingComment(true)

    try {
      await api().patch(`/comment/${id}/edit`, {
        text,
      })
      toast.success("Comentário editado!")
      setCommentEdit({} as TypeComment)
      setOpenModalEditComment("")
    } catch (e) {
      console.error(e)
      toast.error("Erro ao editar comentário")
    }

    setPublishingComment(false)
  }


  return (
    <>
      <Dialog
        modal
        open={openModalEditComment !== "" && Boolean(commentEdit?._id)}
        onOpenChange={() => setOpenModalEditComment("")}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar comentário</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col items-end gap-3">
            <Input
              value={commentEdit.text}
              onChange={(e) =>
                setCommentEdit((prev) => ({ ...prev, text: e.target.value }))
              }
              className="bg-white/80 text-black"
            />
            <ButtonUi
              disabled={
                publishingComment
              }
              variant="ghost"
              onClick={() => toEditComment(openModalEditComment, commentEdit.text)}
            >
              {publishingComment && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {publishingComment ? "Salvando" : "Salvar"}
            </ButtonUi>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <div className="relative bg-black flex h-full overflow-hidden lg:flex-row flex-col lg:justify-center">
        <div className="fixed w-full h-full bg-[url('/bg_login.jpg')] opacity-20" />
        <div className="relative z-10 w-full h-full flex-1 lg:max-w-2xl bg-slate-950/90 text-neutral-300 px-5 pt-3 pb-20">
          {/* <ArrowLeft className="h-4 w-4" /> */}
          <div className="w-fit pb-3">
            <ButtonUi variant="link" onClick={() => navigate(-1)}>
              Voltar
            </ButtonUi>
          </div>

          {loading ? (
            <PostSkeleton />
          ) : (
            <div className="h-full overflow-auto pr-2">
              <div className="flex items-center gap-5 mt-10">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/" />
                  <AvatarFallback className="text-black text-3xl font-bold text-center">
                    {getInitialsFromName(myth?.nome_autor)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-bold">{myth?.nome_autor}</h1>
                  <p className="text-neutral-400">{myth?.email_autor}</p>
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
            </div>
          )}
        </div>
        <div
          id={"comments-post-" + id}
          className="relative z-10 w-full h-full lg:max-w-md px-3 bg-slate-950/70 text-neutral-300 py-10"
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
                      {getInitialsFromName(myth?.nome_autor)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{myth.nome_autor}</p>
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ButtonUi variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </ButtonUi>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user._id === myth.id_autor && (
                    <>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/edit_legend/${myth._id}`)
                        }}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async (e) => {
                          e.stopPropagation()
                          await fnMyth.remove({ id: myth._id })
                          setReload((prev) => !prev)
                          navigate(`/perfil/`)
                        }}
                      >
                        Excluir
                      </DropdownMenuItem>{" "}
                    </>
                  )}
                  {user._id !== myth.id_autor && (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          toast.info("Em breve esta ação estará disponível!", {
                            toastId: "soon",
                          })
                        }
                      >
                        Denunciar
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator orientation="horizontal" />
            {!loadingComments && comment?.length === 0 && (
              <div className="flex flex-col gap-3 mt-5">
                <MessageCircle className="h-7 w-7 mx-auto" />
                <p className="font-medium text-sm text-center">
                  Ainda não foram registrados quaisquer comentários.
                </p>
              </div>
            )}
            {loadingComments ? (
              <PostSkeleton />
            ) : (
              <div
                id="comments-list"
                className="flex-1 overflow-auto flex flex-col"
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
                      className="flex items-start justify-between gap-2 group hover:bg-white/10 py-3 pl-2 pr-1"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://github.com/" />
                          <AvatarFallback className="text-black text-xs font-bold text-center">
                            {getInitialsFromName(
                              comm.nome_user
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <b>{comm.nome_user}</b> {comm.text}
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
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <ButtonUi
                            className="invisible group-hover:visible flex-shrink-0"
                            variant="ghost"
                            size="icon"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </ButtonUi>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {status === "authenticated" &&
                            user._id === comm.id_user && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setOpenModalEditComment(comm._id)
                                  }
                                >
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={async () => {
                                    await fnComment.remove({ id: comm._id })
                                    setReloadComments((prev) => !prev)
                                  }}
                                >
                                  Excluir
                                </DropdownMenuItem>
                              </>
                            )}

                          {status === "authenticated" &&
                            user._id !== comm.id_user && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    toast.info(
                                      "Em breve esta ação estará disponível!",
                                      { toastId: "soon" }
                                    )
                                  }
                                >
                                  Denunciar
                                </DropdownMenuItem>
                              </>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
    </>
  )
}

export default Post

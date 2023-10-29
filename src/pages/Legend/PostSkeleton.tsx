import { Skeleton } from "@/components/ui/skeleton"

export const PostSkeleton = () => {
  return (
    <div className="opacity-30">
      <div className="flex items-center gap-5 mt-10">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[20px] w-[220px]" />
          <Skeleton className="h-[20px] w-[150px]" />
          <Skeleton className="h-[20px] w-[50px]" />
        </div>
      </div>

      <Skeleton className="h-[24px] mt-5 w-[200px]" />

      <div className="mt-7 flex flex-col gap-2">
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-3/4" />
        <Skeleton className="h-[16px] w-full" />
      </div>

      <div className="mt-7 flex flex-col gap-2">
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-3/4" />
        <Skeleton className="h-[16px] w-full" />
      </div>

      <div className="mt-7 flex flex-col gap-2">
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-3/4" />
        <Skeleton className="h-[16px] w-full" />
      </div>
    </div>
  )
}

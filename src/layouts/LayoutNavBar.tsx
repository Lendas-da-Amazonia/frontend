import { NavBar } from "@/components/NavBar"

export const LayoutNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="h-[calc(100%-64px)] mt-16 overflow-auto">{children}</div>
    </div>
  )
}

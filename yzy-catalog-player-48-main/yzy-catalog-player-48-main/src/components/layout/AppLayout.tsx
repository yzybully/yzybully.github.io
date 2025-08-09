import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { GlobalPlayer } from "./GlobalPlayer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-border/50 px-6">
            <SidebarTrigger className="hover-glow" />
          </header>
          
          <main className="flex-1 p-6 animate-fade-in">
            {children}
          </main>
          
          <GlobalPlayer />
        </div>
      </div>
    </SidebarProvider>
  );
}
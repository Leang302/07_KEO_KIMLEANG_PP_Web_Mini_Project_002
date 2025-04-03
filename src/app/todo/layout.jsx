import SidebarComponent from "@/components/SidebarComponent";
import TaskPopupComponent from "@/components/TaskPopupComponent";
import TopNarbarComponent from "@/components/TopNarbarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";

function Layout({ children }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <SidebarComponent />
      <main className="w-full ">
        {/*<SidebarTrigger/>*/}
        <TopNarbarComponent />
        {children}
      </main>
      <div className="fixed bottom-4 right-4 z-50">
        <TaskPopupComponent />
      </div>
    </SidebarProvider>
  );
}

export default Layout;

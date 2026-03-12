import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Amazonas from "./pages/Amazonas";
import Llanos from "./pages/Llanos";
import Activities from "./pages/Activities";
import ExtremeNext from "./pages/ExtremeNext";
import Auth from "./pages/Auth";
import Crew from "./pages/Crew";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/amazonas" element={<Amazonas />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/extreme-next" element={<ExtremeNext />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

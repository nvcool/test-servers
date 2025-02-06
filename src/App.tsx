import { Route, Routes } from "react-router";
import { AppLayout } from "./layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { CreateSeminarPage } from "./pages/CreateSeminarPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="create" element={<CreateSeminarPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

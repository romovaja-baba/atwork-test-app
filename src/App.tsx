import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header/Header";
import { MainPage } from "@/pages/MainPage/MainPage";
import { EditPage } from "@/pages/EditPage/EditPage";
import { useMeStore } from "./store/meStore";
import { useEffect } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    const { setMe } = useMeStore();

    useEffect(() => {
        setMe({
            id: 1,
            name: "Иван12345",
            username: "ivan12345",
            email: "ivan@example.com",
            city: "Москва",
            phone: "+7 999 123-45-67",
            companyName: "Тестовая компания",
            status: "active",
            avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=0",
        });
    }, [setMe]);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/edit/:id" element={<EditPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

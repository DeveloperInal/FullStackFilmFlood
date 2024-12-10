import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Audiowide, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonProfile from "@/components/ui/button-profile";
import AuthService from "@/service/AuthService"
import {useUserStore} from "@/stores/userData";
import {NextPage} from "next";

const audiowide = Audiowide({
    weight: '400',
    subsets: ['latin']
});

const inter = Inter({
    weight: "500",
    subsets: ['latin']
});

const Header: NextPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { checkAuth } = useUserStore()
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setIsAuthenticated(true);
            checkAuth()
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleAuthClick = () => {
        router.push('/auth'); // Перенаправление на страницу /auth
    };

    return (
        <header className="flex items-center justify-between w-full bg-black p-4 border-b border-purple-700" style={audiowide.style}>
            <div className="w-full max-w-lg flex justify-center">
                <Input
                    type="search"
                    placeholder="Поиск..."
                    className="w-full bg-white text-black"
                    style={inter.style}
                />
            </div>
            <div className="flex space-x-2 items-center">
                {isAuthenticated ? (
                    <ButtonProfile />
                ) : (
                    <Button onClick={handleAuthClick} variant="outline" className="text-white bg-black hover:text-black hover:bg-white">
                        Войти/Регистрация
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;
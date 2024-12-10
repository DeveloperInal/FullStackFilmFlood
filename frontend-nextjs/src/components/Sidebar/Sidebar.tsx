import Link from 'next/link'
import { Icons } from "@/components/ui/icons";
import {Audiowide, Inter} from "next/font/google";
import Image from "next/image";

const audiowide = Audiowide({
    weight: '400',
    subsets: ['latin']
});

const inter = Inter({
    weight: "500",
    subsets: ['latin']
});

const Sidebar = () => {
    return (
        <aside className="w-64 bg-black border-r border-purple-700 p-4" style={audiowide.style}>
            <div className="flex items-center">
                <a>
                    <Image src='./logo.svg' alt="FilmFlood" width={120} height={120}/>
                </a>
            </div>
            <div className="text-4xl font-bold mb-8 text-white" style={inter.style}>FilmFlood</div>
            <nav className="space-y-4">
                <NavItem icon={Icons.CategoriesFilm} label="Главная" to="/"/>
                <NavItem icon={Icons.Film} label="Фильмы" to="/movies"/>
                <NavItem icon={Icons.Tv} label="Сериалы" to="/series"/>
                <NavItem icon={Icons.Video} label="Аниме" to="/anime"/>
                <NavItem icon={Icons.Sport} label="Спорт" to="/sports"/>
                {/*<NavItem icon={Icons.LogOut} label="Logout" to="/logout" />*/}
            </nav>
        </aside>
    );
}

function NavItem({icon: Icon, label, to}: {
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    label: string;
    to: string
}) {
    return (
        <Link href={to} className="flex items-center space-x-2 text-purple-500 hover:text-purple-300">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </Link>
    );
}

export default Sidebar;
'use client';

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import CustomPlayer from "@/components/FilmPage/CustomPlayer/CustomPlayer";

const FilmPage = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex items-center justify-center h-full relative">
                    <div className="absolute top-[10%] left-[10%]">
                        <CustomPlayer/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmPage;

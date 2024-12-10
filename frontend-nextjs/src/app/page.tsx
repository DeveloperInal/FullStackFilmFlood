'use client'
import './globals.css'
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import {useEffect} from "react";
import { useUserStore } from "@/stores/userData";

const Home = () => {
    const { checkAuth } = useUserStore()

    useEffect(() => {
      checkAuth
    }, [])
  return (
      <div className="flex h-screen">
          <Sidebar/>
          <div className="flex-1 flex flex-col">
              <Header/>
          </div>
      </div>
  )
};

export default Home;

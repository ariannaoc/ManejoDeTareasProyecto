import React from 'react'
import "../index.css"

import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdTaskAlt,
  } from "react-icons/md";
  import { FaSpinner, FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, NavLink, useLocation } from "react-router-dom";
  import { setOpenSidebar } from "../redux/slices/authSlice";
  import clsx from "clsx";
const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Proyectos",
      link: "Tareas",
      icon: <FaTasks />,
    },
    {
      label: "Completados",
      link: "completados/completados",
      icon: <MdTaskAlt />,
    },
    {
      label: "En Progreso",
      link: "en-progreso/en progreso",
      icon: <FaSpinner />,
    },
    {
      label: "Por hacer",
      link: "por-hacer/por hacer",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "Equipos",
      link: "equipos",
      icon: <FaUsers />,
    },
    {
      label: "Eliminados",
      link: "eliminados",
      icon: <FaTrashAlt />,
    },
  ];
const Sidebar = () => {
    
    const {user} = useSelector((state) => state.auth); //contiene al usuario el .auth, cambialo a lo que tengas que cambiar

    const dispatch = useDispatch()
    const location = useLocation()

    const path = location.pathname.split("/")[ 1]

    const sidebarLinks = user?.isAdmin ? linkData : linkData; //cambialo si crees que no es necesario tene un admin, solo esta para que puedan ver los elementos eliminados

    //aqui en la funcion de abajo esta hecha para que si estamos en un tlf, se pueda cerrar el menu desplegable
    const cerrarSidebar = () =>{

        dispatch(setOpenSidebar(false))

    };

    const NavLink = ({ el }) => {
        return (
          <Link
            to={el.link}
            onClick={cerrarSidebar}
            className={clsx(
              "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#9280ee]",
              path === el.link.split("/")[0] ? "bg-[#6756be] text-neutral-100" : ""
            )}
          >
            {el.icon}
            <span className='hover:text-[#d3cbff]'>{el.label}</span>
          </Link>
        );
      };
  return (
    <div className = "w-full h-full flex flex-col gap 6 p-5 custom-sidebar-bg">
    <h1 className = "flex gap-1 items-center">
    {/* <p className = "bg-white p-2 rounded-full"> 
        <MdOutlineAddTask className = 'text-white text=2x1 font-black'/> 
    </p> */}
    <span className='text-2xl font-bold text-black'>
    Gestión de Proyectos
    </span>
    </h1>

    <div className='flex-1 flex flex-col gap-y-5 py-8'>
    {
        sidebarLinks.map((link)=>(
            <NavLink el ={link} key = {link.label}/>
        ))
    }
    
    </div>
    
    </div>
  )
}

export default Sidebar
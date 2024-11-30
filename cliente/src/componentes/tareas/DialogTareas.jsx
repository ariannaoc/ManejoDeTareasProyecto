import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdAdd, MdDelete, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TaskContext } from '../../contexts/TaskContext';
import AgregarProyecto from "./AgregarProyecto";
import AgregarTarea from "./AgregarTareas";

const DialogTareas = ({ task }) => {  
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();
    const { tasks, setTasks, setAction } = useContext(TaskContext); 

    const deleteHandler = async (taskId) => {
        try {
            const response = await fetch(`https://localhost:7009/api/Tareas/delete?IdTarea=${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(taskId, ' Eliminado');

            // Actualizacion del estado global de tareas
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const items = [
        {
            label: "Abrir Proyecto",
            icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => navigate(`/tareas/${task._id}`),
        },
        {
            label: "Editar",
            icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => {
                setOpenEdit(true)
                    setAction("editar")
            }
            ,
        },
        {
            label: "Agregar Tarea",
            icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => setOpen(true),
        },
    ];

    return (
        <>
            <div>
                <Menu as='div' className='relative inline-block text-left'>
                    <MenuButton className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
                        <BsThreeDots />
                    </MenuButton>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <MenuItems className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            <div className='px-1 py-1 space-y-2'>
                                {items.map((el) => (
                                    <MenuItem key={el.label}>
                                        {({ focus }) => (
                                            <button
                                                onClick={el.onClick}
                                                className={`${focus ? "bg-blue-500 text-white" : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {el.icon}
                                                {el.label}
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>

                            {/* ELIMINAR*/}
                            <div className='px-1 py-1'>
                                <MenuItem>
                                    {({ focus }) => (
                                        <button
                                            onClick={() => deleteHandler(task._id)}
                                            className={`${focus ? "bg-blue-500 text-white" : "text-red-500"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <MdDelete
                                                className='mr-2 h-5 w-5 text-red-500'
                                                aria-hidden='true'
                                            />
                                            Eliminar
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>

            <AgregarProyecto
                open={openEdit}
                setOpen={setOpenEdit}
                task={task}
                key={new Date().getTime()}
            />

            <AgregarTarea open={open} setOpen={setOpen} />
        </>
    );
};

export default DialogTareas;

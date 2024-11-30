import clsx from "clsx";
import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { MdDelete, MdEdit, MdOutlineAttachFile } from "react-icons/md";
import { BGS, PRIORITY_STYLES, TASK_TYPE, formatDate } from "../../utilidades";
import UserInfo from "../UserInfo";
import Button from "../button";
import { TaskContext } from '../../contexts/TaskContext';
import AgregarProyecto from '../tareas/AgregarProyecto'

const ICONS = {
    alta: <FcHighPriority />,
    media: <FcMediumPriority />,
    baja: <FcLowPriority />,
};

const Table = ({ task }) => {
    const [openDialog, setOpenDialog] = useState(false);
    //const [selected, setSelected] = useState(null);
    const { tasks, setTasks, apiHost } = useContext(TaskContext);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const editHandler = async (taskId) => {
        setOpenEdit(true);
        console.log("editar " + taskId);

        try {
            const response = await fetch(`${apiHost}/api/Tareas/filter?IdTarea=${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const tareas = await response.json(); 
            console.log('Tareas:', tareas);

            const tarea = Array.isArray(tareas) ? tareas[0] : tareas;
            setSelectedTask(tarea);

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const deleteHandler = async (taskId) => {
        try {
            const response = await fetch(`${apiHost}/api/Tareas/delete?IdTarea=${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(taskId, ' Eliminado');
            // Actualización del estado global de tareas
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const TableHeader = () => (
        <thead className='w-full border-b border-gray-300'>
            <tr className='w-full text-black text-left'>
                <th className='py-2'>Tarea</th>
                <th className='py-2'>Prioridad</th>
                <th className='py-2 line-clamp-1'>Creado</th>
                <th className='py-2'>Recursos</th>
                <th className='py-2'>Equipo</th>
            </tr>
        </thead>
    );

    const TableRow = ({ task }) => {
        if (!task) return null;

        return (
            <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
                <td className='py-2'>
                    <div className='flex items-center gap-2'>
                        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                        <p className='w-full line-clamp-2 text-base text-black'>
                            {task?.title}
                        </p>
                    </div>
                </td>

                <td className='py-2'>
                    <div className={"flex gap-1 items-center"}>
                        <span className={clsx("text-lg", PRIORITY_STYLES[task?.priority])}>
                            {ICONS[task?.priority]}
                        </span>
                        <span className='capitalize line-clamp-1'>
                            {task?.priority} Prioridad
                        </span>
                    </div>
                </td>

                <td className='py-2'>
                    <span className='text-sm text-gray-600'>
                        {task?.date ? formatDate(new Date(task?.date)) : ''}
                    </span>
                </td>

                <td className='py-2'>
                    <div className='flex items-center gap-3'>
                        <div className='flex gap-1 items-center text-sm text-gray-600'>
                            <BiSolidMessageAltDetail />
                            <span>{task?.activities?.length || 0}</span>
                        </div>
                        <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
                            <MdOutlineAttachFile />
                            <span>{task?.assets?.length || 0}</span>
                        </div>
                        <div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
                            <FaList />
                            <span>0/{task?.subTasks?.length || 0}</span>
                        </div>
                    </div>
                </td>

                <td className='py-2'>
                    <div className='flex'>
                        {task?.team?.map((m, index) => (
                            <div
                                key={m._id}
                                className={clsx(
                                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                                    BGS[index % BGS?.length]
                                )}
                            >
                                <UserInfo user={m} />
                            </div>
                        ))}
                    </div>
                </td>

                <td className='py-2 flex gap-2 md:gap-4 justify-end'>
                    <Button
                        className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
                        label='Editar'
                        icon={<MdEdit className="inline" />}
                        type='button'
                        onClick={() => editHandler(task._id)}
                    />


                    <Button
                        className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
                        label='Eliminar'
                        type='button'
                        icon={<MdDelete className="inline" />}
                        onClick={() => deleteHandler(task._id)}
                    />
                </td>
            </tr>
        );
    };

    TableRow.propTypes = {
        task: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            stage: PropTypes.string.isRequired,
            priority: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            activities: PropTypes.array,
            assets: PropTypes.array,
            subTasks: PropTypes.array,
            team: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                })
            ),
        }),
    };

    return (
        <>
            <AgregarProyecto
                open={openEdit}
                setOpen={setOpenEdit}
                task={selectedTask} 
                key={new Date().getTime()}
            />
            <div className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <TableHeader />
                        <tbody>
                            {tasks.map((task, index) => (
                                <TableRow key={index} task={task} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

Table.propTypes = {
    task: PropTypes.object.isRequired,
};

export default Table;

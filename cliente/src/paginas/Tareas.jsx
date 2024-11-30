import { useState, useEffect, useContext } from 'react';
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Loading from '../componentes/Carga';
import { IoMdAdd } from 'react-icons/io';
import Title from '../componentes/Titulo';
import Button from "../componentes/button";
import Tabs from '../componentes/Tabs';
import TaskTitle from '../componentes/TaskTitle';
import VistaTablero from '../componentes/VistaTablero';
import Table from '../componentes/tareas/Table';
import AgregarProyecto from '../componentes/tareas/AgregarProyecto';
import { TaskContext } from '../contexts/TaskContext'

const TABS = [
    { title: "Modo Tablero", icon: <MdGridView /> },
    { title: "Modo Lista", icon: <FaList /> },
];

const TASK_TYPE = {
    "Por Hacer": "bg-red-600",
    "En Progreso": "bg-yellow-400",
    Completado: "bg-green-600",
};

const Tareas = () => {
    const params = useParams();
    const { tasks, setTasks, apiHost } = useContext(TaskContext);
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const status = params?.status || "";

        useEffect(() => {
            const fetchTasks = async () => {
                
                try {
                    const response = await fetch(`${apiHost}/api/Tareas`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    const transformedData = data.map(task => ({
                        _id: task._id,
                        title: task.title,
                        date: task.date,
                        priority: task.priority,
                        stage: task.stage,
                        assets: task.assets,
                        team: task.team,
                        isTrashed: task.isTrashed,
                        activities: task.activities,
                        subTasks: task.subTasks,
                        createdAt: task.createdAt,
                        updatedAt: task.updatedAt,
                        __v: task.__v
                    }));

                    // Filtrar tareas segun status
                    let filteredTasks;
                    switch (status.toLowerCase()) {
                        case 'completados':
                            filteredTasks = transformedData.filter(task => task.stage.toLowerCase() === 'completado');
                            break;
                        case 'por hacer':
                            filteredTasks = transformedData.filter(task => task.stage.toLowerCase() === 'por hacer');
                            break;
                        case 'en progreso':
                            filteredTasks = transformedData.filter(task => task.stage.toLowerCase() === 'en progreso');
                            break;
                        default:
                            filteredTasks = transformedData;
                            break;
                    }

                    setTasks(filteredTasks);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchTasks();
        }, [setTasks, status, apiHost]);

    return loading ? (
        <div className='py-10'>
            <Loading />
        </div>
    ) : (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <Title title={status ? `Proyectos ${status} ` : "Proyectos"} />

                {
                    !status && (
                        <Button
                            label="Crear Proyecto +"
                            onClick={() => setOpen(true)}
                            className="flex flex-row-reverse gap-1 items-center bg-green-600 text-white rounded-lg py-2 2xl:py-2.5"
                        />)
                }
            </div>

            <Tabs tabs={TABS} setSelected={setSelected}>
                {!status && (
                    <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
                        <TaskTitle label='Por Hacer' className={TASK_TYPE.hacer} />
                        <TaskTitle
                            label='En Progreso'
                            className={TASK_TYPE["en progreso"]}
                        />
                        <TaskTitle label='Completados' className={TASK_TYPE.completado} />
                    </div>
                )}

                {
                    selected !== 1 ? (<VistaTablero tasks={tasks} />) :
                        (
                            <div className='w-full'>
                                <Table task={tasks} />
                            </div>
                        )
                }
            </Tabs>

            <AgregarProyecto open={open} setOpen={setOpen} />
        </div>
    );
}

export default Tareas;

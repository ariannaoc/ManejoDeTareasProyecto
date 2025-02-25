import React, { useState, useEffect, useContext } from 'react';
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
    hacer: "bg-red-600",
    "en progreso": "bg-yellow-400",
    completado: "bg-green-600",
};

const Tareas = () => {
    const params = useParams();
    const { tasks, setTasks } = useContext(TaskContext);
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    //const [tasks, setTasks] = useState([]);

    const status = params?.status || "";



        useEffect(() => {
            const fetchTasks = async () => {
                try {
                    const response = await fetch('https://localhost:7009/api/Tareas', {
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

                    setTasks(transformedData);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchTasks();
        }, [setTasks]);

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
                                <Table tasks={tasks} />
                            </div>
                        )
                }
            </Tabs>

            <AgregarProyecto open={open} setOpen={setOpen} />
        </div>
    );
}

export default Tareas;

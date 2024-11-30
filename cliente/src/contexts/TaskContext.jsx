import { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const apiHost = "https://localhost:7009";
    const [action, setAction] = useState("");

    return (
        <TaskContext.Provider value={{ tasks, setTasks, apiHost, action, setAction }}>
            {children}
        </TaskContext.Provider>
    );
};

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './paginas/Login';
import Dashboard from './paginas/dashboard';
import Tareas from './paginas/Tareas';
import Usuarios from './paginas/Usuarios';
import Eliminados from './paginas/Eliminados';
import DetallesTarea from './paginas/DetallesTarea';
import Sidebar from './componentes/Sidebar';
import Navbar from './componentes/Navbar';
import { Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { setOpenSidebar } from './redux/slices/authSlice';
import clsx from 'clsx';
import { Fragment } from 'react';

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  
    // Display the login page if no user is found

  if (!user) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>
      <SidebarMobil/>
      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className='p-4 2x1:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const SidebarMobil = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const cerrarSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              'md:hidden w-full h-full bg-black/40 transition-all duration-700 transform',
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            )}
            onClick={() => cerrarSidebar()}
          >
            <div className='bg - white w-2/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => cerrarSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>
              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};


function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f46]'>
      <Routes>
        <Route path='/log-in' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to='/log-in' />} />
          {/*<Route path='/dashboard' element={<Dashboard />} />*/}
          <Route path='/tareas' element={<Tareas />} />
          <Route path='/completados/:status' element={<Tareas />} />
          <Route path='/en-progreso/:status' element={<Tareas />} />
          <Route path='/por-hacer/:status' element={<Tareas />} />
          <Route path='/equipos' element={<Usuarios />} />
          <Route path='/eliminados' element={<Eliminados />} />
          <Route path='/tareas/:id' element={<DetallesTarea />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;

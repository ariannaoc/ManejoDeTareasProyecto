import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../componentes/TextBox";
import Button from "../componentes/button";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { TaskContext } from "../contexts/TaskContext"

const Login = () => {
    const { user } = useSelector((state) => state.auth);
    const { apiHost } = useContext(TaskContext);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            // Realizar la solicitud de autenticación
            const response = await fetch(`${apiHost}/api/Usuarios/filter?username=${data.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Usuario no encontrado');
            }

            const userData = await response.json();

            // Autenticar contraseña
            if (userData[0].password != data.password) {
                console.log(userData[0].password, data.password)
                throw new Error('Contraseña incorrecta');
            }
            delete userData.password;

            // Guardar las credenciales en el estado global
            dispatch(setCredentials(userData));

            navigate("/tareas");
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            alert('Inicio de sesión fallido: ' + error.message);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/tareas");
        }
    }, [user, navigate]);

    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
                {/* left side */}
                <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
                            Maneja todas tus tareas en un solo lugar
                        </span>
                        <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-[#ff0000]'>
                            <span>Aplicación Web</span>
                            <span>Gestión de Tareas</span>
                        </p>
                    </div>
                </div>

                {/* right side */}
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
                    >
                        <div className=''>
                            <p className='text-blue-600 text-3xl font-bold text-center'>
                                ¡Bienvenido!
                            </p>
                            <p className='text-center text-base text-gray-700 '>
                                Comienza a gestionar tus proyectos
                            </p>
                        </div>

                        <div className='flex flex-col gap-y-5'>
                            <Textbox
                                placeholder='email@example.com'
                                type='email'
                                name='email'
                                label='Correo'
                                className='w-full rounded-full'
                                register={register("email", {
                                    required: "Email es requerido",
                                })}
                                error={errors.email ? errors.email.message : ""}
                            />
                            <Textbox
                                placeholder='contraseña'
                                type='password'
                                name='password'
                                label='Contraseña'
                                className='w-full rounded-full'
                                register={register("password", {
                                    required: "Contraseña es requerida",
                                })}
                                error={errors.password ? errors.password.message : ""}
                            />

                            {/*<span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>*/}
                            {/*    Olvidaste la contraseña?*/}
                            {/*</span>*/}

                            <Button
                                type='submit'
                                label='Iniciar sesion'
                                className='w-full h-10 bg-blue-700 text-white rounded-full'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

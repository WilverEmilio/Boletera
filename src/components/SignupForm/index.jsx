import { useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
    // Para poder evaluar lo que se escribe en un formulario se necesita un estado para cada campo del formulario.
    // En este caso, se crearon cinco estados, uno para cada campo del formulario. Cada estado se inicializa con un valor vacío.
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);


    const handleClearClick = () => {
        reset();
    };

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
    };

    console.log(errors);
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nombre
                <input {...register("nombre",{required: true})}  />
            </label>
            <br/>
            <label>
                Edad
                <input {...register("edad",{required: true})} />
            </label>
            <br/>
            <label>
                Dirección
                <input {...register("direccion",{required: true})} />
            </label>
            <br/>
            <label>
                Código Postal
                <input {...register("codigoPostal",{required: true})} />
            </label>
            <br/>
            <label>
                Télefono
                <input {...register("telefono",{required: true})} />
            </label>

            <div>
            <button type="button" onClick={(handleClearClick)}>Limpiar Datos</button>
            <button type="submit">Enviar Datos</button>
            </div>
        </form>
    );
};

export default SignupForm;
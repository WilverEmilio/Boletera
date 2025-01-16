import { useForm } from "react-hook-form";
import styles from "./MyInfo.module.css";
import { useEffect } from "react";
import { set } from "date-fns";


const USER_DATA = "userData";

const MyInfo = () => {
    const {handleSubmit, register, formState:{errors}, setValue} = useForm();

    useEffect(() => {
        try{
            const userData = JSON.parse(localStorage.getItem(USER_DATA));
            setValue("nombre", userData?.nombre);
            setValue("email", userData?.email);
            setValue("edad", userData?.edad);
        }catch(error){
            console.error(error);
        }
    }, []);

    const HandleFormSubmit = (data) => {
        try{
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            alert("Información guardada correctamente");
        }
        catch(error){
            alert("Error al guardar la información");
        }
    };

    return (
        <form onSubmit={handleSubmit(HandleFormSubmit)} className={styles.form}>
             <label className={styles.label}> 
                Nombre
                <input {...register("nombre",{required: true, minLength:1, maxLength:120})} className={styles.input} />
            </label>
            <label className={styles.label}>
                Email
                <input {...register("email",{required: true,min: 1, max: 90})} className={styles.input}  />
            </label>
            <label className={styles.label}>
                Edad
                <input 
                    {...register("edad",{required: true, min: 1, max: 90, valueAsNumber:true})} 
                    className={styles.input} type='number'
                />
            </label>
            <button type="submit" className={styles.sumitButton}>Guardar</button>
        </form>
    );
};

export default MyInfo;
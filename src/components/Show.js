import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {collection,getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal =withReactContent(Swal)

const Show = () => {

    //1 - configuramos los hooks

    const [persons, setPersons] = useState( [] )

    //2 - referenciamos la DB de firestore

    const personsCollection = collection(db, "personas")

    //3 - funcion para mostrar todos los Docs 

    const getPersons = async ()    => {

        const data = await getDocs(personsCollection)
        //console.log(data.docs)
        setPersons(

            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
        //console.log(persons)
    }

    //4 - funcion para eliminar un doc

    const deletePerson = async (id) => {
        const personDoc = doc(db, "personas", id);
        await deleteDoc(personDoc)
        getPersons()
    }

    //5 - funcion de confirmacion para Sweet Alert 2

    const confirmDelete = (id) =>   {
        Swal.fire({
            title: "¿Eliminar Persona?",
            text: "No podras recuoperar la informacion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar"
          }).then((result) => {
            if (result.isConfirmed) {
                
                deletePerson(id)
                Swal.fire({
                    title: "Borrado",
                    text: "La persona ah sido borrada",
                    icon: "success"
                });
            }
          });
    }

    //6 - usamos useEffect
    useEffect( () => {
        getPersons()
    }, [])
    //7 - vista de los componentes


    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-grid gap-2'>
                        <Link to={"/create"} className='btn btn-secondary mt-2 mb-2 '>Create</Link>
                    </div>
                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>DNI</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {persons.map( (person) => (
                                <tr key={person.id}>
                                    <td>{person.nombre}</td>
                                    <td>{person.apellidos}</td>
                                    <td>{person.dni}</td>
                                    <td>
                                        <Link to={`/edit/${person.id}`} className='btn btn-light'><i className='fa-solid fa-pencil'></i></Link>
                                        <button onClick={ () => {confirmDelete(person.id)}} className='btn btn-danger ml-2'><i className='fa-solid fa-trash'></i></button>
                                    </td>
                                    
                                </tr>
                            )) }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
        </>
    )

}

export default Show
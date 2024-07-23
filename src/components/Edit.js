import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"


const Edit = () => {

    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [dni, setDni] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()
    
    const update = async (e) =>{
        e.preventDefault()
        const person = doc(db, 'personas', id)
        const data = {nombre:nombre, apellidos:apellidos, dni: parseInt(dni)}
        await updateDoc(person,data)
        navigate('/')
    }

    const getPersonById = async (id) => {
        const person = await getDoc( doc(db, 'personas', id))
        if(person.exists()){
            console.log(person.data)
            setNombre(person.data().nombre)
            setApellidos(person.data().apellidos)
            setDni(person.data().dni)
        }else{
            console.log('el producto no existe')
        }   
    }

    useEffect( () => {
        getPersonById(id)

    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Persona</h1>
                <form onSubmit={update}>

                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                        value={nombre}
                        onChange={ (e) =>setNombre(e.target.value) }
                        type='text'
                        className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Apellidos</label>
                        <input
                        value={apellidos}
                        onChange={ (e) =>setApellidos(e.target.value) }
                        type='text'
                        className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>DNI</label>
                        <input
                        value={dni}
                        onChange={ (e) =>setDni(e.target.value) }
                        type='number'
                        className='form-control'
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit
        import React,{useState} from 'react'
        import { useNavigate } from 'react-router-dom'
        import { collection, addDoc } from 'firebase/firestore'

        import { db } from '../firebaseConfig/firebase'

        const Create = () => {

            const [nombre, setNombre] = useState('')
            const [apellidos, setApellidos] = useState('')
            const [dni, setDni] = useState(0)
            const navigate = useNavigate ()

            const personsCollection = collection(db, 'personas')
        
            const directory = async (e) => {
                e.preventDefault()
                await addDoc (personsCollection, {nombre: nombre, apellidos: apellidos, dni:dni})
                navigate('/')
            }
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h1>Agregar Persona</h1>
                            <form onSubmit={directory}>

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

                                <button type='submit' className='btn btn-primary'>Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
        )
        }

        export default Create
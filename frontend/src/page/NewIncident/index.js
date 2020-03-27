import React,{useState} from 'react';
import './styles.css';
import Logoimg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const history = useHistory();
    const ongid = localStorage.getItem('ongId');

   async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try{
           await api.post('/incidents', data,{
               headers:{
                   Authorization: ongid
               }
           });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso');
        }
    }

    return(
        <div className="new-incident">
        <div className="content">
            <section>
                <img src={Logoimg} alt="Be The Hero"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o cadastro detalhadamente para encontrar um herói para resolver isso</p>
                <Link to="/profile" className="back-link">
                <FiArrowLeft size={16} color="#E02041"/>
                Voltar para home
            </Link>

            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Título do caso"
                        value={title} onChange={e=>setTitle(e.target.value)}
                    />
                <textarea 
                    placeholder="Descrição" 
                        value={description} onChange={e=>setDescription(e.target.value)}
                    />
               
                <input 
                    placeholder="Valor em reais"
                         value={value} onChange={e=>setValue(e.target.value)}                    
                    />
               
                <button className="button" type="submit">Cadastrar</button>
            </form>

        </div>
    </div>
    )
}
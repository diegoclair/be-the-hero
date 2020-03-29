import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from "react-icons/fi"; //npm i react-icons
import { Link, useHistory } from "react-router-dom";

import api from '../../service/api';

import "./style.css";

import logoImg from '../../assets/logo.svg';



export default function Profile() {

  const ongId = localStorage.getItem('ong_id');
  const ongName = localStorage.getItem('ong_name');
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  // this useEffect receive two parameters: 
  // 1 - fuction to execute
  // 2 - array with args, example: if we put ongName, always that ongName change, this function in the first parameter will be called again
  // if we let the 2 parameter blank, then it will ve called only one time when the page was created
  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(res => {
      setIncidents(res.data);
    })
  }, [ongId]);

  async function handleDeleteIncindent(incidentId){
    //when the function wait some args
    //we cannot just pass the function on the button's onClick, because react would execute it as soon as the
    //page would be loaded and delete everything, so on OnClick we pass the function as a return from another function
    try {
      await api.delete(`/incidents/${incidentId}`, {
        headers: {
          Authorization: ongId
        }
      });

      //remove in the frontend the incident that we had removed
      setIncidents(incidents.filter(incident => incident.id !== incidentId));

    } catch (error) {
      alert('Erro ao deletar caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => {
          return(
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

              <button onClick={() => handleDeleteIncindent(incident.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
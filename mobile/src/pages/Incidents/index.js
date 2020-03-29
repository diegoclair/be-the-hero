import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../service/api'

import logoImg from '../assets/logo.png'; //this will return the best image size: normal, 2x or 3x

import styles from './styles'

export default function Container() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incidentDetail) {
    navigation.navigate('Detail',{incidentDetail});
  };

  async function loadIncidents() {
    if (loading) {
      return;
    };

    if (total > 0 && incidents.length == total) {
      return;
    };

    setLoading(true);
    const res = await api.get(`/incidents`, {
      params: {page}
    });

    //setIncidents(res.data);                   //this way, we always reload all incidents
    setIncidents([...incidents, ...res.data]);  //this way, we only put the new incidents at the old list
    setTotal(res.headers['x-total-count']);

    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return(
    //onEndReached          - when the user arrive at the end of the page, then call some function
    //onEndReachedThreshold - when there is x% to reach the end of the list/page, then call onEndReached
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/> 
        <Text style={styles.headerText}>
          Total de <Text style={styles.textBold}>{total} casos</Text>.
        </Text>
      </View>
      
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}
        renderItem={({ item: incident }) => {
          return (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(incident.value)}
                </Text>
              
              <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041"></Feather>
              </TouchableOpacity>
            </View>
          )
        }}
      />

    </View>
  );
}
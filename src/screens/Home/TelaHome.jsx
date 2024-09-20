import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dimensions } from "react-native";
import styles from './Style/MyStyles_Home';

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  
  const [ultimoDado, setUltimoDado] = useState(null);
  const [somaCorrentePorDia, setSomaCorrentePorDia] = useState(null);


//   const pegarUltimoDadoEmTempoReal = (caminho) => {
//     try {
//       const dadoRef = query(ref(realtimeDb, caminho), orderByKey(), limitToLast(1));

//       // Escuta as mudanças no banco de dados em tempo real
//       onValue(dadoRef, (snapshot) => {
//         const dados = snapshot.val();

//         if (dados) {
//           const [key] = Object.keys(dados);
//           const ultimoDadoString = dados[key];
//           const ultimoDado = JSON.parse(ultimoDadoString);

//           if (ultimoDado && ultimoDado.corrente !== undefined) {
//             console.log("Corrente recebida:", ultimoDado.corrente);
//             setUltimoDado(ultimoDado.corrente); // Atualiza o estado com a corrente recebida
//           } else {
//             console.log("Corrente não encontrada.");
//             setUltimoDado(null);
//           }
//         } else {
//           setUltimoDado(null); // Se não houver dados, define como null
//         }
//       }, (error) => {
//         console.error("Erro ao buscar o dado do Firebase: ", error);
//       });
//     } catch (error) {
//       console.error("Erro ao buscar o dado em tempo real: ", error);
//     }
//   };

//   useEffect(() => {
//     pegarUltimoDadoEmTempoReal("sensores/correnteG"); // Pega os dados em tempo real do caminho específico
//   }, []);


    function calcularCustoEnergia(ultimoDado, precoPorKWh = 0.88) {
      const tensao = 220; // Tensão em Volts
      const tempo = 1;  // Tempo em horas

      // Transformar mha em amper

      const corrente = ultimoDado / 1000;
    
      // Calcula a potência em kW (P = V * I)
      const potenciaKW = ( corrente * tensao) / 1000;
    
      // Calcula o consumo de energia em kWh (P * t)
      const consumoKWh = potenciaKW * tempo;
    
      // Calcula o custo em reais
      const custoReais = consumoKWh * precoPorKWh;
    
      return custoReais;
    }
    const custo = calcularCustoEnergia(ultimoDado);
    


//     const organizeDataByWeekday = (data) => {
//       const weekdayNames = [
//           'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
//           'Quinta-feira', 'Sexta-feira', 'Sábado'
//       ];
//       const currentYear = new Date().getFullYear();
  
//       // Mapeia cada dia da semana para um objeto contendo o nome e o total de corrente
//       const result = weekdayNames.map((weekdayName, index) => {
//           const dailyData = data.filter(item => {
//               const date = item.timestamp;
//               return date.getDay() === index && date.getFullYear() === currentYear;
//           });
  
//           const totalCorrente = dailyData.reduce((sum, item) => sum + (parseFloat(item.corrente) || 0), 0); // Soma a corrente convertida para número
//           console.log('total semana', totalCorrente)
//           return { dia: weekdayName, totalCorrente: totalCorrente }; // Retorna o nome do dia da semana e o consumo total
//       });
  
//       return result;
//   };


  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <Text className="Home"></Text>
          <Text></Text>
          <Text style={styles.Text_box}
          testID='dados'>
            {ultimoDado !== null ? `Corrente:  ${ultimoDado}⚡` : "Nenhum dado disponível"}
          </Text>
          <Text style={styles.Text_box}>Gasto real em 1 hora de uso R$: {custo.toFixed(2)}</Text>

      </View>
      
      <View style={styles.box_1}>
      <Text style={styles.Text}>Media de Custo</Text>
        
      {/* <StackedBarChart
          data={{
            labels: ["ALTO", "MEDIO", "BAIXO", "real"],
            data: [
              [21000],
              [14000],
              [8000],
              [ ultimoDado !== null && !isNaN(ultimoDado) ? ultimoDado : 0 ]
          
            ],
            barColors: [ "#9da3ae" ]
          }}
          width={340}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#5f6ab0",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#5f6ab0",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false // optional
          }}
          style={{
            alignItems: 'center',
          }}
        />
        
      </View>
      <View style={styles.box_2}>
        <Text style={styles.Text}>Consumo Semanal</Text>
      <LineChart
          data={{
            labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            datasets: [
              {
                data: [
                  0,
                  4227,
                  645.19,
                  ultimoDado !== null && !isNaN(ultimoDado) ? ultimoDado : 0,
                  0,
                  0,
                  0 
                ]
              }
            ]
          }}
          width={345} 
          height={190}
          yAxisLabel="A "
          yAxisInterval={1} 
          chartConfig={{
            backgroundGradientFrom: "#5f6ab0",
            backgroundGradientFromOpacity: 2,
            backgroundGradientTo: "#5f6ab0",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, 
            barPercentage: 0.5,
            useShadowColorFromDataset: false 
          }}
          bezier
          style={{
            borderRadius: 16,
            alignItems: 'center',
          }}
        /> */}
      </View>
    </View>
  );
}


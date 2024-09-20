import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './src/screens/register/Login';
import Cadastro from './src/screens/register/Cadastro';
import TelaHome from './src/screens/Home/TelaHome'
import TelaTomadas from './src/screens/outlet/TelaTomadas';
import Perfil from './src/screens/Perfil/Perfil';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Menu() {
  return (
    <Tab.Navigator 
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Tomadas') {
          iconName = focused ? 'flash' : 'flash-outline';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6069B1',
      tabBarInactiveTintColor: 'gray',
    })}
    
    >
      <Tab.Screen
        name="Home"
        component={TelaHome}
      />
      <Tab.Screen
        name="Tomadas"
        component={TelaTomadas}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />

    </Tab.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // if (loading) {
  //   return <LoadingScreen />;
  // }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
      {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />

        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


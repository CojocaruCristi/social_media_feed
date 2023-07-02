import Feed from './components/Feed/Feed';
import store from './store/store';
import { Provider } from 'react-redux';
import PostDetails from './components/PostDetails/PostDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ErrorBoundary fallback={'Something went wrong!'} >
          <MyStack />
        </ErrorBoundary>
      </Provider>
    </NavigationContainer>
  );
}



const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Feed}
        options={{ title: 'Feed' }}
      />
      <Stack.Screen name="Post" component={PostDetails} />
    </Stack.Navigator>
  );
};

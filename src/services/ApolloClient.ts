import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
    uri: 'http://192.168.0.21:4000/graphql'
    // uri: '/graphql',
    //   uri: 'localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    let JWTtoken
    const jwt = await AsyncStorage.getItem('@despensaJWT')

    if(jwt){
      const { token } = JSON.parse(jwt)
      JWTtoken = token
    }

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGY4ZDZhMWY5YTIzMTAxMjRlMjEzNyIsImlhdCI6MTYwODQ4NjYyNiwiZXhwIjoxNjk0ODkyNjA2fQ.ibPOWrjqa_Fe63nTIxyacJQCTrjLw7EmsFMc40dVbIg";
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return await {
      headers: {
        ...headers,
        credentials: 'include',
        authorization: JWTtoken ? `Bearer ${JWTtoken}` : "",
      }
    }
  });

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
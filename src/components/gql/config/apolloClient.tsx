import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const httpLink = createHttpLink({
  // uri: 'http://192.168.0.116:4000/graphql'
  // uri: 'https://despensa-back-app.herokuapp.com/graphql'
  uri: 'http://192.168.0.39:4000/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  let JWTtoken;
  const jwt = await AsyncStorage.getItem('@despensaUserData');

  console.log({jwt});

  if (jwt) {
    const {token} = JSON.parse(jwt);
    JWTtoken = token;
  }

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGY4ZDZhMWY5YTIzMTAxMjRlMjEzNyIsImlhdCI6MTYwODQ4NjYyNiwiZXhwIjoxNjk0ODkyNjA2fQ.ibPOWrjqa_Fe63nTIxyacJQCTrjLw7EmsFMc40dVbIg";
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them

  return await {
    headers: {
      ...headers,
      credentials: 'include',
      authorization: JWTtoken ? `Bearer ${JWTtoken}` : '',
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        recipes: {
          // read(existing, { args: { offset, limit }}) {
          //   // A read function should always return undefined if existing is
          //   // undefined. Returning undefined signals that the field is
          //   // missing from the cache, which instructs Apollo Client to
          //   // fetch its value from your GraphQL server.
          //   return existing && existing.slice(offset, offset + limit);
          // },
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: [],
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

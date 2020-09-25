const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const ApolloClient = require('apollo-client').ApolloClient;
const gql = require('graphql-tag');
const PrismicLink = require('apollo-link-prismic').PrismicLink;
const prismicIntrospectionResults = require('../../prismicIntrospectionResults.json');
const { IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');

async function fetchData(query, token) {
  // TODO: when this goes to production, add access token
  // now is the api public

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: prismicIntrospectionResults,
  });
  const cache = new InMemoryCache({
    fragmentMatcher,
  });

  const client = new ApolloClient({
    cache,
    link: PrismicLink({
      uri: 'https://inolog.prismic.io/graphql',
    }),
  });

  return client.query({ query: gql(query) });
}

exports.fetchData = fetchData;

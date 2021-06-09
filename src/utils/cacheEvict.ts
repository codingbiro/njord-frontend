import { ApolloCache } from '@apollo/client';

export default function apolloCacheEvictQuery(cache: ApolloCache<unknown>, query: string) {
  cache.evict({ id: 'ROOT_QUERY', fieldName: query });
  cache.gc();
}

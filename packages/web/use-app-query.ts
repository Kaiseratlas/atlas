import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { DocumentNode } from '@apollo/client';

export default function useAppQuery(query: DocumentNode) {
  const router = useRouter();
  return useQuery(query, {
    context: {
      headers: {
        'X-Product-Name': router.query['product-id'],
        'X-Product-Version': '0.20.1',
      },
    },
  });
}
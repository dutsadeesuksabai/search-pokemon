'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/apolloClient';
import React from 'react';

interface ApolloWrappedProps {
  children: React.ReactNode;
}

function ApolloWrapped({ children }: ApolloWrappedProps) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default ApolloWrapped;
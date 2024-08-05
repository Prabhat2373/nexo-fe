'use client';
import EmptyState from '@/components/app/EmptyState';
import AuthorListCard from '@/components/author/AuthorListCard';
import Container from '@/components/ui/Container';
import { useLazyGetAllAuthorsQuery } from '@/services/rtk/profileApi';
import React, { useEffect, useState } from 'react';

interface Props {
  data: [];
}

const AuthorsListContainer = ({ data }: Props) => {
  console.log('ssrdata', data);
  const [authors, setAuthors] = useState(data);
  const [getAuthors, { data: authorsApiData }] = useLazyGetAllAuthorsQuery();

  useEffect(() => {
    getAuthors('');
  }, []);

  useEffect(() => {
    if (authorsApiData?.data) {
      setAuthors(authorsApiData?.data);
    }
  }, [authorsApiData?.data]);

  console.log('authors', authors);
  return (
    <div>
      <Container className="mt-5">
        <div className="grid grid-cols-2 gap-4">
          <EmptyState data={authors}>
            {authors?.map((author) => {
              return <AuthorListCard author={author} />;
            })}
          </EmptyState>
        </div>
      </Container>
    </div>
  );
};

export default AuthorsListContainer;

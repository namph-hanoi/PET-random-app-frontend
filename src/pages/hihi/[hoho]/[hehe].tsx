import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Hoho(props: any) {
  const router = useRouter();
  useEffect(() => {
    console.log([
      '🚀 ~ file: [hehe].tsx:6 ~ Hoho ~ router:',
      router.query,
      props,
    ]);
  }, []);

  return (
    <>
      <p>Key là {Object.keys(router.query)[0]}</p>
      <p>value là {Object.values(router.query)[0]}</p>
    </>
  );
}

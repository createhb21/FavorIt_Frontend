import Link from 'next/link';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { Button } from '@components/base';
import { isFundingForm, isLocalGenerator } from '@recoil/create';
import { canGoBack } from '@recoil/layout';
import { LandingBox } from '@components/domain/home';
import { columnFlexbox } from '@styles/mixins/_flexbox';

const Main = styled.main`
  ${columnFlexbox('around', 'center')};
  row-gap: 12px;
  width: 100%;
  height: 100%;
  padding: 15px;

  > a {
    width: 100%;
  }
`;

const Home: NextPage = () => {
  const setCanGoBack = useSetRecoilState(canGoBack);
  const resetForm = useResetRecoilState(isFundingForm);
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);
  const useGenerate = () => {
    if (generator.proceed) {
    }
    resetForm();
    setGenerator((prev) => ({
      ...prev,
      done: false,
      page: 0,
    }));
  };

  useEffect(() => {
    setCanGoBack(false);
    return () => setCanGoBack(true);
  }, [setCanGoBack]);

  return (
    <>
      <Main>
        <h1 className="visually-hidden">난 이걸로 부탁해, 선물펀딩 FavorIt</h1>
        <LandingBox />
        <Link href="/fund/create">
          <a onClick={useGenerate}>
            <Button type="button" aria-label="펀딩 생성 버튼">
              펀딩 만들기
            </Button>
          </a>
        </Link>
      </Main>
    </>
  );
};

export default Home;

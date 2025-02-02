import React, { useState } from 'react';
import styled from '@emotion/styled';

import BankCardList from '@components/domain/banking/BankCardList';
import useLoadBanks from '@components/domain/banking/hooks/useLoadBank';
import AddPresentForm from '@components/domain/present/AddPresentForm';
import { useRouter } from 'next/router';
import AddBankingForm from '@components/domain/banking/AddBankingForm';

function Banking() {
  const router = useRouter();
  const [bankName, setBankName] = useState('');
  const [isSetBank, setIsSetBank] = useState(false);
  const { banks, isLoading } = useLoadBanks();

  if (isLoading) return <div>loading..</div>;

  const handleSetBank = () => {
    setIsSetBank(true);
  };

  const handleSetValue = (val: any) => {
    setBankName(val);
  };

  return (
    <Root>
      <LabelWrapper>
        <LabelTitle>어디로 받을까요?</LabelTitle>
        <LabelText>은행을 선택해주세요!</LabelText>
      </LabelWrapper>
      {!isSetBank ? (
        <BankCardList
          banks={banks}
          setIsSetBank={handleSetBank}
          handleSetValue={handleSetValue}
        />
      ) : (
        <Wrapper>
          <AddBankingForm code={bankName} />
        </Wrapper>
      )}
    </Root>
  );
}

export default Banking;

const Root = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  display: flex;
  flex-flow: column;
`;

const LabelWrapper = styled.div`
  padding: 28px 27px;
  padding-left: 54px;
  padding-bottom: 0;
`;
const LabelTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  color: #000000;
`;

const LabelText = styled.span`
  display: block;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-top: 50px;
`;

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Button, Input, TextArea } from '@components/base';
import useMutation from '@apis/useMutation';
import { textStyle } from '@styles/mixins/_text-style';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface fundingId {
  funding_id: string;
}
interface MutationResult {
  data: fundingId;
  message: string;
}

const Preview = () => {
  const router = useRouter();
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [create, { loading, data, error }] = useMutation<MutationResult>(
    'http://3.35.218.213/api/funding',
  );
  const onMutate = () => {
    create(fundingForm);
    // console.log(fundingForm);

    // setGenerator((prev: GeneratorType) => ({
    //   ...prev,
    //   done: true,
    //   proceed: false,
    // }));
  };

  useEffect(() => {
    // if (error) alert(error);
    if (data?.data?.funding_id) {
      setGenerator((prev: GeneratorType) => ({
        ...prev,
        done: true,
        proceed: false,
      }));
    }
  }, [data, setGenerator]);

  return (
    <Base>
      <Description>
        반가워요 유저님! <br />
        작성하신 내용을 확인해주세요
        <br />
        펀딩 생성을 진행할까요 ?
        <br />
        <br />
        요기에 미리 작성한 것들 보여줌
      </Description>
      <br />
      <br />
      <br />
      <Button onClick={onMutate}>좋아요</Button>
    </Base>
  );
};

export default Preview;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 100px;
  ${columnFlexbox('start', 'center')};

  animation: ${smoothAppearDownUp} 300ms;
`;

const Description = styled.div`
  width: 100%;
  ${textStyle(18, '#333C4A')}
`;

const Previews = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 15px;
  padding: 8px;
  ${columnFlexbox()}
`;

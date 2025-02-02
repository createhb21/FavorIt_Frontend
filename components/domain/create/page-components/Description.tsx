import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { btn48, btnPrimary } from '@styles/modules/_buttons';
import { TextArea, ErrorMessage } from '@components/base';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import {
  smoothAppearDownUp,
  smoothAppearDownUpLarge,
} from '@styles/modules/_keyframes';

const Form = styled.form`
  width: 100%;
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;
const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  animation: ${smoothAppearDownUpLarge} 700ms;
`;

interface UploadFormDescription {
  contents: string;
}

const Description = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormDescription>();
  const onValid = (data: UploadFormDescription) => {
    setFundingForm((prev: FormType) => ({
      ...prev,
      contents: data.contents.trim(),
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (fundingForm?.contents !== '') {
      setValue('contents', fundingForm?.contents);
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      role="tabpanel"
      aria-labelledby="pagination-tab-4"
      aria-label="펀딩 내용 입력"
    >
      <TextArea
        register={register('contents', {
          required: '입력된 텍스트가 없네요!',
          maxLength: {
            value: 100,
            message: '100자 까지 입력 가능해요',
          },
        })}
        name="contents"
        label="펀딩 콘텐츠"
        placeholder="펀딩 내용을 입력해주세요"
      />

      {errors?.contents?.type === 'required' && (
        <ErrorMessage>{errors.contents.message}</ErrorMessage>
      )}
      {errors?.contents?.type === 'maxLength' && (
        <ErrorMessage>{errors.contents.message}</ErrorMessage>
      )}
      <br />

      <NextButton type="submit">다음</NextButton>
    </Form>
  );
};

export default React.memo(Description);

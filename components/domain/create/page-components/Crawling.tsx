import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { textStyle } from '@styles/mixins/_text-style';
import { Input, ErrorMessage } from '@components/base';
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
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  text-align: left;
  padding: 0 1px;
  margin-top: 1rem;
  ${textStyle(16, '#4E5969')};
  animation: ${smoothAppearDownUpLarge} 700ms;

  > svg {
    transform: rotate(180deg);
    width: 1.25rem;
    height: 1.25rem;
    color: #737481;
  }
`;

interface UploadFormLink {
  link: string;
}

const Crawling = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormLink>();
  const onValid = (data: UploadFormLink) => {
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
    setFundingForm((prev: FormType) => ({
      ...prev,
      product: { ...prev.product, link: data.link.trim() },
    }));
  };

  useEffect(() => {
    if (fundingForm?.product?.link !== '') {
      setValue('link', fundingForm?.product?.link);
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      role="tabpanel"
      aria-labelledby="pagination-tab-0"
      aria-label="상품 링크 입력"
    >
      <Input
        name="link"
        label="상품 링크"
        placeholder="상품 링크를 입력해주세요"
        register={register('link', {
          required: '입력된 텍스트가 없네요!',
          pattern: {
            value:
              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            message: '올바른 주소를 입력해 주세요',
          },
        })}
      />

      {errors?.link?.type === 'required' && (
        <ErrorMessage>{errors.link.message}</ErrorMessage>
      )}
      {errors?.link?.type === 'pattern' && (
        <ErrorMessage>{errors.link.message}</ErrorMessage>
      )}

      <NextButton type="submit" aria-label="추가 옵션 버튼">
        추가 옵션
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </NextButton>
    </Form>
  );
};

export default React.memo(Crawling);

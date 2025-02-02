import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { flexbox } from '@styles/mixins/_flexbox';

const Base = styled.div`
  position: fixed;
  bottom: 0px;
  max-width: 640px;
  width: 100%;
  height: 5rem;
  padding-top: 20px;
  background-color: #fff;
  ${flexbox('start', 'center')}
`;

const Button = styled.button`
  display: inline-block;
  padding-left: 0.8rem;

  > svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #74747b;
  }
`;

interface BackProps {
  path?: string;
  currying?: () => void;
}

function GoBack({ path, currying }: BackProps) {
  const router = useRouter();
  const onClick = () => {
    if (path) {
      router.push(path);
    }
    router.back();
  };
  return (
    <Base>
      <h1 className="visually-hidden">뒤로 가기 버튼</h1>
      <Button
        onClick={currying ? currying : onClick}
        aria-label="뒤로 가기 버튼"
      >
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
      </Button>
    </Base>
  );
}

export default GoBack;

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

type Props = {
  first: number;
  second: number;
};

type TguguSate = {
  correct?: boolean;
  input: string;
  renderString?: string;
};

const Home: NextPage<Props> = props => {
  const [guguState, setGuguState] = useState<TguguSate>({ input: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const calc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.first * props.second === parseInt(guguState.input)) {
      setGuguState(prev => {
        return {
          correct: true,
          input: "",
          renderString: `${props.first} * ${props.second} = ${prev.input} 정답!`
        };
      });
      router.replace(router.asPath);
    } else {
      setGuguState({
        correct: false,
        input: "",
        renderString: "땡"
      });
    }
  };

  if (inputRef && inputRef.current) {
    inputRef.current.focus();
  }

  return (
    <>
      <div>
        {props.first} 곱하기 {props.second} 는?
      </div>

      <form onSubmit={e => calc(e)}>
        <input
          ref={inputRef}
          type={"text"}
          value={guguState.input}
          onChange={e => setGuguState({ input: e.target.value })}
        />
        <button type={"submit"}>입력!</button>
      </form>
      <div>{guguState.renderString}</div>
    </>
  );
};

export function getServerSideProps() {
  const first = Math.ceil(Math.random() * 9);
  const second = Math.ceil(Math.random() * 9);

  return {
    props: {
      first,
      second
    }
  };
}

export default Home;

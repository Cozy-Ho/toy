import type { NextPage } from "next";
import React, { useState, useRef } from "react";

type TwordStat = {
  word: string;
  value: string;
  result?: string;
};

const Home: NextPage = () => {
  const [wordState, setWordState] = useState<TwordStat>({ word: "강주", value: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wordState.word[wordState.word.length - 1] === wordState.value[0]) {
      setWordState({
        result: "딩동댕",
        word: wordState.value,
        value: ""
      });
    } else {
      setWordState(prev => {
        return {
          ...prev,
          result: "땡",
          value: ""
        };
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordState(prev => {
      return {
        ...prev,
        value: e.target.value
      };
    });
  };

  if (inputRef && inputRef.current) {
    inputRef.current.focus();
  }

  return (
    <>
      <div>{wordState.word}</div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} value={wordState.value} onChange={onChange} />
        <button type={"submit"}>입력!</button>
      </form>
      <div>{wordState.result}</div>
    </>
  );
};

export default Home;

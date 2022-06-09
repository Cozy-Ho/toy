import type { NextPage } from "next";
import { useState } from "react";

type TGameState = {
  result?: string;
  value: string;
  answer: number[];
  tries: Tries[];
};
type Tries = {
  try: string;
  result: string;
};

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const Home: NextPage = () => {
  const [gameState, setGameState] = useState<TGameState>({ value: "", answer: getNumbers(), tries: [] });

  const reStartGame = () => {
    alert("게임을 다시 시작합니다.");

    setGameState({
      value: "",
      answer: getNumbers(),
      tries: []
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(gameState.answer);
    if (gameState.value === gameState.answer.join("")) {
      setGameState(prev => {
        return {
          ...prev,
          result: "홈런!",
          tries: [...prev.tries, { try: prev.value, result: "홈런!" }]
        };
      });
      reStartGame();
    } else {
      const answerArray = gameState.value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (gameState.tries.length >= 9) {
        setGameState(prev => {
          return {
            ...prev,
            result: `10회이상 실패했습니다! 답은 ${prev.answer.join(",")} 였습니다!`
          };
        });
        reStartGame();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === gameState.answer[i]) {
            strike += 1;
          } else if (gameState.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setGameState(prev => {
          return {
            ...prev,
            tries: [...prev.tries, { try: prev.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
            value: ""
          };
        });
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState(prev => {
      return {
        ...prev,
        value: e.target.value
      };
    });
  };

  return (
    <>
      <h1>{gameState.result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength={4} value={gameState.value} onChange={onChange} />
      </form>
      <div>시도 : {gameState.tries.length}</div>
      <ul>
        {gameState.tries.map((item, key) => {
          return (
            <li key={key}>
              <div>
                {key + 1}차 시도 : {item.try}
              </div>
              <div>{item.result}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;

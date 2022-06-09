# 문제 1

문제가 있다.
다음과 같이 고친다.

```typescript
const App = () => {
  return (
    <>
      <div>리액트</div>
      <div>어느 정도 공부한거 같은데</div>
      <div>v18은 언제 또 공부하지</div>
    </>
  );
};
```

# 문제 2

useState는 비동기도 동작한다. ( React 앱 내 랜더링 최적화를 위해 )

# 문제 3

1. 랜더링은 1번 일어난다.
2. 상태 변경이 없으므로 콘솔 출력은 다음과 같다.

```type script
> count 0
```

3. React 앱 내에서 상태를 변경하려면 `setCount`를 통해서 변경해야 불변성을 지킬 수 있다.

수정한 코드는 다음과 같다.

```typescript
const App = () => {
  let [count, setCount] = useState(0);

  const onChangeCount = () => {
    setCount(prev => {
      return (prev += 1);
    });
  };

  console.log("count", count);

  return <button onClick={onChangeCount}>버튼</button>;
};
```

# 문제 4

1. 콘솔 출력은 다음과 같다.

```
> count 2 0
> count 1 0
> count 2 -1
```

2. 랜더링은 총 2번 일어난다.

# 문제 5

1. 출력 값은 다음과 같다.

```
> count 1 0
> count 2 0
> count 3 0
> count 4 0
> count 5 3
```

# 문제 6

1. 출력되는 값은 다음과 같다.

```
> numArr []
```

2. 상태가 변하지 않았으므로 랜더링은 1번만 일어난다.
3. 상태를 변경하려면 `setNumArr`를 통해 변경한다. 수정된 코드는 다음과 같다.

```typescript
const App = () => {
  const [numArr, setNumArr] = useState<number[]>([]);

  const onChangeNumArr = () => {
    setNumArr(prev => [...prev, prev.length]);
  };

  console.log("numArr", numArr);

  return <button onClick={onChangeNumArr}>숫자 추가</button>;
};
```

# 문제 7

1-1. abcd 입력했을경우 => 5번
1-2. 입력 안할 경우 => 1번

2. 출력은 다음과 같다.

```
>  (빈 string)
> a
> ab
> abc
> abcd
```

# 문제 8

1. 랜더링은 1회 일어난다.
2. 출력값은 없다.

# 문제 9

`onAdd1`과 `onAdd2`는 다르다.

`onAdd2`는 버튼을 클릭 할 때마다, 즉 랜더링이 발생 할 때 마다 새롭게 선언되고 할당되는 반면,
`onAdd1`은 한번만 선언된다.

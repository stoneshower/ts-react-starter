import * as React from 'react'
import Header from './header/index'

type Action = 'INCREMENT' | 'DECREMENT'

type State = {
  count: number,
}

interface ApiData {
  bank_code: string
  bank_name: string
  kana: string
}

const reducer = (state: State, action: Action) => {
  switch (action) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      if (state.count === 0) {
        return state
      }
      return { count: state.count - 1 }
    default:
      return state
  }
}

const Counter: React.FC<{}> = () => {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 })
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetch('http://demo0427586.mockable.io/bankname')
      .then(res => res.json())
      .then((response): void => {
        console.log(response)
        setData(response)
      })
      .catch(err => err)
  }, [])

  return (
    <div>
      <Header
        src="https://web.archive.org/web/20160326142013im_/http://shinyatk.com/images/logo.png"
        alt="Shinya Takahashi"
        width={235}
        height={111}
      />
      <h1>Count: {state.count}</h1>
      <div>
        <button onClick={() => dispatch('INCREMENT')}>+1</button>
        <button onClick={() => dispatch('DECREMENT')}>-1</button>
      </div>
      {
        data.map((item: ApiData, index: number) => <div key={item.bank_code + index}>{item.kana}</div>)
      }
    </div>
  )
}

export default Counter

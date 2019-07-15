import * as React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

interface A<S, T> {
  (x: S): T
}

interface Props {
  name?: string
  className?: string
  subTitle?: boolean
  primary?: string | boolean
  as?: string | A<any, JSX.Element>
  href?: string
}

const Title: React.FC<Props> = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${(props: any): string => (props.subTitle ? 'red' : 'white')};

  ${(props: any): FlattenSimpleInterpolation => props.primary && css`
    background: palevioletred;
    color: #fff;
  `}
`

const Text: React.FC<Props> = styled(Title)`
  font-size: 1em;
`

const ReverseText = (props: any): JSX.Element =>
<p children={props.children.split('').reverse()}></p>

const App = (): any => (
  <>
    <Title subTitle>ssss</Title>
    <Text primary as="a" href="#">aiueo</Text>
    <Text primary as={ReverseText} href="#">aiueo</Text>
    {/* <div className={style.outer}>Test</div>
    <div className={style.inner}>Test</div> */}
  </>
)

export default App

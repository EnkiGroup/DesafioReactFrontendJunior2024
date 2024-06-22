import Main from './components/Main'
import { StyleGlobal } from './stylesGlobal/styleGlobal'

export default function App() {
  return (
    <>
      <StyleGlobal />
      <div className="container">
        <Main />
      </div>
    </>
  )
}

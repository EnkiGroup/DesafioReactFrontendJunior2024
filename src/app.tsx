import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { StyleGlobal } from './stylesGlobal/styleGlobal'

import { store } from './store'

import Rotas from './routers'

import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StyleGlobal />
        <div className="container">
          <Header />
          <Rotas />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

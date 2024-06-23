import Footer from '../Footer'
import Header from '../Header'
import Todo from '../Todo'

import { MainContain } from './style'

const Main = () => {
  return (
    <MainContain>
      <Header />
      <Todo />
      <Footer />
    </MainContain>
  )
}

export default Main

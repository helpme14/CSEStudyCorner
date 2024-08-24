
import { Button } from './components/ui/button'
import Double from './Pages/Double'
import Testing from './Pages/Testing'

import './index.css'



function App() {

  return (
    <div className='container mx-auto'>
      <Button className='bg-red-500'>Hello</Button>
      <h1 className='text-red-500'>Hello here</h1>
      <Double />
      <Testing />
    </div>
  )
}

export default App

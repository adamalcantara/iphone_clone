import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Highlights from './Components/Highlights';
import Model from './Components/Model';

import * as Sentry from '@sentry/react'
import Features from './Components/Features';

const App = () => {
  
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
    </main>
  )
}

export default Sentry.withProfiler(App)
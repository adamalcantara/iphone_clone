import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Highlights from './Components/Highlights';
import Model from './Components/Model';

import * as Sentry from '@sentry/react'
import Features from './Components/Features';
import HowItWorks from './Components/HowItWorks';

const App = () => {
  
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
    </main>
  )
}

export default Sentry.withProfiler(App)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BookCover from './components/BookCover'
import AboutBook from './components/AboutBook'
import Story from './components/Story'
import TwoPerspectives from './components/TwoPerspectives'
import AuthorDedication from './components/AuthorDedication'
import Author from './components/Author'
import UnopenedLetter from './components/UnopenedLetter'
import Publication from './components/Publication'
import BookDetails from './components/BookDetails'
import Quotes from './components/Quotes'
import Excerpt from './components/Excerpt'
import CTA from './components/CTA'
import Newsletter from './components/Newsletter'
import BurntLetterEasterEgg from './components/BurntLetterEasterEgg'
import Footer from './components/Footer'
import CursorAtmosphere from './components/CursorAtmosphere'
import AshEngine from './components/AshEngine'
import LetGoBurner from './components/LetGoBurner'

function App() {
  return (
    <>
      <AshEngine />
      {/* Ambient cursor spotlight effect */}
      <CursorAtmosphere />

      {/* Grain texture overlay — purely decorative */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* 1. The Hook */}
        <Hero />
        
        {/* 2. The Premise */}
        <AboutBook />
        <BookCover />
        
        {/* 3. The Characters & Journey */}
        <TwoPerspectives />
        <Story />
        
        {/* 4. Interactive Immersion */}
        <Quotes />
        <Excerpt />
        <UnopenedLetter />
        
        {/* 5. Emotional Climax */}
        <LetGoBurner />
        
        {/* 6. The Creator */}
        <AuthorDedication />
        <Author />
        
        {/* 7. The Details */}
        <BookDetails />
        <Publication />
        
        {/* 8. Conversion */}
        <CTA />
        <Newsletter />
        <BurntLetterEasterEgg />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App

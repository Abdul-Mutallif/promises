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
import PromiseWall from './components/PromiseWall'
import Excerpt from './components/Excerpt'
import CTA from './components/CTA'
import Newsletter from './components/Newsletter'
import BurntLetterEasterEgg from './components/BurntLetterEasterEgg'
import Footer from './components/Footer'
import CursorAtmosphere from './components/CursorAtmosphere'

function App() {
  return (
    <>
      {/* Ambient cursor spotlight effect */}
      <CursorAtmosphere />

      {/* Grain texture overlay — purely decorative */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <BookCover />
        <AboutBook />
        <Story />
        <TwoPerspectives />
        <AuthorDedication />
        <Author />
        <UnopenedLetter />
        <Publication />
        <BookDetails />
        <Quotes />
        <PromiseWall />
        <Excerpt />
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

import './App.css'
import LocalMultiplayerPage from "./pages/LocalMultiplayer/LocalMultiplayerPage.jsx";
import Header from "./general/components/Header/Header.jsx";
import Footer from "./general/components/Footer/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main>
        <LocalMultiplayerPage />
      </main>
      <Footer />
    </div>
  )
}

export default App

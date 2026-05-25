import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RulesSection from './components/RulesSection';
import PromptLab from './components/PromptLab';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <RulesSection />
        <PromptLab />
      </main>
      <footer className="footer">
        <p>PromptCraft — Built for AI-native thinkers</p>
      </footer>
    </div>
  );
}

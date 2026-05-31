import CustomCursor from "./components/CustomCursor";
import NeuralNetwork from "./components/NeuralNetwork";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import GithubShowcase from "./components/GithubShowcase";
import Vision from "./components/Vision";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg-dark text-white selection:bg-accent-cyan selection:text-black">
      {/* Premium Cursor Halo Tracker */}
      <CustomCursor />

      {/* Persistent Neural Synapses Web Canvas in base layer */}
      <NeuralNetwork />

      {/* Floating Top Nav bar & Scroll progress indicators */}
      <Header />

      {/* Main Structural Layout Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* SECTION 1 - HERO */}
        <Hero />

        {/* SECTION 2 - ABOUT */}
        <About />

        {/* SECTION 3 - EXPERTISE */}
        <Expertise />

        {/* SECTION 4 - PROJECTS */}
        <Projects />

        {/* SECTION 5 - JOURNEY */}
        <Journey />

        {/* SECTION 6 - GITHUB SHOWCASE */}
        <GithubShowcase />

        {/* SECTION 7 - VISION */}
        <Vision />

        {/* SECTION 8 - CONTACT */}
        <Contact />
      </main>
    </div>
  );
}


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-thinkbridge-600 flex items-center justify-center">
              <span className="text-white font-bold">TB</span>
            </div>
            <span className="font-bold text-xl text-foreground">ThinkBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#about" className="font-medium hover:text-thinkbridge-700 transition-colors">
              About
            </Link>
            <Link to="/#subjects" className="font-medium hover:text-thinkbridge-700 transition-colors">
              Subjects
            </Link>
            <Link to="/#testimonials" className="font-medium hover:text-thinkbridge-700 transition-colors">
              Testimonials
            </Link>
            <Link to="/#faq" className="font-medium hover:text-thinkbridge-700 transition-colors">
              FAQ
            </Link>
            <Link to="/book" className="btn-primary">
              Book a Tutor
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <nav className="flex flex-col gap-4">
            <Link
              to="/#about"
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/#subjects"
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Subjects
            </Link>
            <Link
              to="/#testimonials"
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/#faq"
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/book"
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Tutor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

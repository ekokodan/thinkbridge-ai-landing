
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-thinkbridge-600 flex items-center justify-center">
                <span className="text-white font-bold">TB</span>
              </div>
              <span className="font-bold text-xl">ThinkBridge</span>
            </div>
            <p className="text-white/70 mb-4">
              AI-powered personalized learning for students of all ages.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-thinkbridge-400 transition-colors" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" className="hover:text-thinkbridge-400 transition-colors" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="hover:text-thinkbridge-400 transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" className="hover:text-thinkbridge-400 transition-colors" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/#subjects" className="text-white/70 hover:text-white transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-white/70 hover:text-white transition-colors">
                  Book a Tutor
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Join as Tutor
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Learning Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <Link to="/#faq" className="text-white/70 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Data Processing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>&copy; {currentYear} ThinkBridge. All rights reserved.</p>
          <p className="mt-2">Made with ♡ by ThinkBridge</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

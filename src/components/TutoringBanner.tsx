
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const subjects = [
  { name: "Math", color: "bg-blue-500" },
  { name: "English", color: "bg-green-500" },
  { name: "French", color: "bg-yellow-500" },
  { name: "Python", color: "bg-purple-500" },
];

const TutoringBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-thinkbridge-700 to-thinkbridge-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Private Tutoring Available Now
              </h2>
              <p className="text-white/80">
                Get one-on-one help from our expert tutors in these subjects:
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {subjects.map((subject, index) => (
                  <span
                    key={index}
                    className={`${subject.color} px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/book"
              className="px-6 py-3 bg-white text-thinkbridge-700 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Book Session
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutoringBanner;

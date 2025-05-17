
import { BookOpen, Brain, LineChart } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-12 h-12 text-thinkbridge-600" />,
    title: "Personalized Learning",
    description:
      "Our AI adapts to each student's pace and style, creating a truly personalized educational experience that evolves as they learn.",
  },
  {
    icon: <Brain className="w-12 h-12 text-thinkbridge-600" />,
    title: "AI Tutor",
    description:
      "Get instant help from our advanced AI tutor who can answer questions, explain concepts, and provide additional resources 24/7.",
  },
  {
    icon: <LineChart className="w-12 h-12 text-thinkbridge-600" />,
    title: "Progress Tracking",
    description:
      "Monitor growth with comprehensive analytics that highlight strengths and identify areas needing additional focus.",
  },
];

const AboutThinkBridge = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About ThinkBridge
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're transforming education with AI-powered tools that make 
              learning more effective, engaging, and accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border border-border card-hover bg-white flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 rounded-full bg-thinkbridge-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutThinkBridge;

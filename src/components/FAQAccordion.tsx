
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is ThinkBridge's pricing model?",
    answer:
      "ThinkBridge offers flexible pricing options including monthly subscriptions ($29.99/month) and annual plans ($299/year) with a 15% discount. We also offer a free 14-day trial for new users to experience our platform. For schools and educational institutions, we provide custom pricing based on the number of students.",
  },
  {
    question: "How does the AI adapt content to my learning style?",
    answer:
      "Our AI analyzes your interactions, responses, and performance on lessons and quizzes to build a comprehensive learning profile. It identifies your strengths, weaknesses, preferred learning pace, and most effective content formats. The system then dynamically adjusts difficulty levels, provides targeted practice opportunities, and selects teaching methods that work best for you. As you continue using the platform, the AI refines its understanding of your learning style for increasingly personalized experiences.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your subscription at any time through your account settings. If you cancel during your free trial period, you won't be charged. For paid subscriptions, you'll continue to have access until the end of your current billing period, after which your subscription will automatically end. We don't offer prorated refunds for unused subscription time, but you can continue using all features until your subscription expires.",
  },
  {
    question: "How is my data protected on the ThinkBridge platform?",
    answer:
      "We take data privacy seriously at ThinkBridge. All personal information is encrypted using industry-standard protocols, and we never sell your data to third parties. Our platform complies with GDPR, CCPA, and FERPA regulations. Student learning data is used only to improve the personalization of our tutoring system. You can request a copy of your data or its deletion at any time through our privacy center in your account settings.",
  },
];

const FAQAccordion = () => {
  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about ThinkBridge.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;

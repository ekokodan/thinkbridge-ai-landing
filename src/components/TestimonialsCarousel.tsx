
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "../api/testimonials";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  useEffect(() => {
    if (!testimonials?.length) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials?.length]);

  if (isLoading) {
    return (
      <div className="section-padding bg-secondary">
        <div className="container">
          <div className="h-48 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !testimonials?.length) {
    return null;
  }

  return (
    <section id="testimonials" className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how ThinkBridge is transforming learning experiences.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-white shadow-md">
                      <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                          <Avatar className="h-16 w-16 border-2 border-thinkbridge-200">
                            {testimonial.avatar ? (
                              <img src={testimonial.avatar} alt={testimonial.name} />
                            ) : (
                              <AvatarFallback className="bg-thinkbridge-100 text-thinkbridge-800">
                                {testimonial.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>
                        <blockquote className="text-lg mb-6 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index ? "w-8 bg-thinkbridge-600" : "w-2 bg-thinkbridge-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

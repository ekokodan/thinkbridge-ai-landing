
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, Star, Users, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const JoinTutorPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subjects: '',
    experience: '',
    education: '',
    availability: '',
    motivation: ''
  });

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Earn $25-60/hour based on experience and subject expertise'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Set your own hours and work around your schedule'
    },
    {
      icon: Users,
      title: 'Meaningful Impact',
      description: 'Help students achieve their academic goals and build confidence'
    },
    {
      icon: Star,
      title: 'Professional Growth',
      description: 'Develop teaching skills and gain valuable experience'
    }
  ];

  const requirements = [
    'Bachelor\'s degree or currently pursuing higher education',
    'Strong knowledge in at least one subject area',
    'Excellent communication skills',
    'Reliable internet connection and quiet space for tutoring',
    'Passion for helping students learn and succeed'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tutor application submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Team of 
                <span className="text-indigo-600"> Expert Tutors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Share your knowledge, make a difference in students' lives, and earn competitive pay 
                with flexible scheduling that works for you.
              </p>
              <Button size="lg" className="btn-primary">
                Apply Now
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Tutor with ThinkBridge?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join a platform that values quality education and supports both tutors and students.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    <Card className="h-full text-center">
                      <CardHeader>
                        <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{benefit.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Requirements</h2>
              <p className="text-gray-600">
                We're looking for passionate educators who meet these qualifications:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-slate-50 rounded-xl p-8"
            >
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Apply to Become a Tutor</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tutor Application</CardTitle>
                  <CardDescription>
                    Please provide detailed information about your background and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="subjects" className="block text-sm font-medium mb-2">
                        Subject Areas *
                      </label>
                      <Input
                        id="subjects"
                        name="subjects"
                        value={formData.subjects}
                        onChange={handleInputChange}
                        placeholder="e.g., Math, Physics, Chemistry, English"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="education" className="block text-sm font-medium mb-2">
                        Education Background *
                      </label>
                      <Textarea
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="Describe your educational background, degrees, certifications..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium mb-2">
                        Teaching/Tutoring Experience
                      </label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Describe any teaching or tutoring experience you have..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium mb-2">
                        Availability *
                      </label>
                      <Textarea
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        placeholder="When are you available to tutor? (days, times, timezone)"
                        className="min-h-[80px]"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="motivation" className="block text-sm font-medium mb-2">
                        Why do you want to tutor? *
                      </label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        placeholder="Tell us about your passion for teaching and helping students..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload your resume (optional)</p>
                      <p className="text-sm text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
                      <Button type="button" variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>

                    <Button type="submit" className="w-full btn-primary">
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinTutorPage;

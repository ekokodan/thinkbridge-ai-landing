
const subjects = [
  "Algebra",
  "Geometry",
  "Calculus",
  "Statistics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
  "Creative Writing",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "Python",
  "JavaScript",
  "French",
  "Spanish",
  "German",
];

const SubjectsOffered = () => {
  return (
    <section id="subjects" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subjects We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform covers a wide range of subjects to support your learning journey.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-secondary rounded-full text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary transition-colors cursor-pointer"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsOffered;


import { useQuery } from "@tanstack/react-query";
import { fetchNews, type NewsItem } from "../api/news";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <Card className="card-hover h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{news.title}</CardTitle>
        <CardDescription>{news.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{news.preview}</p>
      </CardContent>
      <CardFooter>
        <a
          href={news.readMoreUrl}
          className="text-thinkbridge-600 font-medium hover:underline flex items-center gap-1"
        >
          Read more <ArrowRight size={16} />
        </a>
      </CardFooter>
    </Card>
  );
};

const UpcomingNews = () => {
  const { data: newsItems, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (isLoading) {
    return (
      <div className="section-padding bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Coming</h2>
              <div className="h-48 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Coming</h2>
              <p className="text-red-500">Unable to load news at this time.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Coming</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest developments and upcoming features at ThinkBridge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems?.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingNews;

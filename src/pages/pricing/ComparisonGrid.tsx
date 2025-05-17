
import { useQuery } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';
import { fetchFeatureComparison } from '@/api/pricing';
import { cn } from '@/lib/utils';

const ComparisonGrid = () => {
  const { data: features, isLoading } = useQuery({
    queryKey: ['feature-comparison'],
    queryFn: fetchFeatureComparison
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!features) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Feature Comparison</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare our plans to find the perfect fit for your learning journey.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 min-w-[200px]">Feature</th>
                <th className="p-4 min-w-[150px]">
                  <div className="text-center">
                    <span className="font-bold block">AI Basic</span>
                    <span className="text-sm text-muted-foreground">$29/mo</span>
                  </div>
                </th>
                <th className="p-4 min-w-[150px] bg-secondary/50">
                  <div className="text-center">
                    <span className="font-bold block">Tutor Lite</span>
                    <span className="text-sm text-muted-foreground">$119/mo</span>
                  </div>
                </th>
                <th className="p-4 min-w-[150px]">
                  <div className="text-center">
                    <span className="font-bold block">Tutor Plus</span>
                    <span className="text-sm text-muted-foreground">$219/mo</span>
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={cn("border-b", index % 2 === 0 ? "bg-slate-50" : "bg-white")}>
                  <td className="p-4 font-medium">{feature.feature}</td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      {typeof feature.aiBasic === 'boolean' ? (
                        feature.aiBasic ? 
                          <Check className="h-5 w-5 text-green-500" /> : 
                          <X className="h-5 w-5 text-slate-300" />
                      ) : (
                        <span className="text-center">{feature.aiBasic}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 bg-secondary/50">
                    <div className="flex justify-center">
                      {typeof feature.tutorLite === 'boolean' ? (
                        feature.tutorLite ? 
                          <Check className="h-5 w-5 text-green-500" /> : 
                          <X className="h-5 w-5 text-slate-300" />
                      ) : (
                        <span className="text-center">{feature.tutorLite}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      {typeof feature.tutorPlus === 'boolean' ? (
                        feature.tutorPlus ? 
                          <Check className="h-5 w-5 text-green-500" /> : 
                          <X className="h-5 w-5 text-slate-300" />
                      ) : (
                        <span className="text-center">{feature.tutorPlus}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonGrid;


import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';
import { fetchFeatureComparison } from '@/api/pricing';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ComparisonGrid = () => {
  const { data: features, isLoading } = useQuery({
    queryKey: ['feature-comparison'],
    queryFn: fetchFeatureComparison,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!features || features.length === 0) {
    return null;
  }

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-thinkbridge-500" />
      ) : (
        <X className="mx-auto h-5 w-5 text-muted-foreground" />
      );
    }
    return value;
  };

  return (
    <section className="py-20 px-4 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Feature Comparison</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare our plans side-by-side to find the best option for your learning needs
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-1/5">Feature</TableHead>
                <TableHead className="text-center">Tutor Only</TableHead>
                <TableHead className="text-center">AI Basic</TableHead>
                <TableHead className="text-center">Tutor Lite</TableHead>
                <TableHead className="text-center">Tutor Plus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <TableCell className="font-medium">{item.feature}</TableCell>
                  <TableCell className="text-center">
                    {renderValue(item.tutorOnly || false)}
                  </TableCell>
                  <TableCell className="text-center">{renderValue(item.aiBasic)}</TableCell>
                  <TableCell className="text-center">{renderValue(item.tutorLite)}</TableCell>
                  <TableCell className="text-center">{renderValue(item.tutorPlus)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonGrid;

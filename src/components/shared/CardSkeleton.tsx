import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export const CardSkeleton = ({
  width,
  height,
  layout,
}: {
  width?: string;
  height?: string;
  layout?: string;
}) => {
  return (
    <Card className={`w-full ${width}  shadow-blue-400`}>
      <div className={`${layout}`}>
        <CardHeader className={height}>
          <Skeleton className="aspect-video w-full h-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="bg-blue-300 h-5 w-10 mb-4" />
          <Skeleton className="bg-blue-300 h-5 w-full my-2" />
          <Skeleton className="bg-blue-300 h-5 w-3/4 my-2" />
        </CardContent>
      </div>
    </Card>
  );
};

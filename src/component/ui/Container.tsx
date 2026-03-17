import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("lg:max-w-7xl lg:mx-auto w-full px-8", className)}>
      {children}
    </div>
  );
};

export default Container;

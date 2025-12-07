import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("container py-8 animate-fade-in", className)}>
      {children}
    </main>
  );
}

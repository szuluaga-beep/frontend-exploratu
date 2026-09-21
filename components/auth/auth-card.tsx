import { Card } from "@heroui/react";

import { Logo } from "@/components/icons";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-xl border border-divider bg-background/80 backdrop-blur-sm">
      <Card.Header className="flex flex-col items-center gap-2 pb-0 pt-8 px-8">
        <div className="flex items-center gap-2 mb-2">
          <Logo />
          <span className="font-bold text-xl text-foreground">Exploratu</span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted text-center">{subtitle}</p>
        )}
      </Card.Header>
      <Card.Content className="px-8 py-6">{children}</Card.Content>
    </Card>
  );
}

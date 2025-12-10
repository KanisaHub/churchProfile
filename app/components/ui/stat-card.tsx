import type { LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'gold';
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-card-hover animate-slide-up',
        variant === 'default' && 'bg-card',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'gold' && 'bg-secondary text-secondary-foreground',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              'text-sm font-medium',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
            )}
          >
            {title}
          </p>
          <p className="text-3xl font-display font-bold">
            {value.toLocaleString()}
          </p>
          {description && (
            <p
              className={cn(
                'text-sm',
                variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
              )}
            >
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.positive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.positive ? '+' : ''}
                {trend.value}%
              </span>
              <span
                className={cn(
                  'text-xs',
                  variant === 'default' ? 'text-muted-foreground' : 'opacity-70'
                )}
              >
                from last month
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-lg',
            variant === 'default' && 'bg-primary/10',
            variant === 'primary' && 'bg-primary-foreground/20',
            variant === 'gold' && 'bg-secondary-foreground/10'
          )}
        >
          <Icon
            className={cn(
              'w-6 h-6',
              variant === 'default' && 'text-primary',
              variant === 'primary' && 'text-primary-foreground',
              variant === 'gold' && 'text-secondary-foreground'
            )}
          />
        </div>
      </div>

      {/* Decorative element */}
      <div
        className={cn(
          'absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10',
          variant === 'default' && 'bg-primary',
          variant === 'primary' && 'bg-primary-foreground',
          variant === 'gold' && 'bg-secondary-foreground'
        )}
      />
    </div>
  );
}

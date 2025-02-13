type BadgeVariant = 'success' | 'warning' | 'danger';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  className?: string;
}

export type { BadgeProps, BadgeVariant };

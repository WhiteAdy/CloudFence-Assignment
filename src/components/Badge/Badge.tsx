import clsx from 'clsx';
import { BadgeProps } from './Badge.types';
import './Badge.styles.scss';

function Badge({ className, variant, text }: BadgeProps) {
  return (
    <div
      className={clsx('Badge', className, {
        'Badge--success': variant === 'success',
        'Badge--warning': variant === 'warning',
        'Badge--danger': variant === 'danger',
      })}
    >
      {text}
    </div>
  );
}

export default Badge;

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BaseProps {
  variant?: 'primary' | 'outline' | 'emerald';
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never };
type LinkProps = BaseProps & { to: string };

const STYLES: Record<NonNullable<BaseProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-chillired to-chillired-dark text-white hover:brightness-110 active:scale-[0.98] font-bold shadow-[0_8px_22px_rgba(194,24,37,0.28)] border border-metallicgold/50',
  outline:
    'bg-white text-charcoal hover:border-chillired hover:text-chillired active:scale-[0.98] border border-metallicgold/60 font-semibold shadow-sm',
  emerald:
    'bg-gradient-to-r from-metallicgold-light via-metallicgold to-metallicgold-dark text-charcoal hover:brightness-105 active:scale-[0.98] font-bold shadow-[0_8px_20px_rgba(212,175,55,0.3)] border border-chillired/25',
};

export function GoldButton(props: ButtonProps | LinkProps) {
  const { variant = 'primary', children, className = '', ...rest } = props;
  const base = `gold-shine-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-chillired ${STYLES[variant]} ${className}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

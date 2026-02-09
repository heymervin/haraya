interface DreamLineProps {
  variant?: 'full' | 'thin' | 'loading';
  className?: string;
}

export default function DreamLine({ variant = 'full', className = '' }: DreamLineProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'thin':
        return 'haraya-glow-thin';
      case 'loading':
        return 'haraya-glow-loading';
      default:
        return 'haraya-glow';
    }
  };

  return <div className={`${getVariantClass()} ${className}`} />;
}

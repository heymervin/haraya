interface WovenBorderProps {
  variant?: 'full' | 'thin' | 'loading';
  className?: string;
}

export default function WovenBorder({ variant = 'full', className = '' }: WovenBorderProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'thin':
        return 'woven-border-thin';
      case 'loading':
        return 'woven-border-loading';
      default:
        return 'woven-border';
    }
  };

  return <div className={`${getVariantClass()} ${className}`} />;
}

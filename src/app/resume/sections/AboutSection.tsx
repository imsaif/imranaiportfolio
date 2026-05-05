interface AboutSectionProps {
  about: string;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <p className="text-text-secondary text-base md:text-lg leading-relaxed whitespace-pre-line">
      {about}
    </p>
  );
}

// Common types used throughout the application

export interface Framework {
  number: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Journey {
  period: string;
  title: string;
  description: string;
}

export interface Inspiration {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

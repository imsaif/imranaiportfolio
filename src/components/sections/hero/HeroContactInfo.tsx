'use client';

import React from 'react';

interface HeroContactInfoProps {
  isVisible: boolean;
}

const HeroContactInfo = ({ isVisible }: HeroContactInfoProps) => {
  return (
    <div
      className="pt-8 border-t border-border flex flex-col sm:flex-row gap-6 md:gap-8 text-sm text-muted"
    >
      <div>
        <p className="font-medium mb-1.5">Email</p>
        <a href="mailto:imranrizom@gmail.com" className="hover:text-accent">
          imranrizom@gmail.com
        </a>
      </div>
      <div>
        <p className="font-medium mb-1.5">Location</p>
        <span>Hyderabad, India</span>
      </div>
      <div>
        <p className="font-medium mb-1.5">Available For</p>
        <span>AI Design Consulting & Full-time Opportunities</span>
      </div>
    </div>
  );
};

export default HeroContactInfo;

/**
 * Vapi Scroll Handlers for UHG Case Study
 * Functions that Vapi can call to navigate and interact with the case study page
 */

export interface ScrollResponse {
  success: boolean;
  message: string;
  currentSection?: string;
}

// Valid section IDs that exist on the UHG case study page
const VALID_SECTIONS = ['overview', 'research', 'design', 'technical', 'results'] as const;
type SectionId = typeof VALID_SECTIONS[number];

/**
 * Scrolls to a specific section of the case study
 * @param sectionId - The section to scroll to
 * @returns Response indicating success and current section
 */
export function scrollToSection(sectionId: string): ScrollResponse {
  try {
    // Validate section ID
    if (!VALID_SECTIONS.includes(sectionId as SectionId)) {
      return {
        success: false,
        message: `Invalid section "${sectionId}". Valid sections are: ${VALID_SECTIONS.join(', ')}`
      };
    }

    // Find the section element
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) {
      return {
        success: false,
        message: `Section "${sectionId}" not found on page`
      };
    }

    // Scroll to the section with smooth behavior
    // Offset by 100px to account for sticky navigation
    const elementPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    return {
      success: true,
      message: `Scrolled to ${getSectionDisplayName(sectionId)} section`,
      currentSection: sectionId
    };
  } catch (error) {
    console.error('Error scrolling to section:', error);
    return {
      success: false,
      message: `Failed to scroll to section: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Gets the currently visible section based on scroll position
 * @returns The ID of the currently visible section
 */
export function getCurrentSection(): ScrollResponse {
  try {
    const sections = VALID_SECTIONS.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const rect = element.getBoundingClientRect();
      return {
        id,
        top: rect.top,
        element
      };
    }).filter(Boolean);

    // Find the section that's most visible (closest to top but still visible)
    const visibleSection = sections.find(section =>
      section && section.top >= -200 && section.top <= 300
    );

    const currentSection = visibleSection?.id || 'overview';

    return {
      success: true,
      message: `Currently viewing ${getSectionDisplayName(currentSection)} section`,
      currentSection
    };
  } catch (error) {
    console.error('Error getting current section:', error);
    return {
      success: false,
      message: `Failed to get current section: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Scrolls to a specific content element within a section
 * @param elementId - The ID of the element to scroll to
 * @returns Response indicating success
 */
export function scrollToContent(elementId: string): ScrollResponse {
  try {
    const element = document.getElementById(elementId) ||
                   document.querySelector(`[data-content="${elementId}"]`);

    if (!element) {
      return {
        success: false,
        message: `Element "${elementId}" not found`
      };
    }

    // Scroll to the element smoothly
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    return {
      success: true,
      message: `Scrolled to content: ${elementId}`
    };
  } catch (error) {
    console.error('Error scrolling to content:', error);
    return {
      success: false,
      message: `Failed to scroll to content: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Scrolls to a specific metric or statistic on the page
 * @param metricType - Type of metric to find (e.g., 'abandonment', 'completion', 'time')
 * @returns Response indicating success
 */
export function scrollToMetric(metricType: string): ScrollResponse {
  try {
    const metricMap: Record<string, string> = {
      'abandonment': 'overview',
      'completion': 'results',
      'time': 'results',
      'support': 'overview',
      'mobile': 'results',
      'users': 'research'
    };

    const section = metricMap[metricType.toLowerCase()];
    if (!section) {
      return {
        success: false,
        message: `Metric type "${metricType}" not found. Available metrics: ${Object.keys(metricMap).join(', ')}`
      };
    }

    return scrollToSection(section);
  } catch (error) {
    console.error('Error scrolling to metric:', error);
    return {
      success: false,
      message: `Failed to scroll to metric: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Gets a list of all available sections
 * @returns List of available sections with their display names
 */
export function getAvailableSections(): ScrollResponse {
  const sections = VALID_SECTIONS.map(id => ({
    id,
    name: getSectionDisplayName(id)
  }));

  return {
    success: true,
    message: `Available sections: ${sections.map(s => s.name).join(', ')}`,
    currentSection: getCurrentSection().currentSection
  };
}

/**
 * Helper function to get display name for section ID
 */
function getSectionDisplayName(sectionId: string): string {
  const displayNames: Record<string, string> = {
    'overview': 'Project Overview',
    'research': 'Research & Discovery',
    'design': 'Design Strategy',
    'technical': 'Technical Implementation',
    'results': 'Results & Impact'
  };

  return displayNames[sectionId] || sectionId;
}

// Global window functions that Vapi can call
declare global {
  interface Window {
    vapiScrollToSection: typeof scrollToSection;
    vapiGetCurrentSection: typeof getCurrentSection;
    vapiScrollToContent: typeof scrollToContent;
    vapiScrollToMetric: typeof scrollToMetric;
    vapiGetAvailableSections: typeof getAvailableSections;
  }
}

// Make functions available globally for Vapi to call
if (typeof window !== 'undefined') {
  window.vapiScrollToSection = scrollToSection;
  window.vapiGetCurrentSection = getCurrentSection;
  window.vapiScrollToContent = scrollToContent;
  window.vapiScrollToMetric = scrollToMetric;
  window.vapiGetAvailableSections = getAvailableSections;
}
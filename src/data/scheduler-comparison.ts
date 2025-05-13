export interface DesignComparison {
  id: string;
  title: string;
  description: string;
  wireframeImage: string;
  finalImage: string;
  hotspots: {
    id: string;
    x: number;
    y: number;
    title: string;
    description: string;
  }[];
}

export const schedulerComparisons: DesignComparison[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Evolution',
    description: 'The main dashboard evolved from a basic wireframe to a comprehensive view of scheduling status and key metrics.',
    wireframeImage: '/images/casestudy/scheduler/wireframe-dashboard.png',
    finalImage: '/images/casestudy/scheduler/dashboard.png',
    hotspots: [
      {
        id: 'metrics',
        x: 75,
        y: 20,
        title: 'Enhanced Metrics Display',
        description: 'Added visual metrics to quickly show scheduling status and completion rates.'
      },
      {
        id: 'navigation',
        x: 15,
        y: 30,
        title: 'Improved Navigation',
        description: 'Streamlined navigation with clear hierarchy and intuitive grouping.'
      },
      {
        id: 'actions',
        x: 85,
        y: 60,
        title: 'Quick Actions',
        description: 'Added prominent action buttons for common scheduling tasks.'
      }
    ]
  },
  {
    id: 'schedule-view',
    title: 'Schedule View Transformation',
    description: 'The schedule view was enhanced with better visualization and interaction patterns.',
    wireframeImage: '/images/casestudy/scheduler/wireframe-schedule.png',
    finalImage: '/images/casestudy/scheduler/schedule-view.png',
    hotspots: [
      {
        id: 'timeline',
        x: 50,
        y: 25,
        title: 'Interactive Timeline',
        description: 'Implemented a more intuitive timeline with drag-and-drop functionality.'
      },
      {
        id: 'filters',
        x: 20,
        y: 15,
        title: 'Advanced Filters',
        description: 'Added comprehensive filtering options for better schedule management.'
      },
      {
        id: 'conflicts',
        x: 80,
        y: 40,
        title: 'Conflict Resolution',
        description: 'Enhanced conflict visualization with clear indicators and resolution tools.'
      }
    ]
  }
]; 
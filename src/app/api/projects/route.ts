import { NextResponse } from 'next/server';
import { validateProjectQuery } from '../../../utils/api/validation';
import { log, LogLevel } from '../../../utils/api/logging';
import { projects, Project } from '../../../data/projects';

// Mark route as dynamic to prevent static generation errors
export const dynamic = "force-dynamic";

// Define the type for API response
type ProjectsAPIResponse = {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

/**
 * GET handler for the projects API
 */
export async function GET(request: Request) {
  try {
    // Get URL to extract query parameters
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    
    // Log incoming request
    log(LogLevel.DEBUG, 'Projects API request received', { 
      queryParams
    });
    
    // Validate query parameters
    const validation = validateProjectQuery(queryParams);
    
    if (!validation.valid) {
      log(LogLevel.WARN, 'Invalid project query parameters', { 
        errors: validation.errors 
      });
      
      return NextResponse.json({
        error: 'Invalid query parameters',
        details: validation.errors
      }, { status: 400 });
    }
    
    // Extract validated parameters with defaults
    const { 
      category, 
      featured,
      limit = 10,
      page = 1
    } = validation.params;
    
    // Filter projects based on query parameters
    let filteredProjects = [...projects];
    
    if (category) {
      filteredProjects = filteredProjects.filter(
        (project) => project.category === category
      );
    }
    
    if (featured !== undefined) {
      filteredProjects = filteredProjects.filter(
        (project) => project.featured === featured
      );
    }
    
    // Get total count before pagination
    const total = filteredProjects.length;
    
    // Calculate pagination
    const pageSize = limit;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Apply pagination
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    // Log successful response
    log(LogLevel.INFO, 'Projects API request successful', { 
      totalProjects: total,
      returnedProjects: paginatedProjects.length,
      page,
      totalPages
    });
    
    // Return the response
    return NextResponse.json<ProjectsAPIResponse>({
      projects: paginatedProjects,
      total,
      page,
      pageSize,
      totalPages
    }, { status: 200 });
    
  } catch (error) {
    // Log any unhandled errors
    log(LogLevel.ERROR, 'Unhandled error in projects API', {
      error: error instanceof Error ? error.message : String(error)
    });
    
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
} 
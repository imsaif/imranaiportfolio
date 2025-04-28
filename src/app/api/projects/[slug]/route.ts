import { NextResponse } from 'next/server';
import { validateProjectSlug } from '../../../../utils/api/validation';
import { log, LogLevel } from '../../../../utils/api/logging';
import { projects, Project } from '../../../../data/projects';

// Mark route as dynamic to prevent static generation errors
export const dynamic = "force-dynamic";

// Define the type for API response
type ProjectAPIResponse = {
  project: Project;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

/**
 * GET handler for retrieving a single project by slug
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Log incoming request
    log(LogLevel.DEBUG, 'Single project API request received', { 
      slug 
    });
    
    // Validate the project slug
    const validation = validateProjectSlug(slug);
    
    if (!validation.valid) {
      log(LogLevel.WARN, 'Invalid project slug format', { 
        slug,
        error: validation.error 
      });
      
      return NextResponse.json<ErrorResponse>({
        error: 'Invalid project slug format',
        details: validation.error
      }, { status: 400 });
    }
    
    // Find the project by slug
    const project = projects.find((p) => p.slug === slug);
    
    if (!project) {
      log(LogLevel.WARN, 'Project not found', { slug });
      
      return NextResponse.json<ErrorResponse>({
        error: 'Project not found'
      }, { status: 404 });
    }
    
    // Log successful response
    log(LogLevel.INFO, 'Single project API request successful', { 
      slug,
      projectTitle: project.title
    });
    
    // Return the project data
    return NextResponse.json<ProjectAPIResponse>({
      project
    }, { status: 200 });
    
  } catch (error) {
    // Log any unhandled errors
    log(LogLevel.ERROR, 'Unhandled error in single project API', {
      error: error instanceof Error ? error.message : String(error),
      params
    });
    
    return NextResponse.json<ErrorResponse>({
      error: 'Internal server error'
    }, { status: 500 });
  }
} 
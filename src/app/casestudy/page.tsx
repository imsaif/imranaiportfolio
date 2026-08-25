import { redirect } from 'next/navigation';

/**
 * /casestudy was a bare dev index that listed every case study plus a test
 * page, with no site chrome. It also linked the two unpublished studies, which
 * defeated the point of unpublishing them. The real index is /projects.
 */
export default function CaseStudyIndex() {
  redirect('/projects');
}

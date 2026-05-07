import { getProjects, createProject } from '@/actions/project'
import Link from 'next/link'

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Projects Dashboard</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Create Project Card */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>Create New Project</h3>
          <form action={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <input name="name" className="glass-input" placeholder="Project Name" required />
            <textarea name="description" className="glass-input" placeholder="Description" rows={3} style={{ resize: 'none' }} />
            <button type="submit" className="glass-button glass-button-primary" style={{ marginTop: 'auto' }}>
              Create Project
            </button>
          </form>
        </div>

        {/* Existing Projects */}
        {projects.map(project => (
          <Link href={`/project/${project.id}`} key={project.id} style={{ display: 'block' }}>
            <div className="glass-panel hover-lift" style={{ padding: '2rem', height: '100%' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{project.name}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>
                {project.description || 'No description'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
                <span className="glass-button" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                  {project._count.tasks} Tasks
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

import { getProjectById } from '@/actions/project'
import { createTask, updateTaskStatus } from '@/actions/task'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const project = await getProjectById(resolvedParams.id)

  if (!project) return notFound()

  const todoTasks = project.tasks.filter(t => t.status === 'TODO')
  const inProgressTasks = project.tasks.filter(t => t.status === 'IN_PROGRESS')
  const doneTasks = project.tasks.filter(t => t.status === 'DONE')

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Link href="/" className="glass-button">&larr; Back</Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{project.name}</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
      </header>

      {/* Task Creation Form */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Task</h3>
        <form action={createTask.bind(null, project.id)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input name="title" className="glass-input" placeholder="Task Title" required style={{ flex: '1 1 200px' }} />
          <input name="description" className="glass-input" placeholder="Task Description" style={{ flex: '2 1 300px' }} />
          <select name="priority" className="glass-input" style={{ flex: '0 1 150px' }}>
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM" selected>Medium Priority</option>
            <option value="HIGH">High Priority</option>
          </select>
          <button type="submit" className="glass-button glass-button-primary">Add Task</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* TODO Column */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>TODO ({todoTasks.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} projectId={project.id} />
            ))}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>IN PROGRESS ({inProgressTasks.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} projectId={project.id} />
            ))}
          </div>
        </div>

        {/* DONE Column */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--success-color)' }}>DONE ({doneTasks.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {doneTasks.map(task => (
              <TaskCard key={task.id} task={task} projectId={project.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, projectId }: { task: any, projectId: string }) {
  const priorityColor = task.priority === 'HIGH' ? 'var(--danger-color)' : task.priority === 'MEDIUM' ? 'var(--warning-color)' : 'var(--success-color)';

  return (
    <div className="glass-panel hover-lift" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h4 style={{ fontSize: '1.1rem' }}>{task.title}</h4>
        <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: priorityColor }}>
          {task.priority}
        </span>
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        {task.description}
      </p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {task.status !== 'TODO' && (
          <form action={updateTaskStatus.bind(null, task.id, 'TODO', projectId)} style={{ flex: 1 }}>
            <button className="glass-button" style={{ width: '100%', fontSize: '0.8rem', padding: '0.25rem' }}>TODO</button>
          </form>
        )}
        {task.status !== 'IN_PROGRESS' && (
          <form action={updateTaskStatus.bind(null, task.id, 'IN_PROGRESS', projectId)} style={{ flex: 1 }}>
            <button className="glass-button" style={{ width: '100%', fontSize: '0.8rem', padding: '0.25rem', color: 'var(--primary-color)' }}>IN PROG</button>
          </form>
        )}
        {task.status !== 'DONE' && (
          <form action={updateTaskStatus.bind(null, task.id, 'DONE', projectId)} style={{ flex: 1 }}>
            <button className="glass-button" style={{ width: '100%', fontSize: '0.8rem', padding: '0.25rem', color: 'var(--success-color)' }}>DONE</button>
          </form>
        )}
      </div>
    </div>
  )
}

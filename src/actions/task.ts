'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTask(projectId: string, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const priority = formData.get('priority') as string || 'MEDIUM'

  await prisma.task.create({
    data: {
      title,
      description,
      priority,
      projectId,
    }
  })

  revalidatePath(`/project/${projectId}`)
  revalidatePath('/')
}

export async function updateTaskStatus(taskId: string, status: string, projectId: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status }
  })

  revalidatePath(`/project/${projectId}`)
}

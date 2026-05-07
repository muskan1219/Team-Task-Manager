'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createProject(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  
  // For demo purposes, we will fetch the first user or create one
  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User',
      }
    })
  }

  await prisma.project.create({
    data: {
      name,
      description,
      ownerId: user.id
    }
  })

  revalidatePath('/')
}

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      _count: {
        select: { tasks: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

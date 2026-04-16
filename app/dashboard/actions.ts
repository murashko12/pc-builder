'use server'

import { prisma } from "@/lib/db";
import { Component, categoryIdToDbType } from "@/lib/types";

export type SaveBuildFromState = {
  status: 'idle' | 'success' | 'error',
  message?: string
}

export async function getComponentsByCategory(categoryId: string): Promise<Component[]> {
  const dbType = categoryIdToDbType[categoryId];
  
  if (!dbType) {
    return []
  }

  const components = await prisma.component.findMany({
    where: { type: dbType },
    orderBy: { price: 'asc' }
  })

  return components.map(component => ({
    id: component.id,
    type: component.type,
    name: component.name,
    price: component.price,
    socket: component.socket
  }))
}
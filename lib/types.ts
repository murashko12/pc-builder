export type ComponentCategory = {
  id: string;
  name: string;
  icon: string;
}

export type Component = {
  id: string;
  name: string;
  price: number;
  type: ComponentType;
  socket: string | null;
}

export type ComponentType = 'cpu' | 'gpu' | 'ram' | 'ssd' | 'psu' | 'case' | 'cooler' | 'motherboard'

export const categoryIdToDbType: Record<string, ComponentType> = {
  cpu: 'cpu',
  gpu: 'gpu',
  ram: 'ram',
  ssd: 'ssd',
  psu: 'psu',
  case: 'case',
  cooler: 'cooler',
  motherboard: 'motherboard'
}

export const dbTypeToCategoryId: Record<ComponentType, string> = {
  cpu: 'cpu',
  gpu: 'gpu',
  ram: 'ram',
  ssd: 'ssd',
  psu: 'psu',
  case: 'case',
  cooler: 'cooler',
  motherboard: 'motherboard'
}
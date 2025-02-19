export interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
  children: Menu[];
  createdAt: string;
  updatedAt: string;
} 
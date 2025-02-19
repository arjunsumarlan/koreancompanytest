import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllMenus() {
    // Using CTE (Common Table Expression) for recursive query with stable ordering
    const menus = await this.prisma.$queryRaw`
      WITH RECURSIVE MenuTree AS (
        -- Base case: get root menus
        SELECT 
          id,
          name,
          "parentId",
          depth,
          "createdAt",
          ARRAY["createdAt"::text] as path_order,
          CAST(name as VARCHAR(1000)) as path,
          ARRAY[id] as id_path,
          "createdAt" as root_created_at,
          "createdAt" as parent_created_at
        FROM "Menu"
        WHERE "parentId" IS NULL

        UNION ALL

        -- Recursive case: get children
        SELECT 
          m.id,
          m.name,
          m."parentId",
          m.depth,
          m."createdAt",
          mt.path_order || m."createdAt"::text,
          CAST(mt.path || ' > ' || m.name as VARCHAR(1000)),
          mt.id_path || m.id,
          mt.root_created_at,
          mt."createdAt"
        FROM "Menu" m
        INNER JOIN MenuTree mt ON m."parentId" = mt.id
      )
      SELECT 
        id,
        name,
        "parentId",
        depth,
        "createdAt",
        path,
        id_path
      FROM MenuTree
      ORDER BY 
        CASE WHEN "parentId" IS NULL THEN "createdAt" ELSE root_created_at END,
        parent_created_at,
        "createdAt";
    `;

    // Convert flat structure to tree structure
    const menuMap = new Map();
    const rootMenus = [];

    // First pass: Create all menu nodes
    for (const menu of menus as any[]) {
      menuMap.set(menu.id, {
        ...menu,
        children: [],
      });
    }

    // Second pass: Build the tree structure
    for (const menu of menus as any[]) {
      if (menu.parentId === null) {
        rootMenus.push(menuMap.get(menu.id));
      } else {
        const parentMenu = menuMap.get(menu.parentId);
        if (parentMenu) {
          parentMenu.children.push(menuMap.get(menu.id));
        }
      }
    }

    return rootMenus;
  }

  async getMenuById(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    });

    if (!menu) throw new NotFoundException(`Menu with ID ${id} not found`);
    return menu;
  }

  async createMenu(dto: CreateMenuDto) {
    const { parentId, name, depth = 0 } = dto;

    return this.prisma.menu.create({
      data: {
        name,
        depth,
        parentId,
      },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  async updateMenu(id: string, dto: UpdateMenuDto) {
    await this.getMenuById(id);

    return this.prisma.menu.update({
      where: { id },
      data: dto,
      include: {
        children: true,
        parent: true,
      },
    });
  }

  async deleteMenu(id: string) {
    await this.getMenuById(id);

    try {
      // Start a transaction
      return await this.prisma.$transaction(
        async (prisma) => {
          await this.deleteMenuAndChildren(id, prisma);
          return { success: true };
        },
        {
          timeout: 10000, // 10-second timeout
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      console.error('Failed to delete menu:', error);
      throw new Error(
        'Failed to delete menu and its children. All changes have been rolled back.',
      );
    }
  }

  private async deleteMenuAndChildren(
    menuId: string,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      // Delete all descendants in one query using CTE
      await prisma.$executeRaw`
        WITH RECURSIVE MenuToDelete AS (
          -- Base case: the menu we want to delete
          SELECT id FROM "Menu"
          WHERE id = ${menuId}

          UNION ALL

          -- Recursive case: all children of menus we're deleting
          SELECT m.id
          FROM "Menu" m
          INNER JOIN MenuToDelete mtd ON m."parentId" = mtd.id
        )
        DELETE FROM "Menu"
        WHERE id IN (SELECT id FROM MenuToDelete);
      `;
    } catch (error) {
      console.error(`Error deleting menu ${menuId}:`, error);
      throw error;
    }
  }
}

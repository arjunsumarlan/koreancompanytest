"use client";

import { MenuTree } from "@/components/MenuTree";
import { useGetMenusQuery } from "@/store/menuApi";
import { useState } from "react";
import { Menu } from "@/types/menu";

export default function Home() {
  const { data: menus, isLoading, error } = useGetMenusQuery();
  const [expandAll, setExpandAll] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const handleExpandAll = () => {
    setExpandAll(true);
  };

  const handleCollapseAll = () => {
    setExpandAll(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex">
      <div className="flex-1 p-8">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-semibold">Menus</h1>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <h5 className="text-gray-600 text-xs">Double click to edit</h5>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleExpandAll}
                className="bg-[#1A1D1F] text-white px-6 py-2.5 rounded-lg text-sm"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg text-sm"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">
                Error loading menus
              </div>
            ) : (
              <div className="space-y-2 pb-8">
                {menus?.map((menu) => (
                  <MenuTree
                    key={menu.id}
                    menu={menu}
                    depth={0}
                    isExpandAll={expandAll}
                    onSelectMenu={setSelectedMenu}
                    selectedMenuId={selectedMenu?.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMenu && (
        <div className="w-80 bg-white p-6 border-l border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Menu Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="text-gray-900">{selectedMenu.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Depth</label>
              <p className="text-gray-900">{selectedMenu.depth}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Parent Menu</label>
              <p className="text-gray-900">
                {selectedMenu.parentId || "Root Menu"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

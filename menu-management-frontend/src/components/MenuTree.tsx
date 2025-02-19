"use client";

import { useState, useEffect } from "react";
import { Menu } from "@/types/menu";
import {
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} from "@/store/menuApi";

interface MenuTreeProps {
  menu: Menu;
  depth: number;
  isExpandAll: boolean;
  onSelectMenu: (menu: Menu | null) => void;
  selectedMenuId?: string;
}

export function MenuTree({
  menu,
  depth,
  isExpandAll,
  onSelectMenu,
  selectedMenuId,
}: MenuTreeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [menuName, setMenuName] = useState(menu.name);
  const [createMenu] = useCreateMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  useEffect(() => {
    setIsExpanded(isExpandAll);
  }, [isExpandAll]);

  const handleAddSubmenu = async () => {
    const newName = prompt("Enter new menu name:");
    if (newName) {
      try {
        await createMenu({
          name: newName,
          parentId: menu.id,
          depth: depth + 1,
        }).unwrap();
      } catch (err) {
        console.error("Failed to create menu:", err);
        alert("Failed to create menu" + JSON.stringify(err));
      }
    }
  };

  const handleDeleteMenu = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this menu and all its children?"
      )
    ) {
      try {
        await deleteMenu(menu.id).unwrap();
        onSelectMenu(null);
      } catch (err) {
        console.error("Failed to delete menu:", err);
      }
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (menuName.trim() !== "") {
        try {
          await updateMenu({
            id: menu.id,
            name: menuName.trim(),
          }).unwrap();
          setIsEditing(false);
          onSelectMenu({ ...menu, name: menuName.trim() });
        } catch (err) {
          console.error("Failed to update menu:", err);
          setMenuName(menu.name);
        }
      }
    } else if (e.key === "Escape") {
      setMenuName(menu.name);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setMenuName(menu.name);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  return (
    <div className="relative">
      <div
        className={`flex justify-center group h-10 ${
          selectedMenuId === menu.id ? "bg-blue-50" : ""
        }`}
        onClick={() => onSelectMenu(menu)}
      >
        <div
          className="flex items-center"
          style={{ marginLeft: `${depth * 40}px` }}
        >
          {depth > 0 && (
            <div
              className="absolute h-full w-px bg-gray-200"
              style={{ left: `${depth * 40 - 20}px`, top: "10px" }}
            />
          )}
          {depth > 0 && (
            <div
              className="absolute w-[20px] h-px bg-gray-200"
              style={{ left: `${depth * 40 - 20}px`, top: "20px" }}
            />
          )}
          <div className="flex items-center gap-3">
            {menu.children?.length > 0 ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="cursor-pointer hover:bg-gray-100 rounded"
                style={{ marginBottom: "-4px" }}
              >
                <path
                  d={isExpanded ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className="w-5" />
            )}

            {isEditing ? (
              <input
                type="text"
                value={menuName}
                onChange={handleInputChange}
                onKeyDown={handleNameChange}
                onBlur={handleBlur}
                className="text-[16px] text-gray-900 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span
                className="text-[16px] text-gray-900"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleDoubleClick();
                }}
              >
                {menu.name}
              </span>
            )}

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.stopPropagation();
                handleAddSubmenu();
              }}
              className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ marginBottom: "-4px" }}
            >
              <circle cx="12" cy="12" r="10" fill="#2563EB" />
              <path
                d="M12 7V17M17 12H7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {menu.depth !== 0 && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMenu();
                }}
                className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ marginBottom: "-4px" }}
              >
                <circle cx="12" cy="12" r="10" fill="#EF4444" />
                <path
                  d="M8 8L16 16M16 8L8 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {isExpanded && menu.children?.length > 0 && (
        <div className="pt-2">
          {menu.children.map((child) => (
            <MenuTree
              key={child.id}
              menu={child}
              depth={depth + 1}
              isExpandAll={isExpandAll}
              onSelectMenu={onSelectMenu}
              selectedMenuId={selectedMenuId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

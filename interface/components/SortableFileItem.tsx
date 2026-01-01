"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React from "react"

interface SortableFileItemProps {
  id: string
  children: React.ReactNode
  className?: string
  onRemove?: (id: string) => void
}

export function SortableFileItem({ id, children, className }: SortableFileItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50" : ""} ${className ?? ""}`.trim()}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

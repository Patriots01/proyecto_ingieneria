"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton({ fallback = '/' }: { fallback?: string }) {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back()
        else router.push(fallback)
      }}
      className="btn btn-outline-secondary btn-sm mb-3"
    >
      ← Regresar
    </button>
  )
}

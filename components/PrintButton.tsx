"use client"
import React from 'react'

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn-cfe hover:opacity-95">
      Imprimir recibo
    </button>
  )
}

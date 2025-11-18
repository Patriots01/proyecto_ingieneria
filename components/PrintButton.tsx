"use client"
import React from 'react'

type Props = {
  targetId?: string
}

export default function PrintButton({ targetId }: Props) {
  function handlePrint() {
    try {
      if (!targetId) {
        ;(globalThis as any).print && (globalThis as any).print()
        return
      }

      const el = document.getElementById(targetId)
      if (!el) {
        ;(globalThis as any).print && (globalThis as any).print()
        return
      }

      // Add a class to body so CSS can hide everything except the receipt
      document.body.classList.add('printing')

      // Use onafterprint when available to remove the class; fallback to timeout
      const cleanup = () => {
        try { document.body.classList.remove('printing') } catch (e) {}
      }

      if ('onafterprint' in (globalThis as any)) {
        ;(globalThis as any).onafterprint = () => cleanup()
        ;(globalThis as any).print && (globalThis as any).print()
        // Some browsers may not call onafterprint reliably — still set a timeout
        setTimeout(cleanup, 1500)
      } else {
        ;(globalThis as any).print && (globalThis as any).print()
        setTimeout(cleanup, 1000)
      }
    } catch (e) {
      try { document.body.classList.remove('printing') } catch (err) {}
      ;(globalThis as any).print && (globalThis as any).print()
    }
  }

  return (
    <button onClick={handlePrint} className="btn-cfe hover:opacity-95">
      Imprimir recibo
    </button>
  )
}

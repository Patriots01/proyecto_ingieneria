"use client"
import React from 'react'

export default function ReceiptPrintButton() {
  function handlePrint() {
    try {
      window.print()
    } catch (e) {
      // ignore
    }
  }

  return (
    <button className="btn-cfe" onClick={handlePrint}>
      Imprimir
    </button>
  )
}

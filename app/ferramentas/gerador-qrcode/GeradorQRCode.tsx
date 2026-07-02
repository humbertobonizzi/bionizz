'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

type ErrorLevel = 'L' | 'M' | 'Q' | 'H'

export default function GeradorQRCode() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('M')
  const [color, setColor] = useState('#000000')
  const [generating, setGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQR = useCallback(async () => {
    if (!text.trim() || !canvasRef.current) return
    setGenerating(true)
    try {
      const QRCode = (await import('qrcode')).default
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        errorCorrectionLevel: errorLevel,
        color: { dark: color, light: '#FFFFFF' },
        margin: 2,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }, [text, size, errorLevel, color])

  useEffect(() => {
    if (text.trim()) {
      const timer = setTimeout(generateQR, 400)
      return () => clearTimeout(timer)
    }
  }, [text, size, errorLevel, color, generateQR])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Texto ou URL</label>
        <textarea
          className="tool-textarea"
          style={{ minHeight: 80 }}
          placeholder="https://exemplo.com.br ou qualquer texto..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Tamanho (px)</label>
          <select className="tool-input" value={size} onChange={(e) => setSize(Number(e.target.value))}>
            <option value={128}>128 × 128</option>
            <option value={256}>256 × 256</option>
            <option value={512}>512 × 512</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Correção de erros</label>
          <select
            className="tool-input"
            value={errorLevel}
            onChange={(e) => setErrorLevel(e.target.value as ErrorLevel)}
          >
            <option value="L">L — Baixa (7%)</option>
            <option value="M">M — Média (15%)</option>
            <option value="Q">Q — Alta (25%)</option>
            <option value="H">H — Máxima (30%)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Cor</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded border border-[#E2E6EF] cursor-pointer"
            />
            <input
              type="text"
              className="tool-input flex-1"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="border border-[#E2E6EF] rounded-xl p-4 bg-white inline-block">
          <canvas
            ref={canvasRef}
            className={`block ${!text.trim() ? 'opacity-30' : ''}`}
            style={{ width: Math.min(size, 300), height: Math.min(size, 300) }}
          />
          {!text.trim() && (
            <div className="absolute inset-0 flex items-center justify-center text-[#6B7280] text-sm pointer-events-none">
              QR Code aparecerá aqui
            </div>
          )}
        </div>
        {generating && <p className="text-xs text-[#6B7280]">Gerando...</p>}
        {text.trim() && !generating && (
          <button onClick={download} className="btn-primary">
            ⬇ Download PNG
          </button>
        )}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function CountdownStrip() {
  const [visible, setVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const getEndOfMonth = () => {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0)
    }

    const updateCountdown = () => {
      const now = new Date()
      const end = getEndOfMonth().getTime()
      const diff = end - now.getTime()

      const totalSeconds = Math.floor(diff / 1000)

      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown() // initial call
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div className="sticky top-0 bg-black text-white px-4 py-3 flex justify-center items-center relative z-50">
      <div className="flex-1 flex justify-center items-center gap-2 md:gap-4">
        <span className="font-medium text-base md:text-base whitespace-nowrap">June Release coming in:</span>
        <div className="flex items-center">
          <TimeUnit value={timeLeft.days} />
          <span className="mx-1 md:mx-2 text-white">:</span>
          <TimeUnit value={timeLeft.hours} />
          <span className="mx-1 md:mx-2 text-white">:</span>
          <TimeUnit value={timeLeft.minutes} />
          <span className="mx-1 md:mx-2 text-white">:</span>
          <TimeUnit value={timeLeft.seconds} />
        </div>
      </div>
      <button onClick={() => setVisible(false)} aria-label="Dismiss countdown" className="absolute right-3 p-1">
        <X className="w-4 h-4 text-white/80 hover:text-white" />
      </button>
    </div>
  )
}

function TimeUnit({ value }: { value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono font-bold text-base md:text-lg">{String(value).padStart(2, "0")}</span>
    </div>
  )
}

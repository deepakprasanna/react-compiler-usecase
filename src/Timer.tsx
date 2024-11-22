import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowPathIcon, ForwardIcon } from "@heroicons/react/24/outline"

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [currentCycle, setCurrentCycle] = useState(1)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
  }

  const nextCycle = () => {
    if (currentCycle < 4) {
      setCurrentCycle((prev) => prev + 1)
      resetTimer()
    } else {
      setCurrentCycle(1)
      resetTimer()
    }
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">
          Pomodoro Timer (Cycle {currentCycle}/4)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center space-x-2">
          <Button variant="outline" onClick={resetTimer} size="icon">
            <ArrowPathIcon className="h-4 w-4" />
          </Button>
          <Button onClick={toggleTimer}>
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="secondary" onClick={nextCycle} size="icon">
            <ForwardIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

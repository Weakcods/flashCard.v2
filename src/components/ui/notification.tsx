import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "./alert"

interface NotificationProps {
  message: string
}

export function Notification({ message }: NotificationProps) {
  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
} 
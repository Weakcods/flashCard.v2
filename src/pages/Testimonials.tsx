import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"
import { useIsMobile } from "@/hooks/use-mobile"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    feedback: "Absolutely love this product! It has transformed how we work.",
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    feedback: "The best solution I've found for our team's needs.",
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    feedback: "Intuitive interface and excellent customer support.",
    avatar: "/avatars/emma.jpg",
  },
  {
    name: "James Wilson",
    role: "CEO",
    feedback: "A game-changer for our business operations.",
    avatar: "/avatars/james.jpg",
  }
]

export function Testimonials() {
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentPage(prev => {
      if (direction === 'prev') {
        return prev === 0 ? totalPages - 1 : prev - 1
      }
      return (prev + 1) % totalPages
    })
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate('next'),
    onSwipedRight: () => navigate('prev'),
    trackMouse: true
  })

  return (
    <div className="py-12 px-4" {...swipeHandlers}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        
        <div className="relative">
          {!isMobile && (
            <>
              <button
                onClick={() => navigate('prev')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background shadow-lg hover:bg-muted"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate('next')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background shadow-lg hover:bg-muted"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="overflow-hidden px-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <Card className="h-full">
                    <CardHeader className="text-center">
                      <Avatar src={item.avatar} className="h-16 w-16 mx-auto mb-4" />
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center italic">"{item.feedback}"</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all ${
                  currentPage === index ? 'w-6 bg-primary' : 'w-2 bg-muted'
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
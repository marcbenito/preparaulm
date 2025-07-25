import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { BookOpen, ThumbsUp, ThumbsDown } from "@/components/ui/icons"
import { datadogRum } from "@datadog/browser-rum"
import { motion } from "framer-motion"


export function IsUseFull() {
    return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-1"
  >
     <div className="bg-cosmic-night border border-white/10 rounded-2xl p-8">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-main mb-4">
                ¿Te ha resultado útil esta información?
            </h2>
            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={() => {
                        console.log("Me ha resultado útil")
                        datadogRum.addAction('useful_content', {
                            feedback_type: 'positive'
                        })
                    }}
                    className="flex items-center justify-center w-12 h-12 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 active:animate-pulse"
                    aria-label="Me ha resultado útil"
                >
                    <ThumbsUp className="h-6 w-6" />
                </button>
                <button
                    onClick={() => {
                        datadogRum.addAction('useful_content', {
                            feedback_type: 'negative'
                        })
                    }}
                    className="flex items-center justify-center w-12 h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 active:animate-pulse"
                    aria-label="No me ha resultado útil"
                >
                    <ThumbsDown className="h-6 w-6" />
                </button>
            </div>
            <p className="text-secondary text-lg mb-6">
                Pon en práctica lo que has aprendido con nuestros tests
                adaptativos
            </p>
            <Link href="/test-ultraligero">
                <Button
                    variant="default"
                    size="lg"
                    className="text-lg px-8 py-4 rounded-xl"
                >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Comenzar Tests
                </Button>
            </Link>
        </div>
    </div>
    </motion.div>
}
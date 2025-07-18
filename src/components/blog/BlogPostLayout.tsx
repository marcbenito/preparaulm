"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, BookOpen } from "@/components/ui/icons"
import Link from "next/link"

interface BlogPostLayoutProps {
  children: React.ReactNode
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button
              variant="ghost"
              className="text-secondary hover:text-main hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al Blog
            </Button>
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden mb-12"
        >
          <div className="p-8">{children}</div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-1"
        >
          <div className="bg-cosmic-night rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-main mb-4">
                ¿Te ha resultado útil esta información?
              </h2>
              <p className="text-secondary text-lg mb-6">
                Pon en práctica lo que has aprendido con nuestros tests
                adaptativos
              </p>
              <Link href="/test-selection">
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
      </div>
    </div>
  )
}

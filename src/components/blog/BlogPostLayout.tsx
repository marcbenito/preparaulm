"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, BookOpen } from "@/components/ui/icons"
import Link from "next/link"
import { IsUseFull } from "../cta/IsUseFull"

interface BlogPostLayoutProps {
  children: React.ReactNode,
  title: string,
  description: string
}

export default function BlogPostLayout({ children, title, description }: BlogPostLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-8 md:py-16">
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
          className=""
        >   
          <h1 className="text-4xl md:text-5xl font-bold text-main mb-8">{title}</h1>
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-l-4 border-blue-500 rounded-r-lg p-6 mb-8">
          <p className="text-lg text-main leading-relaxed italic">
            {description}
          </p>
        </div>
          <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden mb-12">{children}</div>
        </motion.article>

       
          <IsUseFull />

      </div>
    </div>
  )
}

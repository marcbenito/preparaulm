"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import {
  Calendar,
  Clock,
  ArrowRight,
  User,
  BookOpen,
} from "@/components/ui/icons"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "¿Qué necesitas para ser piloto de ultraligero?",
    excerpt:
      "Descubre todos los requisitos, documentación y pasos necesarios para convertirte en piloto de ultraligero en España.",
    author: "Equipo AeroTest",
    date: "2024-03-15",
    readTime: "8 min",
    category: "Requisitos",
    slug: "que-necesitas-para-ser-piloto",
  },
  {
    id: 2,
    title: "Requisitos para presentarte al examen de ultraligero",
    excerpt:
      "Todo lo que debes saber sobre los requisitos específicos para poder presentarte al examen teórico oficial.",
    author: "Equipo AeroTest",
    date: "2024-03-12",
    readTime: "6 min",
    category: "Exámenes",
    slug: "requisitos-examen-ultraligero",
  },
  {
    id: 3,
    title: "¿Dónde puedo sacarme el título de piloto de ultraligero?",
    excerpt:
      "Guía completa sobre las escuelas de vuelo autorizadas y centros de formación donde puedes obtener tu licencia.",
    author: "Equipo AeroTest",
    date: "2024-03-10",
    readTime: "10 min",
    category: "Formación",
    slug: "donde-sacarme-titulo-ultraligero",
  },
  {
    id: 4,
    title: "Temario completo del examen de ultraligero",
    excerpt:
      "Desglose detallado de todas las materias y temas que debes estudiar para superar el examen teórico oficial.",
    author: "Equipo AeroTest",
    date: "2024-03-08",
    readTime: "12 min",
    category: "Temario",
    slug: "temario-examen-ultraligero",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-main mb-6"
        >
          Blog de AeroTest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-secondary"
        >
          Guías completas, consejos y recursos para tu formación como piloto de
          ultraligero
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/10 px-2 py-1 rounded-md">
                    <span className="text-tertiary text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-tertiary text-xs">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-main group-hover:text-secondary transition-colors mb-4 leading-tight">
                  {post.title}
                </h2>

                <p className="text-secondary mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-tertiary text-sm">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-tertiary group-hover:text-accent transition-colors">
                    <span className="text-sm">Leer más</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-1 mt-16"
      >
        <div className="bg-cosmic-night rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-main mb-4">
              ¿Listo para comenzar tu preparación?
            </h2>
            <p className="text-secondary text-lg mb-6">
              Pon en práctica todo lo que has aprendido con nuestros tests
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
  )
}

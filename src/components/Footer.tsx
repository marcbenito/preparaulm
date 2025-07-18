"use client"

import React from "react"
import Link from "next/link"
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Plane,
} from "@/components/ui/icons"

export default function Footer() {
  return (
    <footer className="container mx-auto px-6 py-12 border-t border-white/10 bg-transparent">
      <div className="text-center mb-16">
        <h3 className="text-white font-semibold text-xl mb-8">
          Conéctate con Nosotros
        </h3>
        <div className="flex justify-center space-x-8">
          <a
            href="#"
            className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all hover:scale-110 duration-300"
          >
            <Facebook className="h-7 w-7 text-blue-300" />
          </a>
          <a
            href="#"
            className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all hover:scale-110 duration-300"
          >
            <Twitter className="h-7 w-7 text-blue-300" />
          </a>
          <a
            href="#"
            className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all hover:scale-110 duration-300"
          >
            <Linkedin className="h-7 w-7 text-blue-300" />
          </a>
          <a
            href="#"
            className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all hover:scale-110 duration-300"
          >
            <Instagram className="h-7 w-7 text-blue-300" />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <Link
          href="/faqs-preguntas-frecuentes"
          className="text-blue-200 hover:text-white transition-colors text-lg"
        >
          Preguntas Frecuentes
        </Link>
        <Link
          prefetch={false}
          href="/privacy"
          className="text-blue-200 hover:text-white transition-colors text-lg"
        >
          Política de Privacidad
        </Link>
        <Link
          prefetch={false}
          href="/cookies"
          className="text-blue-200 hover:text-white transition-colors text-lg"
        >
          Política de Cookies
        </Link>
        <Link
          prefetch={false}
          href="/terms"
          className="text-blue-200 hover:text-white transition-colors text-lg"
        >
          Términos y Condiciones
        </Link>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Plane className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">aeroTests</span>
        </div>
        <p className="text-blue-200 text-base">
          © {new Date().getFullYear()} aeroTests. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}

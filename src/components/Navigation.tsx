"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { Menu } from "@/components/ui/icons/Menu"
import { Plane } from "@/components/ui/icons/Plane"
import { Users } from "@/components/ui/icons/Users"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { useAuth } from "@/context/auth-context"
import { useAuthModal } from "@/context/AuthModalContext"
import { createClient } from "@/utils/supabase/client"
import { LogoutUserUseCase } from "@/domain/use-cases/users/LogoutUser"
import { useRouter } from "next/navigation"

function Navigation() {
  const auth = useAuth()

  const { openLogin, openRegister } = useAuthModal()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const supabase = await createClient()
      const logoutUseCase = LogoutUserUseCase.create(supabase)
      await logoutUseCase.execute()
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Plane className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">PreparaUlm</span>
          </Link>

          <div className="hidden md:flex space-x-4">
            <Button
              variant="ghost"
              asChild
              className="text-white hover:text-blue-200"
            >
              <Link href="/test-ultraligero">Realizar test</Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="text-white hover:text-blue-200"
            >
              <Link href="/como-funciona">Cómo funciona</Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="text-white hover:text-blue-200"
            >
              <Link href="/blog">Blog</Link>
            </Button>

            {/* SECCIÓN PRECIOS COMENTADA TEMPORALMENTE */}
            {/*
            <Button
              variant="ghost"
              asChild
              className="text-white hover:text-blue-200"
            >
              <Link href="/pricing">Precios</Link>
            </Button>
            */}

            <Button
              variant="ghost"
              asChild
              className="text-white hover:text-blue-200"
            >
              <Link href="/about">Nosotros</Link>
            </Button>
            {auth.user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    asChild
                    className="text-white hover:text-blue-200"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="bg-white/10 text-white hover:bg-white/20 border-0"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {auth.user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full">
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20 border-0"
                onClick={() => openLogin()}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-gradient-to-br from-blue-900 to-indigo-900 border-l border-white/10"
              >
                <SheetHeader className="text-left mb-4">
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <SheetClose asChild>
                    <Link href="/test-ultraligero">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-blue-200 w-full justify-start"
                      >
                        Realizar test
                      </Button>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/como-funciona">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-blue-200 w-full justify-start"
                      >
                        Cómo funciona
                      </Button>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/blog">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-blue-200 w-full justify-start"
                      >
                        Blog
                      </Button>
                    </Link>
                  </SheetClose>

                  {/* SECCIÓN PRECIOS COMENTADA TEMPORALMENTE */}
                  {/*
                  <SheetClose asChild>
                    <Link href="/pricing">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-blue-200 w-full justify-start"
                      >
                        Precios
                      </Button>
                    </Link>
                  </SheetClose>
                  */}
                  <SheetClose asChild>
                    <Link href="/about">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-blue-200 w-full justify-start"
                      >
                        Nosotros
                      </Button>
                    </Link>
                  </SheetClose>
                  {auth.user ? (
                    <>
                      <SheetClose asChild>
                        <Link href="/dashboard">
                          <Button
                            variant="ghost"
                            className="text-white hover:text-blue-200 w-full justify-start"
                          >
                            Dashboard
                          </Button>
                        </Link>
                      </SheetClose>
                      <div className="py-2 px-4 text-white">
                        <p className="text-sm opacity-80">Conectado como:</p>
                        <p className="font-medium">{auth.user.email}</p>
                      </div>
                      <SheetClose asChild>
                        <Button variant="secondary" onClick={handleLogout}>
                          Cerrar sesión
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <div className="flex flex-col items-stretch space-y-2 px-4">
                      <SheetClose asChild>
                        <Button variant="secondary" onClick={() => openLogin()}>
                          Iniciar Sesión
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="link"
                          className="text-blue-300 hover:text-blue-200 px-1 self-center"
                          onClick={() => openRegister()}
                        >
                          ¿No tienes cuenta? Regístrate
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

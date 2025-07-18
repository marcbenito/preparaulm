import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components"

import * as React from "react"

export default function PasswordResetEmail({
  userName = "Usuario",
  resetLink = "https://www.aerotestulm.es/reset-password",
}) {
  const currentYear = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#1E1E2E",
          fontFamily: "Inter, Arial, sans-serif",
          color: "#FFFFFF",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
        >
          {/* Header */}
          <Section
            style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "20px",
              background:
                "linear-gradient(to bottom right, #1E3A8A, #581C87, #312E81)",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Heading
              style={{
                color: "#FFFFFF",
                fontSize: "28px",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              AeroTest
            </Heading>
          </Section>

          {/* Main Content */}
          <Section
            style={{
              backgroundColor: "#272734",
              padding: "32px",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Heading
              style={{
                color: "#FFFFFF",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Recuperación de Contraseña
            </Heading>
            <Text
              style={{
                color: "#DBEAFE",
                fontSize: "16px",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Hola {userName},
            </Text>
            <Text
              style={{
                color: "#DBEAFE",
                fontSize: "16px",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Hemos recibido una solicitud para restablecer tu contraseña en
              AeroTest ULM. Haz clic en el botón de abajo para crear una nueva
              contraseña.
            </Text>
            <Section style={{ textAlign: "center", marginBottom: "32px" }}>
              <Button
                href={resetLink}
                style={{
                  backgroundColor: "#3B82F6",
                  backgroundImage:
                    "linear-gradient(to right, #60A5FA, #22D3EE)",
                  color: "#FFFFFF",
                  padding: "14px 32px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-block",
                  fontSize: "16px",
                  textAlign: "center",
                  border: "none",
                }}
              >
                Restablecer Contraseña
              </Button>
            </Section>
            <Text
              style={{
                color: "#93C5FD",
                fontSize: "14px",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Si no solicitaste este cambio, por favor ignora este correo. El
              enlace de restablecimiento expirará en 24 horas.
            </Text>
            <Text
              style={{
                color: "#93C5FD",
                fontSize: "14px",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Si el botón no funciona, puedes copiar y pegar el siguiente enlace
              en tu navegador:
            </Text>
            <Text
              style={{
                color: "#60A5FA",
                fontSize: "14px",
                marginBottom: "24px",
                lineHeight: "1.5",
                wordBreak: "break-all",
              }}
            >
              {resetLink}
            </Text>
            <Hr style={{ borderColor: "#3B3B4F", margin: "24px 0" }} />
            <Text
              style={{
                color: "#93C5FD",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              © {currentYear} AeroTest ULM. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

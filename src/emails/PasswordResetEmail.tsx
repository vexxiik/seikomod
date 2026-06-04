import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailProps {
  resetUrl: string;
}

export const PasswordResetEmail = ({
  resetUrl,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Obnovení vašeho hesla - Vexx Watch Atelier</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Vexx Watch Atelier</Heading>
        <Text style={text}>
          Dobrý den,
        </Text>
        <Text style={text}>
          Obdrželi jsme žádost o obnovení hesla k vašemu účtu. Kliknutím na níže uvedené tlačítko si můžete nastavit nové heslo:
        </Text>
        <Section style={buttonContainer}>
          <Link href={resetUrl} style={button}>
            Nastavit nové heslo
          </Link>
        </Section>
        <Text style={text}>
          Tento odkaz je platný 1 hodinu. Pokud jste o změnu hesla nežádali, můžete tento e-mail bez obav ignorovat.
        </Text>
        <Text style={footer}>
          S pozdravem,<br />
          Tým Vexx Watch Atelier
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "8px",
  maxWidth: "600px",
};

const h1 = {
  color: "#0f172a",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 20px",
};

const text = {
  color: "#334155",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 20px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0f172a",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 24px",
  fontWeight: "bold",
};

const footer = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "40px",
};

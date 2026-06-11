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

interface RegistrationEmailProps {
  name: string;
  storeUrl: string;
}

export const RegistrationEmail = ({
  name,
  storeUrl,
}: RegistrationEmailProps) => (
  <Html>
    <Head />
    <Preview>Vítejte na Vexx Watch Atelier!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: "center", marginBottom: "24px" }}>
          <table align="center" width="48" cellPadding="0" cellSpacing="0" style={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <tr>
              <td height="48" align="center" valign="middle" style={{ backgroundColor: "#1a2b3c", borderRadius: "12px", fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "bold", color: "#fbbf24", width: "48px", lineHeight: "48px" }}>
                S
              </td>
            </tr>
          </table>
        </Section>
        <Heading style={h1}>Vítejte, {name}!</Heading>
        <Text style={text}>
          Děkujeme za registraci na Vexx Watch Atelier. Velmi si vážíme vaší důvěry a jsme nadšeni, že vás můžeme přivítat mezi našimi zákazníky.
        </Text>
        <Text style={text}>
          Jako poděkování a výhodu pro registrované uživatele nyní získáváte <strong>slevu 400 Kč na naši prémiovou dárkovou krabičku</strong> ke každé vaší objednávce.
        </Text>
        <Text style={text}>
          Pokud budete mít ohledně hodinek jakýkoliv dotaz, nebo byste si rádi nechali sestavit hodinky přímo na míru, neváhejte se na nás kdykoliv obrátit.
        </Text>
        <Section style={buttonContainer}>
          <Link href={storeUrl} style={button}>
            Prohlédnout katalog hodinek
          </Link>
        </Section>
        <Text style={footer}>
          S pozdravem,<br />
          Jakub - Vexx Watch Atelier
        </Text>
      </Container>
    </Body>
  </Html>
);

export default RegistrationEmail;

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

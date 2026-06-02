import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Column,
  Row,
} from "@react-email/components";
import * as React from "react";

interface AdminOrderNotificationProps {
  orderId: string;
  customerName: string;
  customerEmail: string;
  address: string;
  items: { name: string; quantity: number }[];
  total: number;
  packetaBranchName?: string;
}

export const AdminOrderNotification = ({
  orderId = "TEST",
  customerName = "Zákazník",
  customerEmail = "zakaznik@email.cz",
  address = "Adresa",
  items = [],
  total = 0,
  packetaBranchName = "",
}: AdminOrderNotificationProps) => (
  <Html>
    <Head />
    <Preview>Nová objednávka: {orderId.slice(-6).toUpperCase()} od {customerName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={logoText}>VEXX WATCH</Text>
          <Text style={logoSubtext}>SYSTEM</Text>
        </Section>
        
        <Section style={contentSection}>
          <Heading style={h1}>Máte novou objednávku!</Heading>
          <Text style={text}>
            Zákazník <span style={accentText}>{customerName}</span> ({customerEmail}) právě vytvořil objednávku č. <span style={accentText}>{orderId.slice(-6).toUpperCase()}</span>.
          </Text>
          
          <Section style={infoBox}>
            <Heading as="h3" style={h3}>Dodací údaje</Heading>
            <Hr style={hrDark} />
            <Text style={addressText}>{customerName}</Text>
            <Text style={addressText}>{address}</Text>
            <Text style={addressText}>{customerEmail}</Text>
            {packetaBranchName && (
              <Text style={packetaText}>Výdejní místo: {packetaBranchName}</Text>
            )}
          </Section>

          <Section style={orderBox}>
            <Heading as="h3" style={h3}>Položky k přípravě</Heading>
            <Hr style={hrDark} />
            
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column align="left">
                  <Text style={itemText}>
                    <span style={quantityText}>{item.quantity}x</span> {item.name}
                  </Text>
                </Column>
              </Row>
            ))}
            
            <Hr style={hrDark} />
            <Row>
              <Column align="left">
                <Text style={totalLabel}>Hodnota objednávky</Text>
              </Column>
              <Column align="right">
                <Text style={totalAmount}>{total.toLocaleString("cs-CZ")} Kč</Text>
              </Column>
            </Row>
          </Section>

          <Text style={textSmall}>
            Objednávku naleznete v administračním panelu e-shopu, kde jí můžete spravovat a měnit její stav.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#09090b", // zinc-950
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#18181b", // zinc-900
  border: "1px solid #27272a", // zinc-800
  borderRadius: "12px",
  margin: "0 auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const headerSection = {
  backgroundColor: "#09090b",
  padding: "40px 0 30px",
  textAlign: "center" as const,
  borderBottom: "1px solid #27272a",
};

const logoText = {
  color: "#fafafa",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "4px",
  margin: "0",
  lineHeight: "1",
};

const logoSubtext = {
  color: "#3b82f6", // blue admin accent
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "6px",
  margin: "8px 0 0 0",
};

const contentSection = {
  padding: "40px",
};

const h1 = {
  color: "#fafafa",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 24px",
  textAlign: "left" as const,
};

const text = {
  color: "#a1a1aa", // zinc-400
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 24px",
};

const accentText = {
  color: "#fafafa",
  fontWeight: "600",
};

const infoBox = {
  backgroundColor: "#09090b",
  border: "1px solid #27272a",
  borderRadius: "8px",
  padding: "24px 30px",
  marginBottom: "24px",
};

const addressText = {
  color: "#e4e4e7", // zinc-200
  fontSize: "15px",
  margin: "4px 0",
  lineHeight: "22px",
};

const packetaText = {
  color: "#10b981", // emerald-500
  fontSize: "15px",
  margin: "8px 0 4px",
  lineHeight: "22px",
  fontWeight: "600",
};

const orderBox = {
  backgroundColor: "#09090b",
  border: "1px solid #27272a",
  borderRadius: "8px",
  padding: "24px 30px",
  marginBottom: "32px",
};

const h3 = {
  color: "#fafafa",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0",
};

const hrDark = {
  borderColor: "#27272a",
  margin: "16px 0",
};

const itemRow = {
  marginBottom: "8px",
};

const itemText = {
  color: "#fafafa",
  fontSize: "15px",
  margin: "0",
};

const quantityText = {
  color: "#3b82f6", // admin blue accent
  marginRight: "8px",
};

const totalLabel = {
  color: "#fafafa",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const totalAmount = {
  color: "#fafafa",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
  textAlign: "right" as const,
};

const textSmall = {
  color: "#71717a", // zinc-500
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
};

export default AdminOrderNotification;

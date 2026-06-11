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

interface CustomerOrderReceiptProps {
  orderId: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  packetaBranchName?: string;
}

export const CustomerOrderReceipt = ({
  orderId = "TEST",
  customerName = "Zákazník",
  items = [],
  total = 0,
  packetaBranchName = "",
}: CustomerOrderReceiptProps) => (
  <Html>
    <Head />
    <Preview>Potvrzení objednávky - Vexx Watch Atelier</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <table align="center" width="48" cellPadding="0" cellSpacing="0" style={{ margin: "0 auto 16px auto", borderCollapse: "collapse" }}>
            <tr>
              <td height="48" align="center" valign="middle" style={{ backgroundColor: "#1a2b3c", borderRadius: "12px", fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "bold", color: "#fbbf24", width: "48px", lineHeight: "48px" }}>
                S
              </td>
            </tr>
          </table>
          <Text style={logoText}>VEXX WATCH</Text>
          <Text style={logoSubtext}>ATELIER</Text>
        </Section>
        
        <Section style={contentSection}>
          <Heading style={h1}>Děkujeme za objednávku</Heading>
          <Text style={text}>Ahoj {customerName},</Text>
          <Text style={text}>
            moc děkujeme za důvěru! Vaši objednávku č. <span style={accentText}>{orderId.slice(-6).toUpperCase()}</span> jsem v pořádku přijal. Hned jak to bude možné, pustím se do pečlivé kompletace.
          </Text>
          
          <Section style={orderBox}>
            <Heading as="h3" style={h3}>Shrnutí objednávky</Heading>
            <Hr style={hrDark} />
            
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column align="left">
                  <Text style={itemText}>
                    <span style={quantityText}>{item.quantity}x</span> {item.name}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={priceText}>
                    {(item.price * item.quantity).toLocaleString("cs-CZ")} Kč
                  </Text>
                </Column>
              </Row>
            ))}
            
            <Hr style={hrDark} />
            <Row>
              <Column align="left">
                <Text style={totalLabel}>Celkem k úhradě</Text>
              </Column>
              <Column align="right">
                <Text style={totalAmount}>{total.toLocaleString("cs-CZ")} Kč</Text>
              </Column>
            </Row>
            
            {packetaBranchName && (
              <>
                <Hr style={hrDark} />
                <Row>
                  <Column align="left">
                    <Text style={itemText}>Způsob doručení</Text>
                  </Column>
                  <Column align="right">
                    <Text style={packetaText}>Zásilkovna: {packetaBranchName}</Text>
                  </Column>
                </Row>
              </>
            )}
          </Section>

          <Text style={textSmall}>
            Toto je automatické potvrzení vaší objednávky. Pokud máte jakékoliv dotazy, neváhejte odpovědět na tento e-mail.
          </Text>
        </Section>
        
        <Section style={footerSection}>
          <Text style={footerText}>
            © {new Date().getFullYear()} Vexx Watch Atelier. Všechna práva vyhrazena.
          </Text>
          <Text style={footerDisclaimer}>
            Vexx Watch Atelier je nezávislý úpravce a není nijak spojen se značkou Seiko®.
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
  fontSize: "28px",
  fontWeight: "700",
  letterSpacing: "4px",
  margin: "0",
  lineHeight: "1",
};

const logoSubtext = {
  color: "#d4af37", // premium gold accent
  fontSize: "12px",
  fontWeight: "400",
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
  margin: "0 0 16px",
};

const accentText = {
  color: "#d4af37",
  fontWeight: "600",
  letterSpacing: "1px",
};

const orderBox = {
  backgroundColor: "#09090b",
  border: "1px solid #27272a",
  borderRadius: "8px",
  padding: "30px",
  marginTop: "32px",
  marginBottom: "32px",
};

const h3 = {
  color: "#fafafa",
  fontSize: "16px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0",
};

const hrDark = {
  borderColor: "#27272a",
  margin: "20px 0",
};

const itemRow = {
  marginBottom: "12px",
};

const itemText = {
  color: "#fafafa",
  fontSize: "15px",
  margin: "0",
};

const quantityText = {
  color: "#d4af37",
  marginRight: "8px",
};

const priceText = {
  color: "#fafafa",
  fontSize: "15px",
  margin: "0",
  textAlign: "right" as const,
};

const totalLabel = {
  color: "#fafafa",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0",
};

const totalAmount = {
  color: "#d4af37",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
  textAlign: "right" as const,
};

const packetaText = {
  color: "#10b981", // emerald-500
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
  textAlign: "right" as const,
};

const textSmall = {
  color: "#71717a", // zinc-500
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const footerSection = {
  backgroundColor: "#09090b",
  padding: "30px 40px",
  textAlign: "center" as const,
  borderTop: "1px solid #27272a",
};

const footerText = {
  color: "#71717a",
  fontSize: "12px",
  margin: "0 0 8px",
};

const footerDisclaimer = {
  color: "#52525b", // zinc-600
  fontSize: "11px",
  margin: "0",
};

export default CustomerOrderReceipt;

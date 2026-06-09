import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register font that supports Czech diacritics
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAw.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf', fontWeight: 700 },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col6: {
    width: '48%',
  },
  heading: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 4,
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  textLabel: {
    width: 100,
    color: '#666666',
  },
  textValue: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000000',
  },
  table: {
    marginTop: 20,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 8,
  },
  colProduct: { flex: 4 },
  colQty: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 2, textAlign: 'right' },
  colTotal: { flex: 2, textAlign: 'right' },
  totalsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalsBox: {
    width: 250,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#999999',
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
  }
});

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceCustomer {
  name: string;
  address: string;
  email: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  orderNumber: string;
  variableSymbol: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  total: number;
  paymentMethod: string;
}

interface InvoiceTemplateProps {
  data: InvoiceData;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ data }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('cs-CZ');
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('cs-CZ')} Kč`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Faktura - daňový doklad</Text>
            <Text style={{ fontSize: 16, color: '#666666' }}>č. {data.invoiceNumber}</Text>
          </View>
          <View style={[styles.headerRight, { justifyContent: 'center' }]}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: 'Times-Bold', fontSize: 22, color: '#1a2b3c', letterSpacing: 1 }}>VEXX WATCH</Text>
              <Text style={{ fontFamily: 'Times-Bold', fontSize: 16, color: '#fbbf24', letterSpacing: 3 }}>ATELIER</Text>
            </View>
          </View>
        </View>

        {/* Addresses */}
        <View style={[styles.row, styles.section]}>
          <View style={styles.col6}>
            <Text style={styles.heading}>Dodavatel</Text>
            <Text style={styles.bold}>Jakub Sokol</Text>
            <Text>Sportovní 158</Text>
            <Text>Staré Hradiště 533 52</Text>
            <Text>Česká republika</Text>
            <Text style={{ marginTop: 10 }}>IČO: Zpracovává se</Text>
            <Text>Nejsem plátce DPH</Text>
          </View>

          <View style={styles.col6}>
            <Text style={styles.heading}>Odběratel</Text>
            <Text style={styles.bold}>{data.customer.name}</Text>
            {data.customer.address.split(',').map((line, i) => (
              <Text key={i}>{line.trim()}</Text>
            ))}
            <Text style={{ marginTop: 10 }}>{data.customer.email}</Text>
          </View>
        </View>

        {/* Payment & Dates Info */}
        <View style={[styles.row, styles.section]}>
          <View style={styles.col6}>
            <Text style={styles.heading}>Platební údaje</Text>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Způsob úhrady:</Text>
              <Text style={styles.textValue}>{data.paymentMethod}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Číslo účtu:</Text>
              <Text style={[styles.textValue, styles.bold]}>CZ49 5500 0000 0037 9555 2004</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Banka:</Text>
              <Text style={styles.textValue}>Raiffeisenbank a.s.</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Variabilní symbol:</Text>
              <Text style={[styles.textValue, styles.bold]}>{data.variableSymbol}</Text>
            </View>
          </View>

          <View style={styles.col6}>
            <Text style={styles.heading}>Datumy</Text>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Datum vystavení:</Text>
              <Text style={styles.textValue}>{formatDate(data.issueDate)}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Datum splatnosti:</Text>
              <Text style={[styles.textValue, styles.bold]}>{formatDate(data.dueDate)}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>Číslo objednávky:</Text>
              <Text style={styles.textValue}>{data.orderNumber}</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colProduct}>Položka</Text>
            <Text style={styles.colQty}>Množství</Text>
            <Text style={styles.colPrice}>Cena za ks</Text>
            <Text style={styles.colTotal}>Celkem</Text>
          </View>
          
          {data.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colProduct}>{item.name}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.price)}</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            <View style={styles.grandTotal}>
              <Text>Celkem k úhradě:</Text>
              <Text>{formatCurrency(data.total)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Děkujeme za váš nákup! V případě dotazů nás kontaktujte na e-mailu. Faktura slouží jako doklad o koupi a potvrzení o zaplacení.
        </Text>
      </Page>
    </Document>
  );
};

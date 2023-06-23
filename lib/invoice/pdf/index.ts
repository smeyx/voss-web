//TODO: make this more flexible
//TODO: consistency for y positions
import { Invoice } from '@models/invoice/invoice.types';
import { Person, Position } from '../types/person';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import mustache from 'mustache';
import { Customer } from '@models/customer';

export type InvoiceElements = {
  title: string,
  invoiceText: Array<string>,
}

export type Margin = {
  top: number,
  bottom: number,
  left: number,
  right: number,
}

export type VossConfig = {
  invoiceNr: string,
  invoiceElements?: InvoiceElements | null,
  font?: string,
}

export class InvoiceDocument {
  doc: jsPDF;
  width: number;
  height: number;
  margin: Margin;
  maxWidth: number = 0;
  seller!: Person;
  buyer!: Customer;
  positions!: Position[];
  lineCount: number = 1;
  lineHeight: number = 4.5;
  invoice: Invoice;
  today: Date = new Date();
  invoiceElements!: InvoiceElements;

  constructor(invoice: Invoice) {
    this.doc = new jsPDF({ format: 'a4' });
    this.invoice = invoice;
    //TODO: change font?
    this.doc.setFont('Helvetica');
    this.width = this.doc.internal.pageSize.getWidth();
    this.height = this.doc.internal.pageSize.getHeight();
    //TODO: rethink right margin. make it optional
    this.margin = { top: 24, left: 25, right: (this.width - 25), bottom: (this.height - 30) };

    this.maxWidth = (this.width - this.margin.left * 2);
  }

  nextLine(yPosition?: number): number {
    return (yPosition ? yPosition : this.margin.top) + (this.lineHeight * ++this.lineCount)
  }

  create(): jsPDF {
    this.createHeader();
    this.createBody();
    this.createFooter();

    return this.doc;
  }

  createHeader(): void {
    this.createSellerBlock();

    this.doc.setFontSize(10)
      .text(`${this.buyer.name}`, this.margin.left, this.nextLine())
      .text(`${this.buyer.address.street} ${this.buyer.address.housenumber}`, this.margin.left, this.nextLine())
      .text('', this.margin.left, this.nextLine())
      .text(`${this.buyer.address.postalcode} ${this.buyer.address.city}`, this.margin.left, this.nextLine())

    this.lineCount += 3;
    this.doc.text(`Datum: ${this.today.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}`, this.margin.right, this.nextLine(), { align: 'right' });

    this.doc.text(`Rechnungs-Nr.: ${this.invoiceNr}`, this.margin.right, this.nextLine(), { align: 'right' });
    this.lineCount += 2;
  }

  createSellerBlock() {
    this.doc.setFontSize(11)
      .text(`${this.seller.name}`, this.margin.right, this.margin.top, { align: 'right' })

      .setFontSize(10)
      .text(`${this.seller.address.street} ${this.seller.address.nr}`, this.margin.right, this.margin.top + this.lineHeight, { align: 'right' })
      .text(`${this.seller.address.code} ${this.seller.address.city}`, this.margin.right, this.nextLine(), { align: 'right' })
      .text(`Tel.: ${this.seller.phone}`, this.margin.right, this.nextLine(), { align: 'right' })
      .text(`E-Mail: ${this.seller.email}`, this.margin.right, this.nextLine(), { align: 'right' });

    this.lineCount += 1;
    const yPos = this.nextLine();
    const sellerLetterCoverText = `${this.seller.name} \u2013 ${this.seller.address.street} ${this.seller.address.nr} \u2013 ${this.seller.address.code} ${this.seller.address.city}`;
    this.doc.setFontSize(7.5)
      .text(sellerLetterCoverText, this.margin.left, yPos)
      .line(this.margin.left, yPos + 0.5, 25.5 + this.doc.getTextWidth(sellerLetterCoverText), yPos + 0.5)
      .text('', this.margin.left, this.nextLine());
  }

  createBody(): void {
    this.lineCount++;
    this.doc.setFontSize(18)
      .setFont('Helvetica', 'Bold')
      .text('Rechnung', this.margin.left, this.nextLine())

    this.lineCount++;

    let yPos = this.nextLine();
    let finalY = 0;
    let invoicePositions: Array<string[]> = this.invoice.positions.map((p, k) => {
      //elements have to be strings for autoTable
      return [
        `${k}`,
        `${p.name}`,
        `${p.price}`,
        `${p.amount}`,
        `${parseFloat(p.price) * p.amount}`,];
    });

    autoTable(this.doc, {
      head: [['Pos.', 'Beschreibung', 'Einzelpreis', 'Anzahl', 'Gesamtpreis']],
      body: invoicePositions,
      theme: 'plain',
      styles: {
        lineWidth: 0.1,
        lineColor: 175,
        halign: 'center',
      },
      //TODO: margin.right = nonsense in this case. rethink
      margin: { top: yPos, left: this.margin.left, right: 25 },
    });

    // reset lineCount after table is drawn
    // ignore this because autoTable adds lastAutoTable to doc
    // @ts-ignore
    let yPosition: number = this.doc.lastAutoTable.finalY - 5;
    this.lineCount = 2;
    const lineCoords: number = this.nextLine(yPosition);
    this.doc.setFontSize(10)
      .setFont('Helvetica', 'Bold')
      .text('Gesamtbetrag', this.margin.left, lineCoords)
      .text(`${this.positions.reduce((sum: number, cur: Position): number => sum += cur.price, 0).toFixed(2).replace('.', ',')} €`, this.margin.right, lineCoords, { align: 'right' });

    const firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
    const lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

    const mustacheData = {
      street: this.seller.address.street,
      nr: this.seller.address.nr,
      code: this.seller.address.code,
      city: this.seller.address.city,
      firstDay: firstDay,
      lastDay: lastDay,
    }

    this.lineCount += 2;
    this.doc.setFontSize(10)
      .setFont('Helvetica', '');

    // add dynamic invoice elements TODO
    if (this.invoiceElements) {
      this.invoiceElements.invoiceText.forEach((v: string) => {
        this.doc.text(mustache.render(v, mustacheData), this.margin.left, this.nextLine(yPosition), { maxWidth: this.maxWidth, lineHeightFactor: 1.3 });

        //skip lines if text renders multiple lines because it exceeds max width
        let textWidth: number = this.doc.getTextWidth(v);
        if (textWidth > this.maxWidth) {
          this.lineCount += (Math.round(textWidth / this.maxWidth));
        }
      });
    }

    // .text('Miete für Wohnung Auf dem Berge 17, 27404 Nartum.', this.margin.left, this.nextLine(yPosition))
    // .text(`Rechnung für den Zeitraum ${ firstDay } bis ${ lastDay }. Das Leistungsdatum entspricht dem Rechnungsdatum.`, this.margin.left, this.nextLine(yPosition), { maxWidth: this.maxWidth, lineHeightFactor: 1.3 });

    this.lineCount += 1;
    if (this.invoice.noVATClause) {
      this.doc.text('Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer ausgewiesen.', this.margin.left, this.nextLine(yPosition));
    }
  }

  createFooter(): void {
    this.lineCount = 0;
    this.lineHeight = 4;
    this.doc.setFontSize(9)
      .line(this.margin.left, this.margin.bottom - 5, this.margin.left + 35, this.margin.bottom - 5)
      .text('Bankverbindung', this.margin.left, this.margin.bottom);

    let yPos = this.nextLine(this.margin.bottom);
    this.doc.text(`${this.seller.creditInstitute}`, this.margin.left, yPos)
      .text(`Steuernummer: ${this.seller.vat}`, this.margin.right, yPos, { align: 'right' })
      .text(`IBAN: ${this.seller.iban}`, this.margin.left, this.nextLine(this.margin.bottom))
      .text(`BIC: ${this.seller.bic}`, this.margin.left, this.nextLine(this.margin.bottom));
  }
}

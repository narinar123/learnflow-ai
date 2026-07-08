// ─── Export Utilities: PDF & CSV ─────────────────────────────────────────────

/**
 * Trigger browser print dialog with analytics print styles applied.
 */
export function exportToPDF(title?: string) {
  if (typeof window === 'undefined') return;
  const prevTitle = document.title;
  if (title) document.title = title;
  window.print();
  if (title) document.title = prevTitle;
}

/**
 * Convert an array of objects to a CSV string and trigger download.
 */
export function exportToCSV(data: Record<string, unknown>[], filename = 'report.csv') {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h];
      const str = val === null || val === undefined ? '' : String(val);
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    }).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  downloadBlob(csv, filename, 'text/csv;charset=utf-8;');
}

/**
 * Convert array of objects to a minimal Excel-compatible XML file (.xls) and download.
 */
export function exportToExcel(data: Record<string, unknown>[], filename = 'report.xls', sheetName = 'Sheet1') {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);

  const styleXml = `
    <Style ss:ID="Header">
      <Font ss:Bold="1" ss:Color="#FFFFFF" ss:Size="11"/>
      <Interior ss:Color="#6C47FF" ss:Pattern="Solid"/>
      <Alignment ss:Horizontal="Center"/>
    </Style>
    <Style ss:ID="Row">
      <Font ss:Size="10"/>
      <Alignment ss:Horizontal="Left"/>
    </Style>
  `;

  const headerRow = headers.map(h => `<Cell ss:StyleID="Header"><Data ss:Type="String">${escapeXml(h)}</Data></Cell>`).join('');
  const dataRows = data.map(row =>
    `<Row>${headers.map(h => {
      const val = row[h];
      const str = val === null || val === undefined ? '' : String(val);
      const isNum = !isNaN(Number(str.replace(/[$,%]/g, ''))) && str.trim() !== '';
      return `<Cell ss:StyleID="Row"><Data ss:Type="${isNum ? 'Number' : 'String'}">${escapeXml(str)}</Data></Cell>`;
    }).join('')}</Row>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>${styleXml}</Styles>
  <Worksheet ss:Name="${escapeXml(sheetName)}">
    <Table>
      <Row>${headerRow}</Row>
      ${dataRows}
    </Table>
  </Worksheet>
</Workbook>`;
  downloadBlob(xml, filename, 'application/vnd.ms-excel');
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob(['\uFEFF' + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Format a number with K/M/B suffix.
 */
export function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/**
 * Format currency USD.
 */
export function formatCurrency(n: number, compact = false): string {
  if (compact) return `$${formatCompact(n)}`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

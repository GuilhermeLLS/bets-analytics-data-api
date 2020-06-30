import { GoogleSpreadsheet } from "google-spreadsheet"
import credentials from "../../creds/client_secret.json"
// esports general assertivity
// TODO esports divided by game assertivity
// galgos assertivity
// TODO corners assertivity (but how to calculate this) => group by event name
// total gains
// gains per day (bar chart)
// gains by category

export const handleSheetsData = async (id: string) => {
    const rows = await getSheetRows(id)
    const eSports = eSportsData(rows)
    const overall = overallData(rows)
    const galgos = galgosData(rows)
    return {
        eSports,
        overall,
        galgos
    }
}

const getSheetRows = async (id: string) => {
    const doc = await connectToSheet(id)
    const sheet = doc.sheetsByIndex[1]
    const rows = await sheet.getRows()
    return rows.filter(r => r.Mercado)
}

const connectToSheet = async (id: string) => {
    const doc = new GoogleSpreadsheet(id)
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    return doc
}

const galgosData = (rows) => {
    const galgosRows = rows.filter(row => /Galgos/i.test(row.Mercado))
    const greens = galgosRows.filter(r => r.Resultado === "Green")
    const galgosAssertivity = (greens.length / galgosRows.length).toFixed(2).toString() + "%"
    return {
        galgosAssertivity: galgosAssertivity
    }
}

const basketballData = (rows) => {
    const basketballRows = rows.filter(row => /Basquete/i.test(row.Mercado))
    const greens = basketballRows.filter(r => r.Resultado === "Green")
    const basketballAssertivity = (greens.length / basketballRows.length).toFixed(2).toString() + "%"
    return {
        basketballAssertivity: basketballAssertivity
    }
}

const eSportsData = (rows) => {
    const eSportsRows = rows.filter(row => /Esportes Eletrônicos/i.test(row.Mercado))
    const greens = eSportsRows.filter(r => r.Resultado === "Green")
    const eSportsAssertivity = (greens.length / eSportsRows.length).toFixed(2).toString() + "%"
    return {
        eSportsAssertivity: eSportsAssertivity
    }
}

const overallData = (rows) => {
    console.log((rows[0]))
    const startedWith = rows[0]["Banca Final"].replace(/R\$ /, "").replace(",", ".")
    const endedWith = rows[rows.length - 1]["Banca Final"].replace(/R\$ /, "").replace(",", ".")
    const overallGains = Number(endedWith) - Number(startedWith)
    const overallGreens = rows.filter(r => r.Resultado === "Green")
    const overallReds = rows.filter(r => r.Resultado === "Red")
    const overallCashouts = rows.filter(r => r.Resultado === "Cashout")
    const overallAssertivity = overallGreens.length / (rows.length - overallCashouts.length)
    return {
        overallAssertivity: overallAssertivity,
        overallGains: overallGains
    }
} 

// TODO create types file
// GoogleSpreadsheetRow {
//   _sheet: GoogleSpreadsheetWorksheet {
//     _spreadsheet: GoogleSpreadsheet {
//       spreadsheetId: '1mdtrNOavJWm-DOopYIo4jvFaburX1LmTLj3XMrbaVcA',
//       authMode: 'JWT',
//       _rawSheets: [Object],
//       _rawProperties: [Object],
//       axios: [Function],
//       jwtClient: [JWT]
//     },
//     _rawProperties: {
//       sheetId: 0,
//       title: 'Entradas',
//       index: 1,
//       sheetType: 'GRID',
//       gridProperties: [Object]
//     },
//     _cells: [],
//     _rowMetadata: [],
//     _columnMetadata: [],
//     headerValues: [
//       '#',
//       'Data',
//       'Nome da Entrada',
//       'Mercado',
//       'Odd',
//       'Investido',
//       '% Investimento',
//       'Resultado',
//       'Retorno',
//       'Banca Final'
//     ]
//   },
//   _rowNumber: 2,
//   _rawData: [
//     '1',
//     '04/06',
//     'Forze vs OG',
//     'Esportes Eletrônicos',
//     '1,830',
//     'R$ 5,00',
//     '1,00%',
//     'Red',
//     'R$ 0,00',
//     'R$ 494,21'
//   ],
//   '#': [Getter/Setter],
//   Data: [Getter/Setter],
//   'Nome da Entrada': [Getter/Setter],
//   Mercado: [Getter/Setter],
//   Odd: [Getter/Setter],
//   Investido: [Getter/Setter],
//   '% Investimento': [Getter/Setter],
//   Resultado: [Getter/Setter],
//   Retorno: [Getter/Setter],
//   'Banca Final': [Getter/Setter]
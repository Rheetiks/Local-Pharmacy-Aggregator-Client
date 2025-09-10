import { useMemo } from 'react'
import { Box, Card, CardContent, Grid, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material'

const ITEMS = [
  { sku: 'PCM650', name: 'Paracetamol 650mg', current: 120, leadTimeDays: 3, dailyDemand: 25 },
  { sku: 'IBU400', name: 'Ibuprofen 400mg', current: 60, leadTimeDays: 5, dailyDemand: 15 },
  { sku: 'AMOX500', name: 'Amoxicillin 500mg', current: 45, leadTimeDays: 7, dailyDemand: 12 },
  { sku: 'AZI500', name: 'Azithromycin 500mg', current: 30, leadTimeDays: 6, dailyDemand: 9 },
]

export default function StockEstimationPage() {
  const rows = useMemo(() => ITEMS.map(i => {
    const leadTimeDemand = i.leadTimeDays * i.dailyDemand
    const safetyStock = Math.round(0.5 * leadTimeDemand)
    const reorderPoint = leadTimeDemand + safetyStock
    const status = i.current <= reorderPoint ? 'Reorder' : 'OK'
    const daysOfStock = Math.round(i.current / i.dailyDemand)
    return { ...i, leadTimeDemand, safetyStock, reorderPoint, status, daysOfStock }
  }), [])

  const kpis = useMemo(() => {
    const totalSkus = rows.length
    const toReorder = rows.filter(r => r.status === 'Reorder').length
    const avgDays = Math.round(rows.reduce((s, r) => s + r.daysOfStock, 0) / rows.length)
    return { totalSkus, toReorder, avgDays }
  }, [rows])

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>Stock Estimation</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Static demo: computed reorder point (lead time demand + safety stock) and days of stock.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">SKUs</Typography>
              <Typography variant="h4">{kpis.totalSkus}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">To Reorder</Typography>
              <Typography variant="h4">{kpis.toReorder}</Typography>
              <Box sx={{ mt: 1 }}>
                <LinearProgress variant="determinate" value={(kpis.toReorder / kpis.totalSkus) * 100} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">Avg Days of Stock</Typography>
              <Typography variant="h4">{kpis.avgDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Card} elevation={3} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="right">Current</TableCell>
              <TableCell align="right">Daily Demand</TableCell>
              <TableCell align="right">Lead Time (d)</TableCell>
              <TableCell align="right">Lead Time Demand</TableCell>
              <TableCell align="right">Safety Stock</TableCell>
              <TableCell align="right">Reorder Point</TableCell>
              <TableCell align="right">Days of Stock</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.sku} hover>
                <TableCell>{r.sku}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell align="right">{r.current}</TableCell>
                <TableCell align="right">{r.dailyDemand}</TableCell>
                <TableCell align="right">{r.leadTimeDays}</TableCell>
                <TableCell align="right">{r.leadTimeDemand}</TableCell>
                <TableCell align="right">{r.safetyStock}</TableCell>
                <TableCell align="right">{r.reorderPoint}</TableCell>
                <TableCell align="right">{r.daysOfStock}</TableCell>
                <TableCell align="center">
                  <Chip size="small" color={r.status === 'Reorder' ? 'secondary' : 'success'} label={r.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}



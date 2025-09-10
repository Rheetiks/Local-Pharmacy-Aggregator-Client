import { useState } from 'react'
import { Box, Card, CardContent, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Alert, CircularProgress, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function StockEstimationPage() {
  const [uploadedData, setUploadedData] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload only .xlsx or .xls files')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      setIsUploading(true)
      setUploadError('')
       const response = await fetch('http://essentials-temp-3kuty0-56d2bf-46-202-152-148.traefik.me/predict-stock', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Upload failed (${response.status})`)
      }

      const data = await response.json()
      setUploadedData(data)
    } catch (error) {
      setUploadError(error.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>Stock Estimation</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Upload an Excel file (.xlsx/.xls) to get AI-powered stock predictions.
      </Typography>

      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Upload Excel File</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Choose File'}
              <input
                type="file"
                hidden
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
            </Button>
            {isUploading && <CircularProgress size={20} />}
          </Box>
          {uploadError && (
            <Alert severity="error" sx={{ mt: 2 }}>{uploadError}</Alert>
          )}
        </CardContent>
      </Card>


      <TableContainer component={Paper} elevation={3} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Medicine</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Current Stock</TableCell>
              <TableCell align="right">Daily Demand</TableCell>
              <TableCell align="right">Days of Stock</TableCell>
              <TableCell align="right">Reorder Point</TableCell>
              <TableCell align="right">Reorder Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Urgency</TableCell>
              <TableCell align="center">Needs Reorder</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Upload an Excel file to see stock predictions
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              uploadedData.map((r, idx) => (
                <TableRow key={r.medicine_name || idx} hover>
                  <TableCell>{r.medicine_name}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell align="right">{r.current_stock}</TableCell>
                  <TableCell align="right">{r.daily_demand_estimate}</TableCell>
                  <TableCell align="right">{r.days_of_stock}</TableCell>
                  <TableCell align="right">{r.reorder_point}</TableCell>
                  <TableCell align="right">{r.reorder_quantity}</TableCell>
                  <TableCell align="right">₹{r.price}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      size="small" 
                      color={
                        r.urgency === 'Critical' ? 'error' : 
                        r.urgency === 'High' ? 'warning' : 
                        r.urgency === 'Medium' ? 'info' : 'default'
                      } 
                      label={r.urgency} 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      size="small" 
                      color={r.needs_reorder ? 'error' : 'success'} 
                      label={r.needs_reorder ? 'Yes' : 'No'} 
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}



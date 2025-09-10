import { useEffect, useMemo, useState } from 'react'
import { Box, Card, CardContent, Grid, TextField, Typography, Chip, CircularProgress, Alert, List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete } from '@mui/material'
import LocalPharmacyOutlinedIcon from '@mui/icons-material/LocalPharmacyOutlined'

const BASE_URL = 'http://localhost:5000'

export default function AlternateDrugPage() {
  const [allMedicines, setAllMedicines] = useState([])
  const [isLoadingMedicines, setIsLoadingMedicines] = useState(false)
  const [loadMedicinesError, setLoadMedicinesError] = useState('')

  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [recommendError, setRecommendError] = useState('')
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    let isActive = true
    async function fetchMedicines() {
      try {
        setIsLoadingMedicines(true)
        setLoadMedicinesError('')
        const response = await fetch(`${BASE_URL}/medicines`)
        if (!response.ok) throw new Error(`Failed to load medicines (${response.status})`)
        const data = await response.json()
        if (isActive) setAllMedicines(Array.isArray(data?.medicines) ? data.medicines : [])
      } catch (error) {
        if (isActive) setLoadMedicinesError(error?.message || 'Unable to load medicines')
      } finally {
        if (isActive) setIsLoadingMedicines(false)
      }
    }
    fetchMedicines()
    return () => { isActive = false }
  }, [])

  useEffect(() => {
    let isActive = true
    async function fetchRecommendations(medicineName) {
      try {
        setIsLoadingRecommendations(true)
        setRecommendError('')
        setRecommendations([])
        const response = await fetch(`${BASE_URL}/recommend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medicine: medicineName })
        })
        if (!response.ok) throw new Error(`Failed to get recommendations (${response.status})`)
        const data = await response.json()
        if (isActive) setRecommendations(Array.isArray(data?.recommendations) ? data.recommendations : [])
      } catch (error) {
        if (isActive) setRecommendError(error?.message || 'Unable to get recommendations')
      } finally {
        if (isActive) setIsLoadingRecommendations(false)
      }
    }
    if (selectedMedicine) fetchRecommendations(selectedMedicine)
    return () => { isActive = false }
  }, [selectedMedicine])

  const popular = useMemo(() => allMedicines.slice(0, 8), [allMedicines])

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>Find Drug Alternatives</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Select a brand from the list to explore therapeutically similar options.
      </Typography>

      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={10} sx={{width:'100%'}}>
              <Autocomplete
                sx={{ width: '100%', minWidth: { xs: '100%', sm: 420, md: 560 } }}
                loading={isLoadingMedicines}
                options={allMedicines}
                value={selectedMedicine}
                onChange={(_, value) => {
                  if (value == null) {
                    setSelectedMedicine(null)
                    setRecommendations([])
                    setRecommendError('')
                  } else {
                    setSelectedMedicine(value)
                  }
                }}
                getOptionLabel={(option) => option || ''}
                isOptionEqualToValue={(option, value) => option === value}
                filterSelectedOptions
                autoHighlight
                disablePortal
                ListboxProps={{
                  sx: {
                    maxHeight: 360,
                    '& li': { whiteSpace: 'normal', lineHeight: 1.3, alignItems: 'flex-start' }
                  }
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>{option}</Typography>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search and select a medicine"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <SearchIcon color="action" />, 
                      endAdornment: (
                        <>
                          {isLoadingMedicines ? <CircularProgress size={18} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {selectedMedicine && !isLoadingRecommendations && recommendations.length > 0 && (
                <Alert severity="success">Showing recommendations for "{selectedMedicine}"</Alert>
              )}
              {isLoadingRecommendations && (
                <Alert severity="info">Fetching recommendations…</Alert>
              )}
              {recommendError && (
                <Alert severity="error">{recommendError}</Alert>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {loadMedicinesError && (
        <Alert severity="error" sx={{ mb: 2 }}>{loadMedicinesError}</Alert>
      )}

      <Typography variant="subtitle1" sx={{ mb: 1 }}>Popular medicines</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {popular.map(x => (
          <Chip key={x} label={x} variant="outlined" onClick={() => setSelectedMedicine(x)} />
        ))}
      </Box>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Recommendations</Typography>
          {isLoadingRecommendations && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={18} />
              <Typography variant="body2">Loading…</Typography>
            </Box>
          )}
          {!isLoadingRecommendations && recommendations.length === 0 && (
            <Typography variant="body2" color="text.secondary">No recommendations to show yet.</Typography>
          )}
          {!isLoadingRecommendations && recommendations.length > 0 && (
            <List dense>
              {recommendations.map((rec, idx) => (
                <>
                  <ListItem key={rec} disableGutters>
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                        <LocalPharmacyOutlinedIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={rec} secondary={idx === 0 ? 'Closest match' : null} />
                  </ListItem>
                  {idx !== recommendations.length - 1 && <Divider component="li" />}
                </>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}



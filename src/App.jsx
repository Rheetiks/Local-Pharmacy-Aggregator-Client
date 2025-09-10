import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, Button, TextField, InputAdornment, IconButton, Stack, Avatar, Drawer, List, ListItemButton, ListItemText, Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LandingPage from './pages/LandingPage'
import AlternateDrugPage from './pages/AlternateDrugPage'
import DemandPredictionPage from './pages/DemandPredictionPage'
import StockEstimationPage from './pages/StockEstimationPage'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeDrawer = () => setMobileOpen(false)

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
              <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>P</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>Local Pharmacy Aggregator</Typography>
            </Stack>
            <TextField
              size="small"
              placeholder="Search medicines and products"
              sx={{ minWidth: { xs: 160, md: 360 }, mr: 2, display: { xs: 'none', md: 'inline-flex' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <LocalShippingOutlinedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="primary" component={NavLink} to="/" end>Home</Button>
              <Button color="primary" component={NavLink} to="/alternatives">Alternatives</Button>
              <Button color="primary" component={NavLink} to="/demand">Demand</Button>
              <Button color="primary" component={NavLink} to="/stock" startIcon={<ShoppingCartOutlinedIcon />}>Stock</Button>
            </Stack>
            <IconButton aria-label="menu" edge="end" onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={closeDrawer} PaperProps={{ sx: { width: 280 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Menu</Typography>
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItemButton component={NavLink} to="/" onClick={closeDrawer}>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={NavLink} to="/alternatives" onClick={closeDrawer}>
            <ListItemText primary="Alternatives" />
          </ListItemButton>
          <ListItemButton component={NavLink} to="/demand" onClick={closeDrawer}>
            <ListItemText primary="Demand" />
          </ListItemButton>
          <ListItemButton component={NavLink} to="/stock" onClick={closeDrawer}>
            <ListItemText primary="Stock" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/alternatives" element={<AlternateDrugPage />} />
            <Route path="/demand" element={<DemandPredictionPage />} />
            <Route path="/stock" element={<StockEstimationPage />} />
          </Routes>
        </Container>
      </Box>
      <Box component="footer" sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Local Pharmacy Aggregator</Typography>
      </Box>
    </>
  )
}

export default App

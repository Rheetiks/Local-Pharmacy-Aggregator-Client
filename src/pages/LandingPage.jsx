import { Box, Button, Card, CardContent, Grid, Typography, Stack, Chip } from '@mui/material'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CompareIcon from '@mui/icons-material/Compare'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { NavLink } from 'react-router-dom'

function FeatureCard({ icon, title, description, to }) {
  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {to && (
          <Button component={NavLink} to={to} variant="contained">
            Open
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  return (
    <Box>
      <Box sx={{
        textAlign: 'center',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 6 },
        borderRadius: 4,
        background: 'linear-gradient(180deg, rgba(16,132,126,0.10), rgba(16,132,126,0.02))',
        border: '1px solid rgba(16,132,126,0.12)',
        mb: 5
      }}>
        <Chip label="Trusted Pharmacy Tools" color="success" size="small" sx={{ mb: 2 }} />
        <Typography variant="h3" sx={{ mb: 1 }}>
          Everything for your pharmacy operations
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: 720, mx: 'auto' }}>
          Search medicines, discover safe alternatives, estimate stock, and predict demand — in one place.
        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: 720, mx: 'auto', justifyContent: 'center', }}>
          <Grid item xs={12} sm={4}>
            <Button fullWidth component={NavLink} to="/alternatives" size="large" variant="contained" sx={{ py: 1.5 }}>
              Find Alternatives
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth component={NavLink} to="/demand" size="large" variant="contained" sx={{ py: 1.5 }}>
              View Demand
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth component={NavLink} to="/stock" size="large" variant="contained" sx={{ py: 1.5 }}>
              Stock Estimation
            </Button>
          </Grid>
        </Grid>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">Partner Pharmacies</Typography>
              <Typography variant="h4">120+</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">SKUs Tracked</Typography>
              <Typography variant="h4">8k+</Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">Avg. Response</Typography>
              <Typography variant="h4">{'< 100ms'}</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Grid container spacing={3} alignItems="stretch" sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', maxWidth: 400, maxHeight: 300 }}>
          <FeatureCard
            icon={<LocalPharmacyIcon color="primary" />}
            title="Fast Checkout"
            description="Optimized for busy counters with minimal typing and instant results."
            sx={{ width: '100%', height: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', maxWidth: 400, maxHeight: 300 }}>
          <FeatureCard
            icon={<CompareIcon color="primary" />}
            title="Safe Alternatives"
            description="Find similar options by molecule, class, and availability."
            to="/alternatives"
            sx={{ width: '100%', height: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', maxWidth: 400, maxHeight: 300 }}>
          <FeatureCard
            icon={<TrendingUpIcon color="primary" />}
            title="Demand Insights"
            description="Visualize weekly sales and get early alerts for stock-outs."
            to="/demand"
            sx={{ width: '100%', height: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', maxWidth: 400, maxHeight: 300 }}>
          <FeatureCard
            icon={<Inventory2OutlinedIcon color="primary" />}
            title="Stock Estimation"
            description="Calculate reorder points and monitor days of stock at a glance."
            to="/stock"
            sx={{ width: '100%', height: '100%' }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}



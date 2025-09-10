import { Box, Card, CardContent, Grid, Typography, CardActionArea } from '@mui/material'

// Static imports from src/images
import img1 from '../images/download (1).png'
import img2 from '../images/download (2).png'
import img3 from '../images/download (3).png'
import img4 from '../images/download (4).png'
import img5 from '../images/download (5).png'
import imgGeneric from '../images/image.png'
import imgDownload from '../images/download.png'

export default function DemandPredictionPage() {
  const images = [
    { url: img1 },
    { url: img2 },
    { url: img3 },
    { url: img4 },
    { url: img5 },
    { url: imgGeneric },
    { url: imgDownload },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>Demand Prediction</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Visual references only. Showing images from <code>src/images</code>.
      </Typography>

      {images.length === 0 && (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              No images found in <code>src/images</code>. Add images to display them here.
            </Typography>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3} alignItems="stretch" sx={{ justifyContent: 'center' }}>
        {images.map((img, idx) => (
          <Grid key={img.url || idx} item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ display: 'flex' }}>
            <Card elevation={3} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea>
                <Box component="img" src={img.url} alt="Demand chart" sx={{ width: '100%', height: 'auto', display: 'block' }} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}



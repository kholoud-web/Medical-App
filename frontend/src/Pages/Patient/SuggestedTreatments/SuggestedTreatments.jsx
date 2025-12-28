
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button'
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Link from '@mui/material/Link';
import InteractionModal from './InteractionModal';
import FormModal from './FormModal';
import PrintModal from './PrintModal';
//icons
import Vector1 from './icons/Vector (1).svg';
import Vector2 from './icons/Vector (2).svg';
import Vector3 from './icons/Vector (3).svg';
import Vector4 from './icons/Vector (4).svg';
import Frame1 from './icons/Frame.svg';
import Iconography from './icons/Iconography - Caesarzkn (1).svg'
import Iconography2 from './icons/Iconography - Caesarzkn.svg'
//modals
import { useState } from "react";



export default function SuggestedTreatments() {
     // action modal
     const [open, setOpen] = useState(false);
     //form
    // const [isModalOpen, setIsModalOpen] = useState(false);
  //print
  const[printOpen, setPrintOpen]= useState(false);
    

  
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "white" }}>
      <Typography variant="h5" fontWeight={700} my={3} sx={{color:"#505050"}}>
        Suggested Treatments
      </Typography>
    
      <Grid container spacing={2}>
        {/* Left Main Card */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",
 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2} sx={{color:"#505050"}}>
                Treatment: Paclitaxel
              </Typography>

              <Grid container spacing={2}>
                {[
                  {
                    title: "Dosage",
                    value: "160 mg/m²",
                    image1: Vector1,
                    image2: Vector2,
                  },
                  {
                    title: "Method",
                    value: "3 hours",
                    image1: Frame1,
                    image2: Vector3,
                  },
                  {
                    title: "Frequency",
                    value: "Once every 3 weeks",
                    image1: Vector4,
                    image2: Iconography,
                  },
                  {
                    title: "Total Duration",
                    value: "Once every 3 weeks",
                     image2: Iconography,
                    chip: "Completed",
                  },
                ].map((item, index) => (
                  <Grid size={{xs:12,md:6}} key={index}>
                    <Card
                      variant="outlined"
                      sx={{ borderRadius: 2, height: "100%" ,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",p:1}}
                    >
                      <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box sx={{display:"flex",gap:1}}>
            {item.image2 && (
              <Box
                component="img"
                src={item.image2}
                alt={item.title}
                sx={{ width: 24, height: 24 ,borderRadius:"50%",backgroundColor:"#4682FA4D",p:0.5}}
              />
            )}

            <Typography fontWeight={500}>
              {item.title}
            </Typography>
            </Box>
             {item.image1 && (
              <Box
                component="img"
                src={item.image1}
                sx={{ width: 35, height: 45, }}
              />
            )}
             {item.chip && (
            <Chip
              label={item.chip}
              size="small"
             
              sx={{ mt: 1, backgroundColor:"#4682FA66" }}
            />
          )}

          </Box>

          <Typography mt={1} color="text.secondary">
            {item.value}
          </Typography>

         
        </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            </Card>

              {/* Side Effects */}
              <Card sx={{ borderRadius: 3,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",mt:3,p:3}}>
            <Box display="flex" alignItems="center" sx={{mb:2}} >
              <WarningAmberIcon color="error" sx={{width:"40px", height:"40px",borderRadius:"50%",p:1 ,backgroundColor:"#FFC0C0",border:"3px solid #FFC0C0",mr:1}}/>
              <Typography fontWeight={600} sx={{color:"#505050"}}>
                Side Effects & Warnings
              </Typography>
            </Box>
              <Grid container spacing={1}>
                {[
                  "Fatigue",
                  "Hair Loss",
                  "Difficulty breathing",
                  "Fever > 38°C",
                  "Severe nerve pain",
                  "Nausea & Vomiting",
                  "Chest Pain",
                  "Severe nerve pain",
                ].map((effect, i) => (
                  <Grid size={{xs:12 , md:6}} key={i}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <WarningAmberIcon color="#F52A2A" fontSize="small" sx={{color:"#F52A2A"}} />
                      <Typography>{effect}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          
        </Grid>

        {/* Right Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={3}>
            {/* Alternatives */}
            <Grid size={{xs:12}}>
              <Card sx={{ borderRadius: 3,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent", }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CompareArrowsIcon sx={{color:"white",backgroundColor:"#4682FA4D",width:"35px",height:"35px",borderRadius:"50%",p:1}} />
                    <Typography fontWeight={600} sx={{color:"#505050"}}>Alternatives</Typography>
                  </Box>

                  <Box display="flex" gap={1} mb={2}>
                    <Button sx={{backgroundColor:"white",color:"#505050",fontWeight:"400",borderRadius:"5px"}}>Docetaxel</Button>
                    <Button sx={{backgroundColor:"#D9D9D980",color:"#505050",fontWeight:"400", ml:"-13px",borderRadius:"5px"}}>Nab-Pacletaxel</Button>
                  </Box>
                <Box sx={{border:"1px solid #4682FA",borderRadius:"8px", p:2}}>
                  <Typography variant="body2" color="#4682FA" fontWeight={500} mb={1}>
                    Alternatives may have differentt side effects
                  </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={500} mt={3} mb={2} sx={{color:"#505050"}}>Side Effects Comparisons</Typography>
                  {["Hair Loss", "Nausea", "Chest Pain"].map((item, i) => (
                    <Box key={i} mt={2} sx={{display:"flex",alignItems:"center",gap:2}} >
                      <WarningAmberIcon color="#F52A2A" fontSize="small" sx={{color:"#F52A2A"}} />
                      <Typography variant="body2">{item}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={60 + i * 10}
                        sx={{ height: 6, borderRadius: 3 ,width:"200px"}}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>       
            </Grid>

            {/* Actions */}
            <Grid size={{xs:12}}>
              <Card sx={{ borderRadius: 3 ,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",p:1}}>
                <CardContent>
                  <Button onClick={()=>setOpen(true)}
                    fullWidth
                    variant="contained"
                    sx={{color:"#FFFFFF", mb: 1 ,backgroundColor:"#4682FA",borderRadius:"8px"}}
                    startIcon={<FilterAltIcon />}
                  >
                    Check Interactions
                  </Button>

                  <Button onClick={()=>setPrintOpen(true)}
                  fullWidth variant="outlined" sx={{color:"#4682FA",fontSize:"15px"}}>
                    Print Treatment Plan
                  </Button>

                  <Typography
                    variant="caption"
                    display="block"
                    mt={2}
                    textAlign="center"
                  >
                    Any questions? 
                     <Link  href="#" underline="hover"
                      sx={{ fontWeight: 500,color:"#4682FA",fontSize:"12px"} }
                      >
                        Contact team
                        </Link>
                                           
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* modal for interaction*/}

        <InteractionModal open={open} onClose={()=>setOpen(false)}/>
        {/* <FormModal  open={isModalOpen} onClose={()=>setIsModalOpen(false)}/> */}
          <PrintModal  open={printOpen} onClose={()=>setPrintOpen(false)}/>
    </Box>
  );
}

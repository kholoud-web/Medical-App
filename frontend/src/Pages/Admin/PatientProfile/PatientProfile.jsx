import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import profile from './images/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.svg'
import  Divider  from '@mui/material/Divider';




export default function PatientProfile() {
    const cards=[
        {doctor:"Dr. Nicole Harris",
          title:"Osteoarthritis",
          kind:"AI",
          date:"Dec 18, 2025",
        },
        {
            doctor:"Dr. Elizabeth Taylor",
          title:"Osteoarthritis",
          kind:"Inquire",
          date:"Dec 18, 2025",
        },
        {
            doctor:"Dr. Kevin Clark",
          title:"Osteoarthritis",
          kind:"AI",
          date:"Dec 18, 2025",
        },
        {
            doctor:"Dr. Antonio Rossi",
          title:"Osteoarthritis",
          kind:"Inquire",
          date:"Dec 20, 2025",
        },
        {
            doctor:"Dr. Carlos Garcia",
          title:"Osteoarthritis",
          kind:"AI",
          date:"Dec 18, 2025",
        }

    ]


    return(
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#FFFFFF" }}>
         <Box sx={{display:"flex" , alignItems:"center",justifyContent:"space-between"}}>
             <Typography 
              variant="h5" fontWeight={700} my={3} sx={{color:"#505050",textAlign:{xs:"center",md:"left"}}}>
               Patient Profile
             </Typography>
            <Button startIcon={<ArrowBackIcon />} 
             variant='contain'
             sx={{backgroundColor:"#4682FA",color:"#FFFFFF",fontSize:"15px",fontWeight:"600",borderRadius:"8px"}}
             >Back to Patient Table
             </Button> 
         </Box>
        
        <Box sx={{ flexGrow: 1,mt:4 }}>
      <Grid container spacing={2}>
        <Grid size={5} >
             <Card sx={{display:"flex", justifyContent:"center",width:"100%",
                alignItems:"center",p:"1px",borderRadius:"12px" ,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",}}>
                    <Box  sx={{
                          backgroundColor: "#fff",
                          borderRadius: "11px", 
                          p: 2,
                        }}>
                <CardContent>
                <img
                 src={profile}
                 alt='young woman'
                 style={{width:"170px",height:"170px"}}
                />
                <Typography sx={{color:"#747474",fontSize:"20px",fontWeight:"600"}}>Lisa Thompson</Typography>
                </CardContent>
                </Box>
             </Card>
             <Card sx={{p:3,mt:2,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",}}>
                <CardContent>
                  <Typography sx={{color:"#505050",fontSize:"20px",fontWeight:"600",my:2}}>
                    Personal Information
                  </Typography>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                    <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>First Name</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400"}}>Lisa</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                      <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>Second Name</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400"}}>Thompson</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                      <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>Email</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400"}}>123patient@email.com</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                    <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>Gender</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400"}}>Female</Typography>
                  </Box>
                </CardContent>
             </Card>
        </Grid>
        <Grid size={7}>
            <Card sx={{background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",p:2}}>
                <Typography sx={{color:"#505050",fontSize:"20px",fontWeight:"600"}}>Consultation History</Typography>
         {cards.map((card,index)=>{
            return(
               <Card key={index} sx={{border:"1px solid #7E7E7E",backgroundColor:"#FFFFFF",
                 display:"flex",justifyContent:"space-between",p:2,
               mt:3}}>
                  <Box>
                     <Typography sx={{color:"#505050",fontWeight:"600",fontSize:"15px"}}>{card.doctor}</Typography>
                     <Typography sx={{color:"#6B6B6B",fontWeight:"400",fontSize:"13px"}}>{card.title}</Typography>
                     <Typography
                     sx={{border:card.kind==="AI"?"1px solid #4682FA":"1px solid #099319",
                        backgroundColor:card.kind === "AI" ? "#C6D8FD":"#09931929",
                        borderRadius:"8px",
                        my:2,
                        width:"47px",
                        fontSize:"13px",
                        textAlign:"center"
                     }}
                     >{card.kind}</Typography>
                  </Box>
                  <Box sx={{display:"flex",alignItems:"flex-end"}}>
                    <Typography sx={{color:"#6B6B6B",fontSize:"13px",fontWeight:"400"}}>{card.date}</Typography>
                  </Box>
               </Card>
            )
         })}
         </Card>
        </Grid>
      </Grid>
    </Box>
        </Box>
    )
}
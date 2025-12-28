import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import profile from './images/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair (1).svg'
import  Divider  from '@mui/material/Divider';
import img1 from './images/mingcute_heartbeat-line.svg'
import img2 from "./images/meteor-icons_robot.svg"
import img3 from "./images/gg_check-o.svg"
import img4 from "./images/mdi_people.svg"


export default function DoctorProfile() {

    const cards=[
        {doctor:"Sara Ahmed",
          title:"Osteoarthritis",
          kind:"AI",
          date:"Dec 18, 2025",
        },
        {
            doctor:"Sara Ahmed",
          title:"Osteoarthritis",
          kind:"Inquire",
          date:"Dec 18, 2025",
        },
        {
            doctor:"Sara Ahmed",
          title:"Osteoarthritis",
          kind:"AI",
          date:"Dec 18, 2025",
        },
        {
            doctor:"Sara Ahmed",
          title:"Osteoarthritis",
          kind:"Inquire",
          date:"Dec 20, 2025",
        },
        {
            doctor:"Sara Ahmed",
          title:"Osteoarthritis",
          kind:"AI",
          date:"Dec 18, 2025",
        }

    ]

   const iconCards=[
    {
        icon:img1,
        name:"Total Consultations",
        value:"124",
    },
      {
        icon:img2,
        name:"AI-Assisted Consultations",
        value:"4",
    },
      {
        icon:img3,
        name:"Doctor-Verified Diagnoses",
        value:"120",
    },
      {
        icon:img4,
        name:"Active Patients",
        value:"124",
    }
   ]

    return(
        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#FFFFFF" }}>
         <Box sx={{display:"flex" , alignItems:"center",justifyContent:"space-between"}}>
             <Typography 
              variant="h5" fontWeight={700} my={3} sx={{color:"#505050",textAlign:{xs:"center",md:"left"}}}>
                  Doctor Profile
             </Typography>
            <Button startIcon={<ArrowBackIcon />} 
             variant='contain'
             sx={{backgroundColor:"#4682FA",color:"#FFFFFF",fontSize:"15px",fontWeight:"600",borderRadius:"8px"}}
             >Back to Doctor Table
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
                <Typography sx={{color:"#747474",fontSize:"20px",fontWeight:"600",textAlign:"center"}}>Lisa Thompson</Typography>
                <Typography sx={{color:"#4682FA", fontSize:"20px",fontWeight:"600",textAlign:"center"}}>saraali221@email.com</Typography>
                </CardContent>
                </Box>
             </Card>
             <Card sx={{p:2,mt:2,display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",}}>
                <CardContent>
                  <Typography sx={{color:"#505050",fontSize:"20px",fontWeight:"600",my:2}}>
                    Personal Information
                  </Typography>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row",gap:2,
                    
                  }}}>
                    <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>Phone Number</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400",textAlign:{xs:"center" ,md:"right"},ml:2}}>+20 101 234 5678</Typography>
                  </Box>     
                  <Divider/>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                      <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}> National ID</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400",textAlign:{xs:"center" ,md:"right"},ml:2}}>29503151234567</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                      <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>Date of Birth</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400",textAlign:{xs:"center" ,md:"right"},ml:2}}>March 15, 1985</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",p:2,flexDirection:{xs:"column",md:"row"}}}>
                    <Typography sx={{color:"#505050",fontSize:"17px",fontWeight:"500"}}>Address</Typography>
                    <Typography sx={{color:"#747474",fontWeight:"400",textAlign:{xs:"center" ,md:"right"},ml:2}}>123 Medical Street, Cairo, Egypt</Typography>
                  </Box>
                </CardContent>
             </Card>
        </Grid>
        <Grid size={7}>
            <Card sx={{p:3,background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent" , display:"flex",flexWrap:"wrap",gap:3,}}>
              {iconCards.map((iconCard,index)=>{
                  return(
                    <Box key={index} sx={{border:"1px solid #565656",p:2,
                    borderRadius:"8px",width: "calc(50% - 12px)",backgroundColor:"#FFFFFF"}}>
                        <img src={iconCard.icon}/>
                        <Typography sx={{color:"#565656",fontWeight:"400",fontSize:"10px",py:1}}>{iconCard.name}</Typography>
                        <Typography sx={{color:"#505050",fontWeight:"700" ,fontSize:"16px"}}
                        >{iconCard.value}</Typography> 
                    </Box>
                  )
              })
            }
            </Card>
            <Card sx={{background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",p:2,mt:2}}>
                <Typography sx={{color:"#505050",fontWeight:"600", fontSize:"20px"}}>Consultation History</Typography>
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
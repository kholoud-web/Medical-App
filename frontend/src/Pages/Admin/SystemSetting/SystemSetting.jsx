 import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'; 
import icon1 from "./icons/mingcute_ai-line.svg"
import  Divider  from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import icon2 from "./icons/icon-park-outline_medicine-chest.svg"
  
  
  
  export default function SystemSetting(){


    return(
        <Box sx={{p:{xs:2,md:3}}}>
       
         <Typography sx={{color:"#505050",fontSize:"32px",fontWeight:"600"}}>
            System  Settings
         </Typography>
         <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"500"}}>
            Configure system-wide rules and AI behavior
         </Typography>
         <Box >
            <Card sx={{borderRadius:"8px", background: "linear-gradient(90deg, #C6D8FD, #207EFF",p:4}}>
            <Box sx={{p:3,backgroundColor:"#F7F7F7",borderRadius:"6px"}}>   
                   <Box sx={{display:"flex" ,gap:1}}>
                    <img src={icon1}/>
                     <Typography sx={{color:"#505050",fontSize:"24px",fontWeight:"700"}}>AI Diagnosis Settings</Typography>
                   </Box>   
                <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Configure AI-powered diagnosis features</Typography>
                <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"700", mt:2}}>Enable AI Diagnosis</Typography>
                <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Allow AI system to assist with medical diagnoses</Typography>
                <Divider sx={{my:1}}/>
                <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"700" ,mt:2}}>Maximum AI Requests per Day</Typography>
                <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Limit the number of AI diagnosis requests allowed per day</Typography>
                <TextField id="outlined-basic" label="100" variant="outlined" sx={{
                    outlineColor:"#4682FA",width:"100%",mt:1,backgroundColor:"#FFFFFF"
                }} />
               <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Recommended: 100–500 requests per day</Typography>
            </Box> 
            </Card>
          </Box>
            <Card sx={{backgroundColor:"#F7F7F7",p:3,mt:3}}>
                <Box>
                   <Box sx={{display:"flex" ,gap:1,mb:2}}>
                    <img src={icon2}/>
                     <Typography sx={{color:"#505050",fontSize:"24px",fontWeight:"700"}}>Doctor Work Settings</Typography>
                   </Box>  
                  <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Configure doctor workload and availability</Typography> 
                 <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"700", mt:2}}>Maximum Diagnoses per Doctor per Day</Typography>
                  <TextField id="outlined-basic" label="30" variant="outlined" sx={{
                    outlineColor:"#4682FA",width:"100%",mt:1,backgroundColor:"#FFFFFF"
                }} />
               <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Recommended: 20–40 diagnoses per day</Typography> 
               <Divider sx={{my:1}}/>
              <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"700", mt:2}}>Doctor Working Hours</Typography>
            <Typography sx={{color:"#6B6B6B",fontSize:"16px",fontWeight:"500"}}>Set standard working hours for doctor availability</Typography> 
             <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"700",}}>Total Hours</Typography>
                <TextField id="outlined-basic" label="2h" variant="outlined" sx={{
                    outlineColor:"#4682FA",width:"100%",mt:1,backgroundColor:"#FFFFFF"
                }} />
                </Box>
            </Card>
            <Card sx={{backgroundColor:"#C6D8FD",p:3,mt:3}}>
                <Box>
                    <Typography>
                             <Typography>Important:</Typography>
                             Changes to system settings will affect all users and may impact system behavior. 
Please review carefully before saving
                    </Typography>
                    <button></button>
                </Box>
            </Card>
        

        </Box>
    )
}
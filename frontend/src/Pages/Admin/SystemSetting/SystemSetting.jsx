 import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Card from '@/components/Common/Card';
import icon1 from "./icons/mingcute_ai-line.svg"
import  Divider  from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import icon2 from "./icons/icon-park-outline_medicine-chest.svg"
import icon3 from "./icons/ix_about.svg"  
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import SaveModal from './SaveModal';
import ReplyModal from './ReplyModal';
import AddAdmin from './AddAdminOverlay';


  export default function SystemSetting(){
      const [openSave , setOpenSave]= useState(false);
      const [openTable , setOpenTable]=useState(false);
      const [openAddAdmin , setOpenAddAdmin] = useState(false);
      // table
      const rows = [
  {
    name: "Ali Sameh",
    email: "alisameh@gmail.com",
    message: "I need support with an issue in the app.",
    date: "2025/11/20",
    status: "Replied",
  },
  {
    name: "Sarah Ahmed",
    email: "sarahahmed@gmail.com",
    message: "I need help regarding the app.",
    date: "2025/11/25",
    status: "Replied",
  },
  {
    name: "Karam Adel",
    email: "karamadel@gmail.com",
    message: "I need help using the app.",
    date: "2025/11/25",
    status: "Pending",
  },
            ];
   //handle events
   const handleOpenTable = ()=>{
           setOpenTable(true);
   }


    return(
        <Box sx={{p:{xs:2,md:3}}}>
        <Box sx={{display:"flex" ,flexDirection:"column" ,gap:2,p:3}}>
          <Box sx={{display:"flex" ,justifyContent:"space-between",alignItems:"center"}}>
            <Box>
         <Typography sx={{color:"#505050",fontSize:"32px",fontWeight:"600"}}>
            System  Settings
         </Typography>
         <Typography sx={{color:"#6B6B6B",fontSize:"20px",fontWeight:"500",mb:4}}>
            Configure system-wide rules and AI behavior
         </Typography>
         </Box>
         <Button onClick={()=>setOpenAddAdmin(true)}
         sx={{backgroundColor:"#4682FA",color:"#FFFFFF",borderRadius:"8px",width:"220px",height:"50px",fontSize:"20px",fontWeight:"500px"}}
         startIcon={<AddIcon/>}>Add Admin</Button>
         </Box>
            <Card sx={{borderRadius:"8px",  background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",p:4}}>
            <Box sx={{p:{xs:3,md:4}}}>   
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
          
            <Card sx={{p:4,mt:3,borderRadius:"8px", background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",}}>
                <Box sx={{p:{xs:3,md:4}}}>
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
          {/* table */}
            <Card sx={{p:4,mt:3,borderRadius:"8px", background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",}}>
              <Box  sx={{p:{xs:3,md:4}}}>
                   <Box sx={{ mb: 2 }}>
        <Typography fontWeight={400} sx={{color:"#101828",fontSize:"16px"}}>Outside Requests</Typography>
        <Typography color="#717182" fontSize={16} fontWeight={400}>
          Your Requests
        </Typography>
                  </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              {[
                "Full Name",
                "Email",
                "Message",
                "Date",
                "Status",
                "Actions",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: 600,
                    color: "#475467",
                    fontSize: 14,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell sx={{color:"#4A5565",fontWeight:"400",fontSize:"16px"}}>{row.email}</TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {row.message}
                </TableCell>
                <TableCell>{row.date}</TableCell>

                {/* Status */}
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        row.status === "Replied"
                          ? "#DCFCE7"
                          : "#FEF3C7",
                      color:
                        row.status === "Replied"
                          ? "#16A34A"
                          : "#D97706",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  />
                </TableCell>

                {/* Action */}
                <TableCell>
                  <Button onClick={()=> handleOpenTable()}
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      color:"#0A0A0A",
                      backgroundColor:"#F7F7F7",
                      borderColor:"#0000001A"
                    }}
                  >
                    Reply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
              </Box>
            </Card>

            <Card sx={{backgroundColor:"#EDF3FF",p:4,mt:3,borderRadius:"8px",background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",}}>
                <Box sx={{p:{xs:3 ,md:4}}}>
                  <Box sx={{display:"flex",gap:1}}>
                    <img src={icon3} alt='icon'/>
                    <Typography sx={{color:"#505050",fontSize:"24px",fontWeight:"400"}}>
                             <span style={{color:"#505050",fontSize:"24px",fontWeight:"700",p:1}}>Important:</span>
                             Changes to system settings will affect all users and may impact system behavior. 
                             Please review carefully before saving
                    </Typography>
                    </Box>
                    <Button onClick={()=>setOpenSave(true)}
                    variant='contain' sx={{backgroundColor:"#4682FA",mt:3,color:"white"}}>Save Settings</Button>
                </Box>
            </Card>
        </Box>
       
       {/* modal save setting */}
        
       <SaveModal open={openSave} onClose={()=>setOpenSave(false)}/>        
             {/*modal for reply btn  */}
       <ReplyModal open ={openTable} onClose={()=>setOpenTable(false)}/>
            
            {/* Add admin modal */}
        <AddAdmin open={openAddAdmin} onClose={()=>setOpenAddAdmin(false)}/>
        </Box>
    )
}
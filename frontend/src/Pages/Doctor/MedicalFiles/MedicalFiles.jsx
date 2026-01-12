
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import MedicationIcon from '@mui/icons-material/Medication';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import frameImg from './Frame 1171275770.svg'
import { useState } from "react";
import { IconButton } from '@mui/material';





export default function MedicalFiles(){
    const cards =[
   {id:1, name :"Blood Test-CBC.pdf" , date:"Date: 2025-09-10"},
   {id:2, name:"Chest X-ray.jpg",date:"Date: 2025-08-02"},
   {id:3, name:"Treatment Prescription.pdf" ,date:"Date: 2025-07-15"},
    {id:4 ,name:"Chest X-ray.jpg", date:"Date: 2025-08-02"}
]
      const [open, setOpen] = useState(false);
      const [files,setFiles] = useState(cards);
      const [selectedFile, setSelectedFile] = useState(null);

     

    //button handlers
    const handleDelete=(id)=>{
        setFiles(prev=>prev.filter(file=>
             file.id !== id
        ))
    }

  const handleView = (file)=>{
    setSelectedFile(file);
    setOpen(true);
  }


    return(
         <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",           
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 4,
          borderRadius:"8px",
            background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",
        }}
      >       
        <Box sx={{display:"flex"}}>
            <MedicationIcon sx={{ fontSize: 26, color: "#4682FA" ,mr:1}} />
          <Typography variant="h5" fontWeight="bold" mb={2} sx={{backgroundColor:"#F7F7F7",color:"#505050"}}>
             Medical Files
         </Typography>
        </Box>
        {/* seach field */}
          <TextField
                   fullWidth
                   placeholder="Search In Medical Files..."
                   sx={{ mb: 3 ,backgroundColor:"#FFFFFF",outline:"#4682FA", "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                 borderColor: "#4682FA", 
                 borderWidth: 2
               }}}}
                   InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                   <SearchIcon color="action" />
                  </InputAdornment>
                )
                }}
         />
         {/* cards */}
         <Box sx={{display:"flex" ,gap:2,flexDirection:{xs:"column" , md:"row"}}}>
             <Card variant="outlined" sx={{border:"1px solid #6B6B6B",
                backgroundColor:"#EEEEEE",
                p:2,
                width:"100%",
                 textAlign:"center",
                }}>
                <Typography 
                sx={{color:"#6B6B6B",
                fontWeight:"700",fontSize:"20px",
                fontFamily:"Poppins",
                textTransform:"capitalize",
                }}>lab tests
                </Typography>
                  <Button variant="contained" sx={{backgroundColor:"#4682FA",m:2,textTransform:"capitalize"}} startIcon={<AddIcon/>}>
                       add
                  </Button>
             </Card>

                <Card variant="outlined" sx={{border:"1px solid #6B6B6B",
                backgroundColor:"#EEEEEE",
                p:2,
                width:"100%",
                 textAlign:"center"
                }}>
                <Typography 
                sx={{color:"#6B6B6B",
                fontWeight:"700",fontSize:"20px",
                fontFamily:"Poppins",
                textTransform:"capitalize",
                }}>X-ray
                </Typography>
                  <Button variant="contained" sx={{backgroundColor:"#4682FA",m:2,textTransform:"capitalize"}} startIcon={<AddIcon/>}>
                       add
                  </Button>
             </Card>

                <Card variant="outlined" sx={{border:"1px solid #6B6B6B",
                backgroundColor:"#EEEEEE",
                p:2,
                width:"100%",
                textAlign:"center"
                }}>
                <Typography 
                sx={{color:"#6B6B6B",
                fontWeight:"700",fontSize:"20px",
                fontFamily:"Poppins",
                textTransform:"capitalize",
                }}>Prescription
                </Typography>
                  <Button variant="contained" sx={{backgroundColor:"#4682FA",m:2,textTransform:"capitalize"}} startIcon={<AddIcon/>}>
                       add
                  </Button>
             </Card>
         </Box>
         {/* files */}
         <Box>
            {files.map((file)=>(
                <Card  key={file.id} variant="outlined" sx={{border:"1px solid #6B6B6B",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                p:2,
                mt:4
            
            }}>
                <Box>
                    <Typography sx={{color:"#6B6B6B",fontWeight:"700",fontSize:"1rem",fontFamily:"Poppins"}}>{file.name}</Typography>
                    <Typography sx={{color:"#9A9999",fontWeight:"500",fontSize:"1rem",fontFamily:"Poppins"}}>{file.date}</Typography>
                </Box>
                {/* icons */}
                <Box sx={{display:"flex"}}>
                    <IconButton>
                    <VisibilityIcon onClick={()=>handleView(file)}
                     sx={{color:"white", backgroundColor:"#4682FA"
                        ,width:"32px",
                         height:"32px",borderRadius:"50%",
                        padding:"4px",cursor:"pointer"
                    }}/>
                    </IconButton>
                    <IconButton>
                    <DownloadIcon sx={{mx:2,color:"white" , 
                        backgroundColor:"#00D262",width:"32px",
                         height:"32px",borderRadius:"50%",
                         padding:"4px",cursor:"pointer"
                    }} />
                    </IconButton>
                    <IconButton>
                    <DeleteIcon onClick={()=>handleDelete(file.id)}
                     sx={{color:"white",backgroundColor:"#EF4444",width:"32px",
                        height:"32px",borderRadius:"50%",
                        padding:"4px",cursor:"pointer"
                    }}/>
                    </IconButton>
                </Box>
            </Card>
            ))}
         </Box>
      </Card>

      {/* modal for viewing */}
         <Modal open={open} onClose={() => setOpen(false)} >
    <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: 900,
      borderRadius: 3,
    }}
  >
    <Card
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor:"#F7F7F7",
        border:"2px solid #D9D9D9"
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} sx={{color:"#505050",fontWeight:"700",fontSize:"24px"}}>
         View File
      </Typography>
      <Box sx={{my:3}}>
        {selectedFile &&(
        <Typography sx={{color:"#6B6B6B",fontWeight:"700" , fontSize:"20px"}}>{selectedFile.name}</Typography>
        )}
         <Typography sx={{color:"#6B6B6B", fontWeight:"700", fontSize:"16px"}}>Category: Lab Tests </Typography>
          <Typography sx={{color:"#6B6B6B", fontWeight:"400", fontSize:"16px"}}></Typography>
      </Box>
      {/* file content */}
      <Box sx={{backgroundImage: `url(${frameImg})`,width:"100%",height:"205px",mb:2}}>
       
      </Box>
     
      <Box sx={{ display: "flex", justifyContent: "flex-start",
         gap: 2 }}>
        <Button sx={{width:"151px"}}
        variant="contained">
          View
        </Button>
          <Button sx={{width:"151px",border:"1px solid #666666",
          color:"#747474",fontWeight:"700",fontSize:"16px"}}
        onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Card>
  </Box>
        </Modal>

         </Box>
    )
}
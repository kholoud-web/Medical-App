import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PrintIcon from "@mui/icons-material/Print";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import  Divider  from '@mui/material/Divider';





export default function PrintModal({open, onClose}) {

const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
   return(
  <Modal open={open} onClose={onClose} >
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
      <Typography variant="h6" fontWeight="bold" mb={2} sx={{color:"#505050",fontWeight:"600",fontSize:"24px"}}>
         Print Treatment Plan
      </Typography>
      <Typography sx={{color:"#505050",fontWeight:"500",fontSize:"20px",my:2}}>Printer</Typography>
     
     <Select fullWidth defaultValue="hp404" sx={{mb:3}}>
  <MenuItem value="hp404">
    <Box display="flex" alignItems="center" gap={1}>
      <PrintIcon fontSize="small" />
      HP Laser Jet Pro M404dn
    </Box>
  </MenuItem>

  <MenuItem value="canon">
    <Box display="flex" alignItems="center" gap={1}>
      <PrintIcon fontSize="small" />
      Canon PIXMA G3420
    </Box>
  </MenuItem>
    </Select>

      <Box >
         <Typography sx={{color:"#505050",fontSize:"20px",mt:4}}>Pages</Typography>
          <RadioGroup
                   value={selectedValue}
                   onChange={handleChange}
                   name="radio-buttons"
                   sx={{display:"flex",alignItems:"center",mt:2,flexDirection:"row",gap:2}}
                 >
                   <FormControlLabel
                     value="a"
                     control={<Radio />}
                     label="All"
                   />

                   <FormControlLabel
                     value="b"
                     control={<Radio />}
                     label="Custom"
                   />
              <TextField
                size="small"
                placeholder="e.g 1-3, 5"
               sx={{ml:5}}
              />
          </RadioGroup>
  
      </Box>
      <Divider sx={{my:3}}/>
      <Box sx={{ display: "flex", justifyContent: "flex-end",
         gap: 2,mt:2 }}>
        <Button sx={{width:"151px"}}
        variant="contained">
          Print
        </Button>
          <Button sx={{width:"151px",border:"1px solid #666666",
          color:"#747474",fontWeight:"700",fontSize:"16px"}}
        onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Card>
  </Box>
        </Modal>

   )
}
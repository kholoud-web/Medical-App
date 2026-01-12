import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import icon3 from "./icons/ix_about.svg"  



export default function SaveModal ({open , onClose}){
    return(
        <Modal open ={open} onClose={onClose}  >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: 900,
              borderRadius: 3,
              backgroundColor:"#F7F7F7",
              p:3
            }}
          >
           <Box sx={{display:"flex", gap:1}}>
            <img src={icon3} style={{color:"#F59F00"}}/>
            <Box>
           <Typography sx={{color:"#505050",fontSize:"24px",fontWeight:"700"}}>Confirm Settings Update</Typography> 
          <Typography sx={{color:"#505050",fontSize:"24px",fontWeight:"400"}}>This will affect all system users</Typography> 
           </Box>
           </Box>
           <Typography sx={{color:"#505050",fontSize:"18px",fontWeight:"400",my:3}}>
              Are you sure you want to save these system settings? All changes will take effect immediately across the entire platform.
           </Typography>
    
              <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
                <Button sx={{width:"151px",border:"1px solid #666666"}}
                onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                sx={{width:"151px"}}
                variant="contained">
                  Save Setting
                </Button>
              </Box>
          </Box>
             </Modal>

    )
}
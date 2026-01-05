import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize';




export default function ReplyModal({open,onClose}){
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
                      backgroundColor:"#F7F7F7",
                      p:3
                    }}
                  >
                 
                   <Typography sx={{color:"#505050",fontWeight:"700",fontSize:"24px", mb:2}}>Reply</Typography>
                       <TextareaAutosize
                             aria-label="Enter Your Reply"
                             minRows={3}
                             placeholder="Minimum 3 rows"
                             style={{ width: "100%",backgroundColor:"#FFFFFF",border:"1px solid #6B6B6B",P:3 }}
                           />
                      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 ,mt:2}}>
                        <Button sx={{width:"151px",border:"1px solid #666666"}}
                        onClick={onClose}>
                          Cancel
                        </Button>
                        <Button sx={{width:"151px"}}
                        variant="contained">
                          Send
                        </Button>
                      </Box>
                  </Box>
                     </Modal>
        
    )
}
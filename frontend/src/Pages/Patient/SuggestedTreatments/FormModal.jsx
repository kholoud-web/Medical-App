import { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { Form } from "react-router-dom";
import Divider  from "@mui/material/Divider";
import Link from '@mui/material/Link';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Modal from '@mui/material/Modal';



export default function FormModal ({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
      <Modal open={open} onClose={onClose}  sx={{
    zIndex: (theme) => theme.zIndex.modal + 1,
  }}>
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
              p:3,
               zIndex: 1301
            }}
          >
    
        <Typography>Contact Support</Typography>
        <Box>
          <Form id="contact-form" onSubmit={handleSubmit}>
           <Box sx={{display:"flex" ,alignItems:"center"}}>
            <Box sx>
            <Typography sx={{color:"#333333",fontWeight:"400",fontSize:"20px"}}>Name</Typography>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Enter your name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            </Box>
            <Box sx={{ml:2}}>
         <Typography sx={{color:"#333333",fontWeight:"400",fontSize:"20px"}}>Email</Typography>
            <TextField
              margin="dense"
              name="email"
              label="Enter your Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            </Box>
            </Box>
            <Typography sx={{color:"#333333",fontWeight:"400",fontSize:"20px"}}>Subject</Typography>
            <TextField
              margin="dense"
              name="subject"
              label="Question about treatment plan"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <Typography sx={{color:"#333333",fontWeight:"400",fontSize:"20ox"}}>Message</Typography>
            <TextField
              margin="dense"
              name="message"
              label="Please describe your issue"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form>
          <Divider sx={{my:2}}/>
          <Typography sx={{color:"#000000",fontSize:"20px", fontWeight:"500",textAlign:"center"}}>Alternatively, you can reach us at :</Typography>
          <Box>
            <Box sx={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
                <LocalPhoneIcon sx={{color:"#4682FA"}}/>
                <Typography sx={{fontWeight:"400",color:"#4682FA"}}> <Link >123456789</Link>  </Typography>
                <EmailIcon sx={{color:"#4682FA",ml:2}}/>
                <Typography sx={{fontWeight:"400",color:"#4682FA"}}> <Link>support@healthcare.com</Link>  </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{mt:2,p:2}}>
          <Button onClick={onClose} sx={{backgroundColor:"white",color:"#4682FA",fontSize:"20px",border:"1px solid #4682FA"}}>
            Cancel
          </Button>
          <Button type="submit" form="contact-form" variant="contained" sx={{backgroundColor:"#4682FA",color:"white",fontSize:"20px",ml:1}}>
            Send Message
          </Button>
        </Box>
       </Box>
      </Modal>
    
  );
};


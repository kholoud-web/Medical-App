import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";



export default function HelpSupport(){
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);


  const handleToggle = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };


    return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 4,
          borderRadius: "8px",
           background:
      "linear-gradient(#F7F7F7, #F7F7F7) padding-box, " +
      "linear-gradient(90deg, #C6D8FD, #207EFF) border-box",
    border: "2px solid transparent",
        }}
      >       
        {/* Title */}
        <Box sx={{display:"flex"}}>
          <HelpOutlineIcon sx={{ fontSize: 21, color: "#4682FA" ,mr:1}} />
          <Typography variant="h5" fontWeight="bold" mb={2} sx={{backgroundColor:"#F7F7F7"}}>
             Help & Support
         </Typography>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search FAQs..."
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
       

        {/* FAQ Items */}
        <Accordion  expanded={expanded === "panel1"}
          onChange={() => handleToggle("panel1")}
          disableGutters
          elevation={0} 
          sx={{mb:2, borderRadius:2,border:"1px solid #6B6B6B"}}
          >
          <AccordionSummary>
             <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography>
                How do I view my patients’ list?
              </Typography>

              <Typography
                sx={{
                  color: "#3f51b5",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                {expanded === "panel1" ? "Hide" : "Show"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#6B6B6B"sx={{fontWeight:"500",backgroundColor:"#FFFFFF"}}>
              You can view your patients list from the dashboard by clicking
              on the Patients tab.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion  expanded={expanded === "panel2"}
          onChange={() => handleToggle("panel2")}
          disableGutters
          elevation={0}
          sx={{mb:2, borderRadius:2,border:"1px solid #6B6B6B"}}
          >
          <AccordionSummary >
              <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography>
                How do I check patient medical reports?
              </Typography>

              <Typography
                sx={{
                  color: "#3f51b5",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                {expanded === "panel2" ? "Hide" : "Show"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#6B6B6B"sx={{fontWeight:"500",backgroundColor:"#FFFFFF"}}>
              Open the patient profile and navigate to the Reports section.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion  expanded={expanded === "panel3"}
          onChange={() => handleToggle("panel3")}
          disableGutters
          elevation={0}
           sx={{mb:2, borderRadius:2,border:"1px solid #6B6B6B"}}
          >
          <AccordionSummary >
              <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography>
                How do I view and manage consultations?
              </Typography>

              <Typography
                sx={{
                  color: "#3f51b5",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                {expanded === "panel3" ? "Hide" : "Show"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#6B6B6B"sx={{fontWeight:"500",backgroundColor:"#FFFFFF"}}>
              Consultations are available under the Consultations tab.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Contact Support */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#EDEDED",
            borderRadius: 2,
            border:"1px solid #C7C7C7"
          }}
        >
          <Typography fontWeight="bold" mb={1} sx={{color:"#6B6B6B",fontWeight:"700"}}>
            Contact Support
          </Typography>
          <Typography mb={2} sx={{color:"#6B6B6B", fontWeight:"500"}}>
            Send us a ticket or start a live chat
          </Typography>

          <Button onClick={() => setOpen(true)}
           variant="contained" sx={{backgroundColor:"#4682FA"}} >
            Submit Ticket
          </Button>
        </Box>
      </Card>

      {/* modal for submitting the ticket */}
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
      backgroundColor:"#F7F7F7",
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
      <Typography variant="h6" fontWeight="bold" mb={2} sx={{color:"#505050"}}>
        Submit Support Ticket
      </Typography>

      <TextField
        fullWidth
        label=" Enter your Subject"
        sx={{ mb: 2 ,color:"#6B6B6B",fontWeight:"700",border:"1px solid #6B6B6B",borderRadius:2}}
      />

      <TextField
        fullWidth
        label="Enter your Details"
        multiline
        rows={4}
        sx={{ mb: 3 ,color:"#6B6B6B",fontWeight:"700",border:"1px solid #6B6B6B",borderRadius:2}}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
        <Button sx={{width:"151px"}}
        onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button sx={{width:"151px"}}
        variant="contained">
          Send
        </Button>
      </Box>
    </Card>
  </Box>
     </Modal>

    </Box>
  );

}
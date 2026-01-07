import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState,useEffect } from "react";
import SubmitTicket from "./SubmitTicketModal";
import { useSelector,useDispatch } from "react-redux";
import { fetchFaqs } from "@/RiduxToolkit/Slices/HelpSupportSlice";






export default function HelpSupport() {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm , setSearchTerm] = useState("");
  const dispatch = useDispatch();
  
  const {inquiries , loading , error} = useSelector((state)=>state.help)
  
  // fetch faqs when component mounts
  useEffect(()=>{
    dispatch(fetchFaqs());
  },[dispatch]);


  const handleToggle = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  // filter faqs based on search
  const filteredFaqs = Array.isArray(inquiries) 
  ? inquiries.filter((faq) =>
      faq.question?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  // show loading state
    if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">Error loading FAQs: {error}</Typography>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
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
        <Box sx={{ display: "flex" }}>
          <HelpOutlineIcon sx={{ fontSize: 21, color: "#4682FA", mr: 1 }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            sx={{ backgroundColor: "#F7F7F7" }}
          >
            Help & Support
          </Typography>
        </Box>

        {/* Search */}
        <TextField
         value={searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}
          fullWidth
          placeholder="Search FAQs..."
          sx={{
            mb: 3,
            backgroundColor: "#FFFFFF",
            outline: "#4682FA",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4682FA",
                borderWidth: 2,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* FAQ Items */}
          {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
             <Accordion
              key={faq.id || index}
              expanded={expanded === `panel${index}`}
              onChange={() => handleToggle(`panel${index}`)}
              disableGutters
              elevation={0}
              sx={{ mb: 2, borderRadius: 2, border: "1px solid #6B6B6B" }}
            >
              <AccordionSummary>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{faq.question}</Typography>

                  <Typography
                    sx={{
                      color: "#3f51b5",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {expanded === `panel${index}` ? "Hide" : "Show"}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  color="#6B6B6B"
                  sx={{ fontWeight: "500", backgroundColor: "#FFFFFF" }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", py: 3, color: "#6B6B6B" }}>
            No FAQs found
          </Typography>
        )}

        

        {/* Contact Support */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#EDEDED",
            borderRadius: 2,
            border: "1px solid #C7C7C7",
          }}
        >
          <Typography
            fontWeight="bold"
            mb={1}
            sx={{ color: "#6B6B6B", fontWeight: "700" }}
          >
            Contact Support
          </Typography>
          <Typography mb={2} sx={{ color: "#6B6B6B", fontWeight: "500" }}>
            Send us a ticket or start a live chat
          </Typography>

          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{ backgroundColor: "#4682FA" }}
          >
            Submit Ticket
          </Button>
        </Box>
      </Card>

      {/* modal for submitting the ticket */}
      <SubmitTicket open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

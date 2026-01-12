import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendReply, getReply, clearSuccess, clearError } from '@/RiduxToolkit/Slices/SystemSettingSlice';

export default function ReplyModal({open, onClose, request}){
    const dispatch = useDispatch();
    const { loading, error, successMessage } = useSelector((state) => state.systemSetting);
    const [reply, setReply] = useState('');

    // Derive isReplied from request prop instead of storing in state
    const isReplied = request?.status === "Replied";

    // Fetch existing reply if already replied
    useEffect(() => {
      if (open && request && request.status === "Replied") {
        const requestId = request.id || request.requestId || request.Id || request.RequestId;
        
        if (requestId) {
          // Fetch the existing reply
          dispatch(getReply(requestId))
            .unwrap()
            .then((data) => {
              setReply(data.reply || '');
            })
            .catch((err) => {
              console.error('Failed to fetch reply:', err);
            });
        }
      }
    }, [open, request, dispatch]);

    useEffect(() => {
      if (successMessage && open) {
        setTimeout(() => {
          dispatch(clearSuccess());
          setReply('');
          onClose();
        }, 2000);
      }
    }, [successMessage, open, dispatch, onClose]);

    const handleSubmit = () => {
      if (!reply.trim()) {
        alert('Please enter a reply message');
        return;
      }

      if (!request) {
        alert('No request selected');
        return;
      }

      // Try different possible field names for the request ID
      const requestId = request.id || request.requestId || request.Id || request.RequestId;
      
      if (!requestId) {
        console.error('Request object:', request);
        alert('Request ID not found. Please check console for details.');
        return;
      }

      dispatch(sendReply({
        requestId: requestId,
        reply: reply.trim()
      }))
        .unwrap()
        .catch((err) => {
          console.error('Send reply failed:', err);
        });
    };

    const handleClose = () => {
      setReply('');
      dispatch(clearError());
      dispatch(clearSuccess());
      onClose();
    };

    return(
           <Modal open={open} onClose={handleClose}>
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
                 
                   <Typography sx={{color:"#505050",fontWeight:"700",fontSize:"24px", mb:2}}>
                     {isReplied ? "View Reply" : "Reply"}
                   </Typography>
                   
                   {/* Debug Info */}
                   {!request && (
                     <Box sx={{ mb: 2, p: 2, backgroundColor: "#FFF3CD", borderRadius: 1 }}>
                       <Typography color="error">Warning: No request data available</Typography>
                     </Box>
                   )}
                   
                   {/* Request Details */}
                   {request && (
                     <Box sx={{ mb: 2, p: 2, backgroundColor: "#FFFFFF", borderRadius: 1 }}>
                       <Typography><strong>From:</strong> {request.fullName || request.name}</Typography>
                       <Typography><strong>Email:</strong> {request.email}</Typography>
                       <Typography><strong>Message:</strong> {request.message}</Typography>
                     </Box>
                   )}

                   {/* Success/Error Messages */}
                   {successMessage && (
                     <Box sx={{ backgroundColor: "#DCFCE7", color: "#16A34A", p: 2, borderRadius: 1, mb: 2 }}>
                       {successMessage}
                     </Box>
                   )}
                   {error && (
                     <Box sx={{ backgroundColor: "#FEE2E2", color: "#DC2626", p: 2, borderRadius: 1, mb: 2 }}>
                       {typeof error === 'string' ? error : JSON.stringify(error)}
                     </Box>
                   )}

                   <TextareaAutosize
                     aria-label="Enter Your Reply"
                     minRows={3}
                     placeholder={isReplied ? "" : "Enter your reply message..."}
                     value={reply}
                     onChange={(e) => setReply(e.target.value)}
                     disabled={isReplied}
                     style={{ 
                       width: "100%", 
                       backgroundColor: isReplied ? "#F3F4F6" : "#FFFFFF", 
                       border:"1px solid #6B6B6B", 
                       padding: "8px", 
                       borderRadius: "4px",
                       cursor: isReplied ? "not-allowed" : "text"
                     }}
                   />
                   
                   <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt:2}}>
                     <Button 
                       sx={{width:"151px",border:"1px solid #666666"}}
                       onClick={handleClose}
                       disabled={loading}
                     >
                       {isReplied ? "Close" : "Cancel"}
                     </Button>
                     {!isReplied && (
                       <Button 
                         sx={{width:"151px"}}
                         variant="contained"
                         onClick={handleSubmit}
                         disabled={loading || !reply.trim()}
                       >
                         {loading ? 'Sending...' : 'Send'}
                       </Button>
                     )}
                   </Box>
                  </Box>
                     </Modal>
        
    )
}
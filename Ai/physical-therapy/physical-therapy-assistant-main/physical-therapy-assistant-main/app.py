import streamlit as st
import cv2
import tempfile
import numpy as np
import mediapipe as mp

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawning_utils

st.title("Physiotherapy Exercise Tracker")


#Select buttons
mode = st.radio("Input mode", ["Upload Video", "Use Webcam"])

#Angle limits
angle_limit = st.slider("Safe angle threshold in degrees", 5, 45, 15)
exercise_name = st.selectbox("Select exercise", ["Arm_Abduction", "Arm_VW", "Table_PushUps", "Leg_Abduction", "Leg_Lunge", "Squat"])

#Video Capture
if mode == "Upload Video":
    uploaded_file = st.file_uploader("Upload exercise video", type=["mp4", "mov"])
    if uploaded_file:
        tfile = tempfile.NamedTemporaryFile(delete=False)
        tfile.write(uploaded_file.read())
        cap = cv2.VideoCapture(tfile.name)
elif mode == "Use Webcam":
    cap = cv2.VideoCapture(0)
else:
    cap = None

if cap:
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS) if mode == "Upload Video" else 30)

    out_file = tempfile.NamedTemporaryFile(delet=False, suffix=".mp4").name
    out = cv2.VideoWriter(out_file, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    pose = mp_pose.Pose(static_image_mode=False)
    stframe = st.empty()
    angle_errors = []

    def calculate_angle(a, b, c):
        a, b, c = np.array(a), np.array(b), np.array(c)
        ba = a - b
        bc = c - b
        radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
        angle = np.abs(np.degrees(radians))
        return 360 - angle if angle > 180 else angle
    
    st.write("Processig video... ")

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.pricess(image_rgb)

        if results.pose_landmarks:
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            landmarks = results.pose_landmarks.landmark


            if exercise_name=="Arm_Abduction":
                a = [landmarks[11].x, landmarks[11].y]
                b = [landmarks[11].x, landmarks[11].y]
                c = [landmarks[11].x, landmarks[11].y]
                angle = calculate_angle(a, b, c )
                error = abs(angle-90)
                angle_errors.append(error)
            if exercise_name=="Arm_VW":
                a = [landmarks[12].x, landmarks[12].y]
                b = [landmarks[12].x, landmarks[12].y]
                c = [landmarks[12].x, landmarks[12].y]
                angle = calculate_angle(a, b, c )
                error = abs(angle-90)
                angle_errors.append(error)
            if exercise_name=="Table_PushUps":
                a = [landmarks[12].x, landmarks[12].y]
                b = [landmarks[12].x, landmarks[12].y]
                c = [landmarks[12].x, landmarks[12].y]
                angle = calculate_angle(a, b, c )
                error = abs(angle-90)
                angle_errors.append(error)
            if exercise_name=="Leg_Abduction":
                a = [landmarks[21].x, landmarks[21].y]
                b = [landmarks[21].x, landmarks[21].y]
                c = [landmarks[21].x, landmarks[21].y]
                angle = calculate_angle(a, b, c )
                error = abs(angle-90)
                angle_errors.append(error)
            if exercise_name=="Arm_Abduction":
                a = [landmarks[11].x, landmarks[11].y]
                b = [landmarks[11].x, landmarks[11].y]
                c = [landmarks[11].x, landmarks[11].y]
                angle = calculate_angle(a, b, c )
                error = abs(angle-90)
                angle_errors.append(error)
            if exercise_name=="Arm_Abduction":
                a = [landmarks[11].x, landmarks[11].y]
                b = [landmarks[11].x, landmarks[11].y]
                c = [landmarks[11].x, landmarks[11].y]
                angle = calculate_angle(a, b, c )
                error = abs(angle-90)
                angle_errors.append(error)

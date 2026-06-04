import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

const translations = {
  en: {
    /* ===== Sidebar ===== */
    home: "Home",
    upload: "Upload",
    records: "My Records",
    doctorRequests: "Doctor Requests",
    insuranceSuggestion: "Insurance Suggestion",
    notifications: "Notifications",
    emergencyQR: "Emergency QR",
    logout: "Logout",
    backToHome: "Back to Home",
    doctorReportsHeading: "Doctor Uploaded Reports",
    /* ===== Dashboard ===== */
    welcome: "Welcome Back 👋",
    secureMsg: "Your medical records are secure and accessible anytime.",
    totalRecords: "Total Records",
    pendingRequests: "Pending Requests",
    insuranceMatches: "Insurance Matches",

    /* ===== Upload ===== */
    uploadTitle: "Upload Medical Record",
    titlePlaceholder: "Title",
    chooseFile: "Choose File",
    uploadBtn: "Upload",

    /* ===== Records ===== */
yourRecords: "Your Records",
viewFile: "View File",
doctorReportsHeading: "Doctor Uploaded Reports",
    /* ===== Doctor Actions ===== */
    approve: "Approve",
    reject: "Reject",

    /* ===== Insurance ===== */
    enterDiagnosis: "Enter diagnosis",
    check: "Check",
    recommended: "Recommended",
    notRecommended: "Not Recommended",

    /* ===== Emergency Page ===== */
    emergencyTitle: "Emergency Medical Information",
    bloodGroup: "Blood Group",
    allergies: "Allergies",
    chronicConditions: "Chronic Conditions",
    emergencyContact: "Emergency Contact",
    readOnly: "Read-only emergency access. Editing is disabled.",
    generateQR: "Generate QR",

   /* ===== Notifications ===== */
noNotifications: "No notifications",

MOD_APPROVED:
  "Your record modification has been approved by expert doctor.",
MOD_REJECTED:
  "Your record modification request was rejected by expert doctor.",
MOD_REQUESTED:
  "Doctor requested modification for one of your records.",
MOD_UPLOAD:
  "Doctor uploaded a new medical record.",

/* ===== Additional UI ===== */
selectCategory: "Select Category",
labReport: "Lab Report",
prescription: "Prescription",
scanReport: "Scan Report",
dischargeSummary: "Discharge Summary",
other: "Other",
delete: "Delete",
rename: "Rename",
save: "Save",
cancel: "Cancel",
  },

  ta: {
    /* ===== Sidebar ===== */
    home: "முகப்பு",
    upload: "பதிவேற்று",
    records: "என் பதிவுகள்",
    doctorRequests: "மருத்துவர் கோரிக்கைகள்",
    insuranceSuggestion: "காப்பீட்டு பரிந்துரை",
    notifications: "அறிவிப்புகள்",
    emergencyQR: "அவசர QR",
    logout: "வெளியேறு",
    backToHome: "முகப்புக்கு திரும்ப",
   doctorReportsHeading: "மருத்துவர் பதிவேற்றிய அறிக்கைகள்",
    /* ===== Dashboard ===== */
    welcome: "மீண்டும் வரவேற்கிறோம் 👋",
    secureMsg: "உங்கள் மருத்துவ பதிவுகள் பாதுகாப்பாக சேமிக்கப்பட்டுள்ளன.",
    totalRecords: "மொத்த பதிவுகள்",
    pendingRequests: "நிலுவை கோரிக்கைகள்",
    insuranceMatches: "காப்பீட்டு பொருத்தங்கள்",

    /* ===== Upload ===== */
    uploadTitle: "மருத்துவ பதிவு பதிவேற்று",
    titlePlaceholder: "தலைப்பு",
    chooseFile: "கோப்பு தேர்வு",
    uploadBtn: "பதிவேற்று",
/* ===== Records ===== */
yourRecords: "உங்கள் பதிவுகள்",
viewFile: "கோப்பைப் பார்க்க",
doctorReportsHeading: "மருத்துவர் பதிவேற்றிய அறிக்கைகள்",

    /* ===== Doctor Actions ===== */
    approve: "அங்கீகரி",
    reject: "நிராகரி",

    /* ===== Insurance ===== */
    enterDiagnosis: "நோயை உள்ளிடவும்",
    check: "சரி பார்க்க",
    recommended: "பரிந்துரைக்கப்பட்டது",
    notRecommended: "பரிந்துரைக்கப்படவில்லை",

    /* ===== Emergency Page ===== */
    emergencyTitle: "அவசர மருத்துவ தகவல்",
    bloodGroup: "இரத்த வகை",
    allergies: "ஒவ்வாமைகள்",
    chronicConditions: "நீடித்த நோய்கள்",
    emergencyContact: "அவசர தொடர்பு",
    readOnly: "பார்வைக்கு மட்டும். திருத்த முடியாது.",
    generateQR: "QR உருவாக்கு",

    /* ===== Notifications ===== */
    noNotifications: "அறிவிப்புகள் இல்லை",

    MOD_APPROVED:
      "உங்கள் பதிவில் செய்யப்பட்ட மாற்றம் நிபுணர் மருத்துவரால் அனுமதிக்கப்பட்டது.",
    MOD_REJECTED:
      "உங்கள் பதிவில் செய்யப்பட்ட மாற்ற கோரிக்கை நிபுணர் மருத்துவரால் நிராகரிக்கப்பட்டது.",
    MOD_REQUESTED:
      "உங்கள் பதிவில் மாற்றம் செய்ய மருத்துவர் கோரிக்கை வைத்துள்ளார்.",
    MOD_UPLOAD:
      "மருத்துவர் புதிய மருத்துவ பதிவை பதிவேற்றியுள்ளார்.",
      selectCategory: "வகையை தேர்வு செய்யவும்",
labReport: "ஆய்வு அறிக்கை",
prescription: "மருந்து சீட்டு",
scanReport: "ஸ்கேன் அறிக்கை",
dischargeSummary: "வெளியேற்ற சுருக்கம்",
other: "மற்றவை",
delete: "அழி",
rename: "மறுபெயரிடு",
save: "சேமிக்க",
cancel: "ரத்து",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || translations.en
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
# Booking System Setup

The booking system has been successfully added to your portfolio site! Here's what was implemented:

## Features Added

### 1. Booking Page (`/booking`)
- **Location**: `src/pages/booking.js`
- **Styles**: `src/styles/Booking.module.css`
- **Features**:
  - Service selection dropdown (Web Development, App Development, UI/UX Design, SEO, Graphic Design, Consultation)
  - Personal information form (name, email, phone)
  - Date/time scheduling with preference selection
  - Project description textarea
  - Budget estimation dropdown
  - Timeline selection
  - Multi-language support (English/Danish)
  - Form validation with error handling
  - Responsive design for mobile and desktop

### 2. Navigation Updates
- Added "Book Service" link to the main navigation bar
- Added call-to-action section in the services area of homepage
- Multi-language support for navigation

### 3. Styling
- Consistent with existing design system
- Dark mode support
- Responsive layout
- Accessibility improvements
- Professional form styling

## EmailJS Configuration Required

To make the booking form functional, you need to configure EmailJS:

### Steps:
1. **Create EmailJS Account**: Visit [emailjs.com](https://www.emailjs.com/) and create an account
2. **Get Service ID**: Create an email service and note your Service ID
3. **Create Template**: Set up an email template and note your Template ID
4. **Get Public Key**: Find your public key in account settings

### Update Configuration:
In `src/pages/booking.js`, replace these placeholders around line 127:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
  templateParams,
  'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
);
```

### Email Template Variables:
The booking form sends these template parameters:
- `to_name`: "Sophia" (recipient name)
- `from_name`: Customer's full name
- `service_type`: Selected service
- `email`: Customer's email
- `phone`: Customer's phone (optional)
- `preferred_date`: Requested meeting date
- `preferred_time`: Requested time slot
- `project_description`: Project details
- `budget`: Budget range
- `timeline`: Project timeline
- `message`: Formatted summary of all details

## Testing the Booking System

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Navigate to Booking**:
   - Visit `http://localhost:3000/booking`
   - Or click "Book Service" in navigation
   - Or use the CTA button in the services section

3. **Test Form**:
   - Fill out all required fields
   - Test validation (try submitting empty form)
   - Test different service types
   - Test responsive design on mobile

## Customization Options

### Adding New Services:
In `src/pages/booking.js`, update the translations object:
```javascript
services: {
  // Add new service options here
  newService: "New Service Name"
}
```

### Modifying Budget Ranges:
Update the `budgetOptions` in translations:
```javascript
budgetOptions: {
  // Modify or add budget ranges
  custom: "Custom range"
}
```

### Changing Time Slots:
Update the `timeSlots` in translations:
```javascript
timeSlots: {
  // Add or modify time slots
  lateEvening: "Late Evening (21:00 - 23:00)"
}
```

## File Structure
```
src/
├── pages/
│   ├── booking.js          # Main booking page component
│   └── index.js            # Updated homepage with navigation
└── styles/
    ├── Booking.module.css  # Booking page styles
    └── Home.module.css     # Updated homepage styles
```

## Next Steps

1. Configure EmailJS with your credentials
2. Test the booking form thoroughly
3. Customize services, budget ranges, or time slots as needed
4. Consider adding confirmation emails to customers
5. Optionally integrate with a calendar system for automatic scheduling

The booking system is now ready to help you convert website visitors into clients!
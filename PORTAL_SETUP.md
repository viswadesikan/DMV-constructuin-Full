# DMV Construction - Admin & Client Portal Setup Guide

## 🚀 Features Implemented

### Admin Portal (`/admin`)
**Login Credentials:**
- Password: `dmv2026`
- Session: Stored in `sessionStorage` (auto-logout on browser close)

**Dashboard Tabs:**

1. **Upload Files**
   - Form fields: File/Project Name, Category (DTCP/Local Body/Vasthu/GO), Subcategory, Assign to Client
   - File picker: Supports images, PDF, DWG, DOC, XLS
   - Toggle: Show on public website (on/off)
   - File list with delete button + 10-second undo
   - Shows Public/Private/Client assigned status

2. **Showcase**
   - Lists all uploaded files
   - Assign files to clients (dropdown)
   - Toggle Public/Private button per file
   - Public files appear on guest website Projects section
   - View file preview

3. **Clients**
   - Create client form: Name, Username, Password, Phone, Project Name
   - Lists all clients with avatar initial, username, phone, project name
   - Delete client button (with confirmation)

4. **Reviews**
   - Lists all submitted reviews with star rating
   - Pending badge (yellow) / Approved badge (green)
   - Approve button (✓) — makes review visible on public site
   - Delete button

5. **Homepage**
   - Toggle visibility of sections: Hero, Overview, Services, Projects, Reviews, Contact
   - Changes saved instantly to localStorage
   - Hidden sections disappear from guest view

### Client Portal (`/client`)
**Login:**
- Username + Password (created by admin)
- Session: Stored in `localStorage` (persists across browser sessions)

**Features:**
- Welcome header with client name
- Shows project name (if set by admin)
- Grid of all files assigned to that client
- Each file card shows: name, upload date, category › subcategory
- View button — opens file in modal (image preview or PDF iframe)
- Download button — downloads file directly
- Logout button

**File Viewer Modal:**
- Images displayed inline
- PDFs shown in iframe
- Other file types show "download to view" message

### Public Website Integration
- **Projects Section**: Shows all files marked as "Public" by admin
- **Reviews Section**: Shows only approved reviews
- **Homepage Sections**: Respects visibility settings from admin panel
- **Navbar**: Admin and Client login buttons added

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Updated with login buttons
│   ├── ProjectsSection.tsx     # Shows public files
│   ├── ReviewsSection.tsx      # Shows approved reviews
│   └── ProtectedRoute.tsx      # Route authentication guard
├── context/
│   └── AuthContext.tsx         # Authentication state management
├── lib/
│   └── storage.ts              # localStorage utilities
├── pages/
│   ├── AdminLogin.tsx          # Admin login page
│   ├── AdminDashboard.tsx      # Admin dashboard with 5 tabs
│   ├── ClientLogin.tsx         # Client login page
│   ├── ClientPortal.tsx        # Client file viewer
│   └── Index.tsx               # Updated homepage
├── types/
│   └── index.ts                # TypeScript interfaces
└── App.tsx                     # Updated with routes
```

## 🔐 Authentication Flow

### Admin
1. Navigate to `/admin`
2. Enter password: `dmv2026`
3. Redirects to `/admin/dashboard`
4. Session stored in `sessionStorage` (clears on browser close)

### Client
1. Navigate to `/client`
2. Enter username and password (created by admin)
3. Redirects to `/client/portal`
4. Session stored in `localStorage` (persists)

## 💾 Data Storage

All data is stored in browser `localStorage`:
- `dmv_files` - Uploaded files
- `dmv_clients` - Client accounts
- `dmv_reviews` - Customer reviews
- `dmv_homepage` - Homepage section visibility
- `dmv_admin` - Admin session (sessionStorage)
- `dmv_client` - Client session (localStorage)

## 🎯 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage |
| `/admin` | Public | Admin login |
| `/admin/dashboard` | Admin only | Admin dashboard |
| `/client` | Public | Client login |
| `/client/portal` | Client only | Client file portal |

## 🔧 Usage Instructions

### For Admin:
1. Login at `/admin` with password `dmv2026`
2. **Upload Files**: Add files with categories and assign to clients
3. **Showcase**: Manage file visibility (public/private) and client assignments
4. **Clients**: Create client accounts with credentials
5. **Reviews**: Approve or delete customer reviews
6. **Homepage**: Toggle section visibility on public website

### For Clients:
1. Admin creates your account with username/password
2. Login at `/client` with your credentials
3. View all files assigned to you
4. Download or preview files
5. Session persists across browser sessions

### For Public Users:
1. Visit homepage at `/`
2. Submit reviews (pending admin approval)
3. View public projects in Projects section
4. See approved reviews in Reviews section

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Notes

- All data is stored locally in browser storage
- No backend server required
- Admin session expires on browser close
- Client session persists until logout
- File uploads are stored as base64 in localStorage
- Supported file types: Images, PDF, DWG, DOC, DOCX, XLS, XLSX
- Rate limiting: 5 login attempts per 60 seconds

## 🎨 UI Features

- Responsive design for mobile/tablet/desktop
- Smooth animations and transitions
- File preview modal for images and PDFs
- 10-second undo for file deletion
- Real-time updates across tabs
- Premium card designs with hover effects
- Toast notifications for actions

## 🔒 Security Features

- Password-based authentication
- Rate limiting on login attempts
- Protected routes with authentication guards
- Session management (sessionStorage for admin, localStorage for clients)
- Input validation and sanitization
- Secure file handling

---

**DMV Construction** - Trusted Real Estate Builders & Construction Company in Dharmapuri, Tamil Nadu

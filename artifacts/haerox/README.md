# HAEROX Agency Website

This is a premium static website for HAEROX, a global creative and digital agency. The project is built completely without backend dependencies to be easily deployable to standard web hosting (such as Hostinger).

## Technologies Used
- HTML5
- CSS3 (Vanilla, custom variables, custom animations)
- Vanilla JavaScript (Custom cursor, intersection observers, counters, filtering)
- No frameworks, no external libraries, no database

## Folder Structure
```text
/
├── index.html        # Homepage
├── services.html     # Services details
├── portfolio.html    # Portfolio gallery with JS filtering
├── about.html        # About the agency
├── contact.html      # Contact form with JS validation
├── privacy.html      # Privacy Policy placeholder
├── terms.html        # Terms & Conditions placeholder
├── css/
│   └── style.css     # Main stylesheet (vars, layouts, responsive, animations)
├── js/
│   └── script.js     # Interactivity (cursor, nav, scroll, filtering)
├── images/           # All assets, localized
│   ├── logo/
│   ├── hero/
│   ├── services/
│   ├── portfolio/
│   └── about/
└── README.md
```

## How to Run Locally
Because this project uses pure HTML/CSS/JS, you can simply open `index.html` in your browser. For the best experience (to ensure local fonts or module scripts work if ever added), serve the directory with a simple local server:
```bash
python -m http.server 8000
# or
npx serve
```
Then visit `http://localhost:8000`

## How to Deploy (Hostinger)
1. Log into your Hostinger control panel (hPanel).
2. Open the File Manager for your domain (e.g., `haerox.com`).
3. Navigate to the `public_html` directory.
4. Upload all files from this directory directly into `public_html`.
5. Your website will be live immediately.

## Where to Edit Content
- **Text & Copy:** Open the respective `.html` files in any text editor.
- **Images:** Replace the `.jpg` and `.png` files in the `/images/` directory. Be sure to keep the filenames the same, or update the `src` paths in the HTML files.
- **Colors & Fonts:** Modify the CSS custom properties (`:root`) at the top of `css/style.css`.
- **Contact Information:** Update the static information in `contact.html`. 

## Form Handling
The contact form currently uses frontend validation (JavaScript) and simulates a success message. To connect it to your email inbox, you can use a service like Formspree or Formbold by changing the `<form>` action attribute:
```html
<form action="https://formspree.io/f/YOUR_ENDPOINT" method="POST">
```

## Custom Cursor
The custom cursor is implemented in `js/script.js` and styled in `css/style.css`. It automatically disables on touch devices (screens < 1024px) for better usability.

## Browser Support
Tested and fully supported on modern browsers (Chrome, Safari, Firefox, Edge, Safari iOS, Chrome Android).

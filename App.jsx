import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  el: {
    home: 'Αρχική', guide: 'Οδηγός', local: 'Περιοχή', extras: 'Υπηρεσίες', help: 'Βοήθεια',
    yourHost: 'Ο οικοδεσπότης σας', wifiPassword: 'Κωδικός WiFi', tapToCopy: 'Πατήστε για αντιγραφή',
    checkIn: 'Άφιξη', checkOut: 'Αναχώρηση', parking: 'Στάθμευση', parkingSpot: 'Ιδιωτικό parking',
    rules: 'Κανόνες', appliances: 'Συσκευές', whereIs: 'Πού είναι;', beaches: 'Παραλίες',
    restaurants: 'Εστιατόρια', transport: 'Μετακινήσεις', houseGuide: 'Οδηγός Βίλας',
    houseRules: 'Κανόνες Βίλας', checkout: 'Αναχώρηση', checkoutTime: 'Ώρα αναχώρησης',
    beforeYouLeave: 'Πριν φύγετε:', localGuide: 'Τοπικός Οδηγός', nightlife: 'Νυχτερινή Ζωή',
    directions: 'Οδηγίες', away: 'απόσταση', extrasServices: 'Πρόσθετες Υπηρεσίες',
    enhanceStay: 'Βελτιώστε τη διαμονή σας', request: 'Αίτημα', helpContacts: 'Βοήθεια & Επικοινωνία',
    call: 'Κλήση', emergency: 'Έκτακτη Ανάγκη', policeAmbulance: 'Αστυνομία/Ασθενοφόρο',
    european: 'Ευρωπαϊκό', wifiConnection: 'Σύνδεση WiFi', networkName: 'Όνομα Δικτύου',
    password: 'Κωδικός', copy: 'Αντιγραφή', copied: 'Αντιγράφηκε!', back: 'Πίσω',
    pool: 'Πισίνα', bbq: 'BBQ', poolRules: 'Κανόνες Πισίνας', bbqInstructions: 'Οδηγίες BBQ'
  },
  en: {
    home: 'Home', guide: 'Guide', local: 'Local', extras: 'Extras', help: 'Help',
    yourHost: 'Your Host', wifiPassword: 'WiFi Password', tapToCopy: 'Tap to copy',
    checkIn: 'Check-in', checkOut: 'Check-out', parking: 'Parking', parkingSpot: 'Private parking',
    rules: 'Rules', appliances: 'Appliances', whereIs: 'Where is?', beaches: 'Beaches',
    restaurants: 'Restaurants', transport: 'Transport', houseGuide: 'Villa Guide',
    houseRules: 'Villa Rules', checkout: 'Check-out', checkoutTime: 'Check-out time',
    beforeYouLeave: 'Before you leave:', localGuide: 'Local Guide', nightlife: 'Nightlife',
    directions: 'Directions', away: 'away', extrasServices: 'Extra Services',
    enhanceStay: 'Enhance your stay', request: 'Request', helpContacts: 'Help & Contacts',
    call: 'Call', emergency: 'Emergency', policeAmbulance: 'Police/Ambulance',
    european: 'European', wifiConnection: 'WiFi Connection', networkName: 'Network Name',
    password: 'Password', copy: 'Copy', copied: 'Copied!', back: 'Back',
    pool: 'Pool', bbq: 'BBQ', poolRules: 'Pool Rules', bbqInstructions: 'BBQ Instructions'
  }
};

// ============================================
// ICONS
// ============================================
const Icons = {
  Home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Wifi: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>,
  Book: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  MapPin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Gift: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>,
  Clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Car: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>,
  ChevronRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
  ChevronLeft: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Star: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Navigation: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  AlertCircle: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
  Globe: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Waves: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>,
  Utensils: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  Plane: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
};

// ============================================
// NARCISSOS VILLA DORIA DATA
// ============================================
const propertyData = {
  name: { el: "Narcissos Villa Doria", en: "Narcissos Villa Doria" },
  location: { el: "Πρωταράς, Κύπρος", en: "Protaras, Cyprus" },
  host: { name: "Andreas Philippou", photo: "🏠" },
  welcome: { 
    el: "Καλώς ήρθατε στη Villa Doria! Είμαστε οικογενειακή επιχείρηση από το 2013 και χαιρόμαστε που σας φιλοξενούμε. Καλές διακοπές!",
    en: "Welcome to Villa Doria! We're a family-run business since 2013 and we're delighted to host you. Enjoy your holiday!"
  },
  wifi: { network: "VillaDoria_Guest", password: "Narcissos2024" },
  checkIn: { time: "15:00", parking: { el: "Ιδιωτικό parking εντός οικοπέδου", en: "Private off-street parking" } },
  checkOut: { time: "10:30" },
  phone: "+357 99 684 868",
  email: "info@narcissosvillas.com",
  
  rules: [
    { text: { el: "Απαγορεύεται το κάπνισμα εντός της βίλας", en: "No smoking inside the villa" }, icon: "🚭", warn: true },
    { text: { el: "Απαγορεύονται τα πάρτι και οι συγκεντρώσεις", en: "No parties or gatherings allowed" }, icon: "🎉", warn: true },
    { text: { el: "Δεν επιτρέπονται κατοικίδια", en: "No pets allowed" }, icon: "🐕", warn: true },
    { text: { el: "Ηλεκτρικό: 30 kWh/ημέρα περιλαμβάνεται", en: "Electricity: 30 kWh/day included" }, icon: "⚡", warn: false },
    { text: { el: "Επισκέπτες κάτω των 25: €300 εγγύηση", en: "Guests under 25: €300 security deposit" }, icon: "💳", warn: false }
  ],
  
  poolRules: [
    { text: { el: "Χρήση πισίνας: 09:00 - 21:00", en: "Pool hours: 09:00 - 21:00" }, icon: "🕐" },
    { text: { el: "Ντους πριν την πισίνα", en: "Shower before swimming" }, icon: "🚿" },
    { text: { el: "Όχι γυάλινα αντικείμενα κοντά στην πισίνα", en: "No glass near the pool" }, icon: "🥛" },
    { text: { el: "Επίβλεψη παιδιών ανά πάσα στιγμή", en: "Supervise children at all times" }, icon: "👨‍👩‍👧" }
  ],
  
  appliances: [
    { name: { el: "Κλιματισμός", en: "Air Conditioning" }, icon: "❄️", info: { el: "Τηλεχειριστήριο δίπλα στην TV. Κλείστε παράθυρα όταν λειτουργεί.", en: "Remote next to TV. Close windows when running." }},
    { name: { el: "Smart TV 43\"", en: "Smart TV 43\"" }, icon: "📺", info: { el: "Δορυφορικά κανάλια. Netflix διαθέσιμο - συνδεθείτε με τον λογαριασμό σας.", en: "Satellite channels. Netflix available - login with your account." }},
    { name: { el: "Πλυντήριο Ρούχων", en: "Washing Machine" }, icon: "🧺", info: { el: "Απορρυπαντικό παρέχεται. Πρόγραμμα 3 για κανονικά ρούχα.", en: "Detergent provided. Program 3 for regular clothes." }},
    { name: { el: "Πλυντήριο Πιάτων", en: "Dishwasher" }, icon: "🍽️", info: { el: "Ταμπλέτες κάτω από τον νεροχύτη. Eco πρόγραμμα συνιστάται.", en: "Tablets under sink. Eco program recommended." }},
    { name: { el: "Καφετιέρα", en: "Coffee Maker" }, icon: "☕", info: { el: "Φίλτρα και καφές στο ντουλάπι πάνω από τον πάγκο.", en: "Filters and coffee in cabinet above counter." }},
    { name: { el: "BBQ", en: "BBQ" }, icon: "🔥", info: { el: "Κάρβουνα στην αποθήκη. Παρακαλώ καθαρίστε μετά τη χρήση.", en: "Charcoal in storage. Please clean after use." }}
  ],
  
  whereIs: [
    { item: { el: "Επιπλέον πετσέτες", en: "Extra towels" }, loc: { el: "Ντουλάπα υπνοδωματίου, πάνω ράφι", en: "Bedroom wardrobe, top shelf" }, icon: "🛁" },
    { item: { el: "Πετσέτες πισίνας", en: "Pool towels" }, loc: { el: "Ντουλάπι δίπλα στην είσοδο πισίνας", en: "Cabinet next to pool entrance" }, icon: "🏊" },
    { item: { el: "Σίδερο & σιδερώστρα", en: "Iron & ironing board" }, loc: { el: "Ντουλάπα υπνοδωματίου 1", en: "Bedroom 1 wardrobe" }, icon: "👔" },
    { item: { el: "Πιστολάκι μαλλιών", en: "Hairdryer" }, loc: { el: "Συρτάρι μπάνιου", en: "Bathroom drawer" }, icon: "💇" },
    { item: { el: "Χρηματοκιβώτιο", en: "Safe deposit box" }, loc: { el: "Ντουλάπα κύριου υπνοδωματίου", en: "Master bedroom wardrobe" }, icon: "🔒" },
    { item: { el: "Φαρμακείο", en: "First aid kit" }, loc: { el: "Ντουλάπι κουζίνας, δεξιά του ψυγείου", en: "Kitchen cabinet, right of fridge" }, icon: "🩹" }
  ],
  
  restaurants: [
    { name: "Spartiatis", type: { el: "Ελληνική/Κυπριακή", en: "Greek/Cypriot" }, dist: "1.2km", rating: 4.7, price: "€€" },
    { name: "Kalamies Beach Restaurant", type: { el: "Θαλασσινά", en: "Seafood" }, dist: "2km", rating: 4.8, price: "€€€" },
    { name: "Limanaki Fish & Grill", type: { el: "Ψαροταβέρνα", en: "Fish Tavern" }, dist: "3km", rating: 4.6, price: "€€" },
    { name: "The Frying Dutchman", type: { el: "Fish & Chips", en: "Fish & Chips" }, dist: "2.5km", rating: 4.5, price: "€" }
  ],
  
  beaches: [
    { name: { el: "Παραλία Κόννος", en: "Konnos Beach" }, dist: "1km", desc: { el: "Εντυπωσιακός κόλπος, κρυστάλλινα νερά, ξαπλώστρες διαθέσιμες", en: "Stunning bay, crystal clear water, sunbeds available" }},
    { name: { el: "Fig Tree Bay", en: "Fig Tree Bay" }, dist: "2km", desc: { el: "Βραβευμένη παραλία, ρηχά νερά ιδανικά για παιδιά", en: "Award-winning beach, shallow water ideal for kids" }},
    { name: { el: "Nissi Beach", en: "Nissi Beach" }, dist: "8km", desc: { el: "Διάσημη παραλία Αγίας Νάπας, πολύ κόσμος το καλοκαίρι", en: "Famous Ayia Napa beach, busy in summer" }},
    { name: { el: "Παραλία Αγίας Θέκλας", en: "Ayia Thekla Beach" }, dist: "10km", desc: { el: "Πιο ήσυχη, οικογενειακή ατμόσφαιρα", en: "Quieter, family-friendly atmosphere" }}
  ],
  
  extras: [
    { name: { el: "Αργοπορημένη αναχώρηση (14:00)", en: "Late Check-out (14:00)" }, price: "€30", icon: "🕐", note: { el: "Κατόπιν διαθεσιμότητας", en: "Subject to availability" } },
    { name: { el: "Πρόωρη άφιξη (12:00)", en: "Early Check-in (12:00)" }, price: "€25", icon: "🌅", note: { el: "Κατόπιν διαθεσιμότητας", en: "Subject to availability" } },
    { name: { el: "Μεταφορά από αεροδρόμιο Λάρνακας", en: "Larnaca Airport Transfer" }, price: "€50", icon: "✈️", note: { el: "Επιστροφή: €50", en: "Return: €50" } },
    { name: { el: "Ενοικίαση αυτοκινήτου", en: "Car Rental" }, price: "", icon: "🚗", note: { el: "Ρωτήστε μας για προσφορές", en: "Ask us for deals" } },
    { name: { el: "Επιπλέον καθαρισμός", en: "Extra Cleaning" }, price: "€40", icon: "🧹", note: { el: "Για διαμονές 10+ διανυκτερεύσεις: 1 δωρεάν", en: "For stays 10+ nights: 1 free" } }
  ],
  
  checkoutTasks: {
    el: ["Κλείστε όλα τα παράθυρα και πόρτες", "Απενεργοποιήστε κλιματισμό", "Βάλτε τα πιάτα στο πλυντήριο", "Αφήστε τα κλειδιά στο τραπέζι κουζίνας", "Βγάλτε τα σκουπίδια στον κάδο έξω"],
    en: ["Close all windows and doors", "Turn off air conditioning", "Put dishes in dishwasher", "Leave keys on kitchen table", "Take trash to bin outside"]
  },

  transport: {
    taxi: "+357 23 831 831",
    bus: { el: "Στάση 400μ - Γραμμές 101, 102 προς Πρωταράς/Αγία Νάπα", en: "Stop 400m - Routes 101, 102 to Protaras/Ayia Napa" },
    airports: [
      { name: "Larnaca (LCA)", dist: "55km", time: "45 min" },
      { name: "Paphos (PFO)", dist: "150km", time: "1h 45min" }
    ]
  }
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [lang, setLang] = useState('el');
  const [view, setView] = useState('home');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState('rules');
  const [localTab, setLocalTab] = useState('beaches');
  
  const t = translations[lang];
  const getText = (obj) => typeof obj === 'object' && obj !== null ? (obj[lang] || obj.en || obj) : obj;

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const LangToggle = () => (
    <button onClick={() => setLang(lang === 'el' ? 'en' : 'el')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm">
      <Icons.Globe className="w-4 h-4" />
      <span className="font-medium">{lang === 'el' ? 'EN' : 'ΕΛ'}</span>
    </button>
  );

  const Nav = () => (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 z-20">
      <div className="flex justify-around">
        {[
          { id: 'home', icon: Icons.Home, label: t.home },
          { id: 'house', icon: Icons.Book, label: t.guide },
          { id: 'local', icon: Icons.MapPin, label: t.local },
          { id: 'extras', icon: Icons.Gift, label: t.extras },
          { id: 'contact', icon: Icons.Phone, label: t.help }
        ].map(n => (
          <motion.button key={n.id} onClick={() => setView(n.id)} whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${view === n.id ? 'text-cyan-400 bg-cyan-500/20' : 'text-white/50 hover:text-white/80'}`}>
            <n.icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{n.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const Header = ({ title, showBack = false }) => (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-4 border-b border-white/10">
      <div className="flex items-center justify-between">
        {showBack ? (
          <motion.button onClick={() => setView('home')} whileTap={{ scale: 0.95 }} className="p-2 -ml-2 rounded-lg hover:bg-white/10">
            <Icons.ChevronLeft className="w-6 h-6" />
          </motion.button>
        ) : <div className="w-10" />}
        <div className="text-center flex-1">
          <h1 className="text-lg font-semibold">{title}</h1>
          {view === 'home' && <p className="text-xs text-white/50">{getText(propertyData.location)}</p>}
        </div>
        <LangToggle />
      </div>
    </div>
  );

  const GlassCard = ({ children, className = "", gradient = "from-white/5 to-white/10", onClick }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick} className={`bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-2xl border border-white/10 ${onClick ? 'cursor-pointer hover:border-white/20 transition-colors' : ''} ${className}`}>
      {children}
    </motion.div>
  );

  // ============================================
  // VIEWS
  // ============================================

  const HomeView = () => (
    <div className="space-y-4">
      <GlassCard gradient="from-cyan-500/20 to-blue-600/20" className="p-5">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
            {propertyData.host.photo}
          </div>
          <div>
            <p className="text-cyan-300 text-sm">{t.yourHost}</p>
            <p className="font-semibold text-white text-lg">{propertyData.host.name}</p>
          </div>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">{getText(propertyData.welcome)}</p>
      </GlassCard>

      <GlassCard gradient="from-violet-500/30 to-purple-600/30" className="p-4" onClick={() => setView('wifi')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Icons.Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">{t.wifiPassword}</p>
              <p className="text-violet-300 text-sm">{t.tapToCopy}</p>
            </div>
          </div>
          <Icons.ChevronRight className="w-6 h-6 text-violet-300" />
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard gradient="from-emerald-500/20 to-green-600/20" className="p-4">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Icons.Clock className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">{t.checkIn}</span>
          </div>
          <p className="text-3xl font-bold text-white">{propertyData.checkIn.time}</p>
        </GlassCard>
        <GlassCard gradient="from-orange-500/20 to-red-600/20" className="p-4">
          <div className="flex items-center gap-2 text-orange-400 mb-1">
            <Icons.Clock className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">{t.checkOut}</span>
          </div>
          <p className="text-3xl font-bold text-white">{propertyData.checkOut.time}</p>
        </GlassCard>
      </div>

      <GlassCard gradient="from-blue-500/20 to-sky-600/20" className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center">
            <Icons.Car className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-blue-300">{t.parking}</p>
            <p className="text-white/50 text-sm">{getText(propertyData.checkIn.parking)}</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: "📋", label: t.rules, action: () => { setView('house'); setTab('rules'); }, color: 'from-rose-500/20 to-pink-600/20' },
          { icon: "🏊", label: t.pool, action: () => { setView('house'); setTab('pool'); }, color: 'from-cyan-500/20 to-blue-600/20' },
          { icon: "🔌", label: t.appliances, action: () => { setView('house'); setTab('appliances'); }, color: 'from-indigo-500/20 to-violet-600/20' },
          { icon: "🔍", label: t.whereIs, action: () => { setView('house'); setTab('whereis'); }, color: 'from-teal-500/20 to-cyan-600/20' },
          { icon: "🏖️", label: t.beaches, action: () => { setView('local'); setLocalTab('beaches'); }, color: 'from-amber-500/20 to-orange-600/20' },
          { icon: "🍽️", label: t.restaurants, action: () => { setView('local'); setLocalTab('restaurants'); }, color: 'from-green-500/20 to-emerald-600/20' }
        ].map((item, i) => (
          <motion.button key={i} onClick={item.action} whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`bg-gradient-to-br ${item.color} backdrop-blur rounded-xl p-3 border border-white/10 hover:border-white/20 transition-colors`}>
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="text-xs font-medium text-white/80">{item.label}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const WifiView = () => (
    <div className="space-y-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-violet-500/40">
          <Icons.Wifi className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">{t.wifiConnection}</h2>
      </motion.div>
      <GlassCard className="overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wide mb-1">{t.networkName}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-mono font-semibold text-white">{propertyData.wifi.network}</p>
            <motion.button onClick={() => copy(propertyData.wifi.network)} whileTap={{ scale: 0.95 }}
              className="text-cyan-400 text-sm font-medium px-4 py-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-colors">{t.copy}</motion.button>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-r from-violet-500/20 to-purple-500/20">
          <p className="text-xs text-white/40 uppercase tracking-wide mb-1">{t.password}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-mono font-bold text-violet-300">{propertyData.wifi.password}</p>
            <motion.button onClick={() => copy(propertyData.wifi.password)} whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/30">{t.copy}</motion.button>
          </div>
        </div>
      </GlassCard>
      <AnimatePresence>
        {copied && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg z-50">
            ✓ {t.copied}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const HouseView = () => (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {[
          { id: 'rules', label: t.houseRules },
          { id: 'pool', label: t.poolRules },
          { id: 'appliances', label: t.appliances },
          { id: 'whereis', label: t.whereIs },
          { id: 'checkout', label: t.checkout }
        ].map(item => (
          <motion.button key={item.id} onClick={() => setTab(item.id)} whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === item.id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
            {item.label}
          </motion.button>
        ))}
      </div>

      {tab === 'rules' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {propertyData.rules.map((rule, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard gradient={rule.warn ? "from-amber-500/20 to-orange-600/20" : "from-white/5 to-white/10"} className="p-4 flex items-center gap-4">
                <span className="text-2xl">{rule.icon}</span>
                <p className={rule.warn ? 'font-medium text-amber-300' : 'text-white/80'}>{getText(rule.text)}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {tab === 'pool' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <GlassCard gradient="from-cyan-500/20 to-blue-600/20" className="p-4 text-center">
            <span className="text-4xl">🏊‍♂️</span>
            <h3 className="text-lg font-semibold text-white mt-2">{t.poolRules}</h3>
          </GlassCard>
          {propertyData.poolRules.map((rule, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-4 flex items-center gap-4">
                <span className="text-2xl">{rule.icon}</span>
                <p className="text-white/80">{getText(rule.text)}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {tab === 'appliances' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {propertyData.appliances.map((item, i) => (
            <motion.details key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="group">
              <summary className="cursor-pointer list-none">
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-white">{getText(item.name)}</span>
                  </div>
                  <Icons.ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform" />
                </GlassCard>
              </summary>
              <div className="mt-2 ml-4">
                <GlassCard gradient="from-cyan-500/10 to-blue-600/10" className="p-4">
                  <p className="text-white/70 text-sm">{getText(item.info)}</p>
                </GlassCard>
              </div>
            </motion.details>
          ))}
        </motion.div>
      )}

      {tab === 'whereis' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {propertyData.whereIs.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-4 flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-medium text-white">{getText(item.item)}</p>
                  <p className="text-sm text-white/50">{getText(item.loc)}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {tab === 'checkout' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <GlassCard gradient="from-orange-500/30 to-red-600/30" className="p-6 text-center">
            <Icons.Clock className="w-12 h-12 text-orange-400 mx-auto mb-2" />
            <p className="text-orange-300 text-sm">{t.checkoutTime}</p>
            <p className="text-5xl font-bold text-white">{propertyData.checkOut.time}</p>
          </GlassCard>
          <GlassCard className="p-5">
            <h3 className="font-semibold text-white mb-4">{t.beforeYouLeave}</h3>
            <ul className="space-y-3">
              {propertyData.checkoutTasks[lang].map((task, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 text-white/70">
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 flex-shrink-0" />
                  <span className="text-sm">{task}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );

  const LocalView = () => (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {[
          { id: 'beaches', label: t.beaches, icon: Icons.Waves },
          { id: 'restaurants', label: t.restaurants, icon: Icons.Utensils },
          { id: 'transport', label: t.transport, icon: Icons.Car }
        ].map(item => (
          <motion.button key={item.id} onClick={() => setLocalTab(item.id)} whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${localTab === item.id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
            <item.icon className="w-4 h-4" />
            {item.label}
          </motion.button>
        ))}
      </div>

      {localTab === 'beaches' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {propertyData.beaches.map((beach, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard gradient="from-cyan-500/20 to-blue-600/20" className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{getText(beach.name)}</h4>
                  <span className="text-xs text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded-full">{beach.dist}</span>
                </div>
                <p className="text-sm text-white/60">{getText(beach.desc)}</p>
                <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1 text-cyan-400 text-sm font-medium mt-3">
                  <Icons.Navigation className="w-4 h-4" /> {t.directions}
                </motion.button>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {localTab === 'restaurants' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {propertyData.restaurants.map((place, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{place.name}</h4>
                    <p className="text-sm text-white/50">{getText(place.type)} · {place.price}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-1 rounded-lg">
                    <Icons.Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">{place.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-white/40">{place.dist} {t.away}</span>
                  <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1 text-cyan-400 text-sm font-medium">
                    <Icons.Navigation className="w-4 h-4" /> {t.directions}
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {localTab === 'transport' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <GlassCard gradient="from-yellow-500/20 to-amber-600/20" className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icons.Car className="w-6 h-6 text-yellow-400" />
              <h3 className="font-semibold text-white">Taxi</h3>
            </div>
            <p className="text-white/60 text-sm">{propertyData.transport.taxi}</p>
            <p className="text-white/50 text-sm mt-1">{lang === 'el' ? 'Εφαρμογές: Bolt' : 'Apps: Bolt'}</p>
          </GlassCard>

          <GlassCard gradient="from-blue-500/20 to-indigo-600/20" className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🚌</span>
              <h3 className="font-semibold text-white">{lang === 'el' ? 'Λεωφορείο' : 'Bus'}</h3>
            </div>
            <p className="text-white/60 text-sm">{getText(propertyData.transport.bus)}</p>
          </GlassCard>

          <GlassCard gradient="from-sky-500/20 to-cyan-600/20" className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icons.Plane className="w-6 h-6 text-sky-400" />
              <h3 className="font-semibold text-white">{lang === 'el' ? 'Αεροδρόμια' : 'Airports'}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {propertyData.transport.airports.map((apt, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-white/40 text-xs">{apt.name}</p>
                  <p className="text-white font-medium">{apt.dist}</p>
                  <p className="text-white/50 text-xs">{apt.time}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );

  const ExtrasView = () => (
    <div className="space-y-4">
      <GlassCard gradient="from-purple-500/30 to-pink-600/30" className="p-5 text-center">
        <Icons.Gift className="w-10 h-10 text-purple-300 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-white">{t.extrasServices}</h2>
        <p className="text-purple-200 text-sm">{t.enhanceStay}</p>
      </GlassCard>
      <div className="space-y-3">
        {propertyData.extras.map((extra, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{extra.icon}</span>
                  <div>
                    <p className="font-medium text-white">{getText(extra.name)}</p>
                    {extra.note && <p className="text-xs text-white/50">{getText(extra.note)}</p>}
                  </div>
                </div>
                <div className="text-right">
                  {extra.price && <span className="font-bold text-cyan-400">{extra.price}</span>}
                  <motion.button whileTap={{ scale: 0.95 }} className="block text-xs text-cyan-400 mt-1 hover:underline">{t.request}</motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="space-y-4">
      <GlassCard gradient="from-cyan-500/20 to-blue-600/20" className="p-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 text-4xl shadow-xl shadow-cyan-500/30">
          {propertyData.host.photo}
        </div>
        <h2 className="text-xl font-bold text-white">{propertyData.host.name}</h2>
        <p className="text-cyan-300 text-sm">{t.yourHost}</p>
        <p className="text-white/50 text-xs mt-1">Narcissos Villas</p>
        <div className="flex gap-3 mt-4">
          <motion.a href={`tel:${propertyData.phone}`} whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30">
            <Icons.Phone className="w-5 h-5" /> {t.call}
          </motion.a>
          <motion.a href={`https://wa.me/${propertyData.phone.replace(/\s/g, '')}`} whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30">
            💬 WhatsApp
          </motion.a>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <p className="text-white/50 text-sm text-center">📧 {propertyData.email}</p>
      </GlassCard>

      <GlassCard gradient="from-red-500/20 to-rose-600/20" className="p-4">
        <h3 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
          <Icons.AlertCircle className="w-5 h-5" /> {t.emergency}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <motion.a href="tel:199" whileTap={{ scale: 0.95 }} className="bg-white/10 rounded-xl p-3 text-center hover:bg-white/20 transition-colors">
            <p className="text-xs text-white/50">{t.policeAmbulance}</p>
            <p className="font-mono font-bold text-red-400 text-2xl">199</p>
          </motion.a>
          <motion.a href="tel:112" whileTap={{ scale: 0.95 }} className="bg-white/10 rounded-xl p-3 text-center hover:bg-white/20 transition-colors">
            <p className="text-xs text-white/50">{t.european}</p>
            <p className="font-mono font-bold text-red-400 text-2xl">112</p>
          </motion.a>
        </div>
      </GlassCard>
    </div>
  );

  const views = { home: <HomeView />, wifi: <WifiView />, house: <HouseView />, local: <LocalView />, extras: <ExtrasView />, contact: <ContactView /> };
  const titles = { home: getText(propertyData.name), wifi: t.wifiConnection, house: t.houseGuide, local: t.localGuide, extras: t.extrasServices, contact: t.helpContacts };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md mx-auto min-h-screen relative">
        <div className="fixed inset-0 max-w-md mx-auto overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Header title={titles[view]} showBack={view !== 'home'} />
          <main className="p-4 pb-24">
            <AnimatePresence mode="wait">
              <motion.div key={view} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                {views[view]}
              </motion.div>
            </AnimatePresence>
          </main>
          <Nav />
        </div>
        <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto text-center pb-2 pointer-events-none z-10">
          <p className="text-[10px] text-white/20">Powered by Philoxeno</p>
        </div>
      </div>
    </div>
  );
}

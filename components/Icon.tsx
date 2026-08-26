import type { SVGProps } from 'react';

const paths: Record<string, React.ReactNode> = {
 paw:<><path d="M11.5 15.5c-2.4 0-4.6 1.6-4.6 3.5 0 1.5 1.2 2.5 2.8 2.5 1.1 0 1.7-.4 2.8-.4s1.7.4 2.8.4c1.6 0 2.8-1 2.8-2.5 0-1.9-2.2-3.5-4.6-3.5z"/><path d="M7 12c1.1 0 2-1.1 2-2.5S8.1 7 7 7 5 8.1 5 9.5 5.9 12 7 12zM17 12c1.1 0 2-1.1 2-2.5S18.1 7 17 7s-2 1.1-2 2.5.9 2.5 2 2.5zM12 9c1.2 0 2.2-1.3 2.2-2.9S13.2 3.2 12 3.2 9.8 4.5 9.8 6.1 10.8 9 12 9z"/></>,
 user:<><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></>,
 layout:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 home:<><path d="M3 11 12 3l9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-6h6v6"/></>,
 calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
 plus:<path d="M12 5v14M5 12h14"/>,
 stethoscope:<><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M4 3h4M12 3h4M10 13v2a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="10" r="2"/></>,
 syringe:<path d="m18 2 4 4-6 6-4-4zM12 8 5 15M4 14l6 6M2 22l3-3M14 4l6 6"/>,
 flask:<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 14h8"/></>,
 bandage:<><path d="m7 17 10-10a4 4 0 1 1 6 6L13 23a4 4 0 0 1-6-6z"/><path d="m10 14 4 4M14 10l4 4"/></>,
 bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
 message:<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>,
 bag:<><path d="M6 8h12l1 13H5z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
 map:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></>,
 edit:<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/></>,
 search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
 send:<><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></>,
 x:<path d="m6 6 12 12M18 6 6 18"/>,
 check:<path d="m5 12 4 4L19 6"/>,
 users:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
 chart:<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
 clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
 heartPulse:<><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/><path d="M4.8 12h3l1.3-3 2.2 6 1.8-4 1.2 1h4.9"/></>,
 shieldPaw:<><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6z"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><circle cx="12" cy="9" r="1"/><path d="M9.5 15c.7-1 1.5-1.5 2.5-1.5s1.8.5 2.5 1.5"/></>,
 chip:<><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></>,
 chevronRight:<path d="m9 18 6-6-6-6"/>,
 chevronDown:<path d="m6 9 6 6 6-6"/>,
 chevronUp:<path d="m18 15-6-6-6 6"/>,
 heart:<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>,
 document:<><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6M9 9h2"/></>,
 history:<><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></>,
 lock:<><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
 phone:<><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></>,
 globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
 settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4a1.7 1.7 0 0 0 1-1.6V2h4v.4A1.7 1.7 0 0 0 15 4a1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v4H21a1.7 1.7 0 0 0-1.6 1z"/></>,
};

export function Icon({name,...props}:{name:string}&SVGProps<SVGSVGElement>){
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]??paths.paw}</svg>;
}

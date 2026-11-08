# MobileMenu Implementation Guide

## Quick Reference

The **MobileMenu** component is a responsive, accessible mobile navigation menu that automatically shows/hides based on screen size.

---

## Usage

### In NavLinks Component

```typescript
import MobileMenu from "./MobileMenu";

export default function NavLinks() {
    return (
        <MobileMenu>
            <ul className="...">
                {/* Navigation links here */}
            </ul>
        </MobileMenu>
    );
}
```

### How It Works

1. **Mobile View** (< 64rem / < 1024px)
   - Shows hamburger button in top-right
   - Click button to toggle dropdown menu
   - Menu appears below header with animation

2. **Desktop View** (≥ 64rem / ≥ 1024px)
   - Hamburger button hidden with `lg:hidden`
   - Navigation displays inline
   - Menu always visible

---

## Features

### 🎯 Interactivity
| Feature | Trigger | Action |
|---------|---------|--------|
| Click link | Link clicked | Menu closes automatically |
| Click outside | Click outside menu/button | Menu closes |
| Press Escape | Escape key | Menu closes, focus returns to button |
| Scroll page | User scrolls | Menu closes |
| Resize to desktop | Window resized to ≥ 64rem | Menu closes |

### ♿ Accessibility Features
- `aria-expanded`: Shows menu state to screen readers
- `aria-controls`: Links button to menu element
- `aria-label`: Clear button label ("Open/Close navigation menu")
- Focus management: Returns focus to button when closing with Escape
- Semantic HTML: Uses `<button>`, `<nav>` elements

### 🎨 Styling
```typescript
const menuStyles = "..."; // Base menu styles
const openMenuStyles = "visible translate-y-0 opacity-100"; // Visible state
const closedMenuStyles = "invisible pointer-events-none -translate-y-2 opacity-0"; // Hidden state
```

**States:**
- **Mobile Closed**: Invisible, can't interact, shifted up slightly
- **Mobile Open**: Visible, can interact, normal position
- **Desktop**: Always visible, static position, inline layout

---

## Event Handling Details

### Click Outside
```typescript
function hideMenuIfOutside(target: EventTarget | null) {
    return (
        target instanceof Node &&
        !buttonRef.current?.contains(target) &&
        !navRef.current?.contains(target)
    );
}
```
Checks if click occurred outside both button and menu.

### Keyboard: Escape Key
```typescript
if (event.key === "Escape") {
    setIsOpen(false);
    buttonRef.current?.focus(); // Return focus to button
}
```

### Focus Events
```typescript
function hideMenuOnFocusIn(event: FocusEvent) {
    if (hideMenuIfOutside(event.target)) setIsOpen(false);
}
```
Closes menu when focus moves outside.

### Scroll Detection
```typescript
window.addEventListener("scroll", hideMenuOnScroll, { passive: true });
```
Closes menu on scroll (passive listener for performance).

### Breakpoint Detection
```typescript
const desktop = window.matchMedia("(min-width: 64rem)");
function handleBreakpointChange(event: MediaQueryListEvent) {
    if (event.matches) setIsOpen(false); // Close on desktop breakpoint
}
```

---

## Responsive Behavior

### Tailwind Classes Used

| Class | Purpose |
|-------|---------|
| `lg:hidden` | Hide hamburger button on desktop |
| `lg:visible` | Show menu on desktop |
| `lg:static` | Position: static on desktop (not absolute) |
| `lg:flex` | Display as flex on desktop |
| `flex-col lg:flex-row` | Stack vertically mobile, horizontally desktop |

### Breakpoint
- **Mobile**: < 64rem (1024px)
- **Desktop**: ≥ 64rem (1024px)

---

## Component Structure

```
MobileMenu
├── Button (hamburger icon)
│   ├── Three animated lines
│   │   ├── Top line: rotates 45° when open
│   │   ├── Middle line: fades out when open
│   │   └── Bottom line: rotates -45° when open
│   └── Only visible on mobile (lg:hidden)
│
└── Nav (dropdown menu)
    ├── Positioned absolutely on mobile
    ├── Positioned static on desktop
    ├── Slides down/up with animation
    ├── Click handler for link closure
    └── Wraps provided children
```

---

## Props

```typescript
interface MobileMenuProps {
    children: ReactNode; // Navigation content to display
}
```

The component accepts any React children, which are rendered inside the menu.

---

## Styling the Menu Contents

The MobileMenu itself only provides the container and button. Style the menu contents in NavLinks:

```typescript
<MobileMenu>
    <ul className="flex flex-col gap-1"> {/* Mobile: flex-col */}
        {/* Links here */}
    </ul>
</MobileMenu>
```

Add `lg:flex-row` to switch to horizontal on desktop:

```typescript
<ul className="flex flex-col gap-1 lg:flex-row">
```

---

## Color Variables Used

From your CSS variables:
- `--border`: Menu border color
- `--surface`: Menu background
- `--foreground`: Text color
- `--action`: Hover background
- `--accent`: Focus outline color

---

## Performance Notes

✅ Uses `{ passive: true }` on scroll listener  
✅ Event listeners cleaned up when menu closes  
✅ No performance impact on desktop (scroll listener not added)  
✅ Efficient `hideMenuIfOutside` function  
✅ Only one state variable (`isOpen`)  

---

## Common Customizations

### Change Menu Position
In `MobileMenu.tsx`, modify `menuStyles`:
```typescript
const menuStyles = "absolute top-[calc(100%-0.25rem)] right-5 ..."; // Change 'right-5' or 'top-[...]'
```

### Change Animation Speed
```typescript
const menuStyles = "... transition-[opacity,translate,visibility] duration-300 ..."; // Change 'duration-300'
```

### Change Hamburger Icon Style
Replace the three `<span>` elements in the button with your own icon design.

### Change Menu Width
```typescript
const menuStyles = "... w-[min(18rem,calc(100%-2.5rem))] ..."; // Change '18rem'
```

### Add menu blur or shadow
```typescript
const menuStyles = "... backdrop-blur-sm shadow-2xl shadow-black/30 ...";
```

---

## Testing

To test the MobileMenu:

1. **Mobile View** (DevTools mobile emulation)
   - Click hamburger button → menu opens
   - Click link → menu closes
   - Click outside → menu closes
   - Press Escape → menu closes
   - Scroll → menu closes

2. **Keyboard Navigation**
   - Tab through links
   - Escape from menu → focus returns to button
   - Press Enter/Space on button → menu toggles

3. **Responsive**
   - Resize window from mobile to desktop
   - Menu should close at 64rem breakpoint
   - Hamburger button should hide at 64rem

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses MediaQueryList API (supported in all modern browsers)
- Event listeners are standard DOM API
- CSS animations are standard Tailwind

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Menu doesn't close on click outside | Check if button/nav refs are properly assigned |
| Menu doesn't appear on mobile | Verify `lg:hidden` class on button, styles applied correctly |
| Animations jerky | Check if `motion-reduce:transition-none` respects user preferences |
| Focus not returning | Verify `buttonRef.current?.focus()` is called in Escape handler |
| Menu doesn't close on breakpoint | Check MediaQueryList listener is added correctly |

---

## Files Related to MobileMenu

- **`src/components/layout/MobileMenu.tsx`** - Component implementation
- **`src/components/layout/NavLinks.tsx`** - Uses MobileMenu
- **`src/components/layout/Header.tsx`** - Contains NavLinks

---

**See also:** `REFACTORING_COMPLETE.md` for full implementation details

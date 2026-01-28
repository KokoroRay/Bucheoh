# 📚 BLOG COMPONENT - DOCUMENTATION

## ✅ FEATURES IMPLEMENTED

### 1. **Horizontal Scroll Layout** 📜
- ✅ Tất cả blog cards nằm trên **1 hàng ngang**
- ✅ Scroll mượt mà (smooth scroll)
- ✅ Hidden scrollbar (Firefox, Chrome, Safari, Edge)
- ✅ Touch-friendly trên mobile

### 2. **Click-to-Center** 🎯
- ✅ Click vào bất kỳ card nào
- ✅ **Auto-scroll về chính giữa** viewport
- ✅ Sử dụng `scrollIntoView({ inline: 'center' })`
- ✅ Smooth behavior

### 3. **Elevate Effect** ⬆️
**Active card (được chọn):**
- ✅ **Scale 1.05** (phóng to 5%)
- ✅ **Opacity 1** (rõ nét)
- ✅ **Shadow đậm** + pink border
- ✅ **Z-index 10** (nổi lên)

**Inactive cards:**
- ✅ **Opacity 0.6** (mờ đi)
- ✅ **Scale 1** (kích thước normal)
- ✅ **Shadow nhẹ**

### 4. **State Management** 🔧
```tsx
// useState để lưu active index
const [activeIndex, setActiveIndex] = useState<number>(0);

// useRef để quản lý scroll
const scrollContainerRef = useRef<HTMLDivElement>(null);
const blogRefs = useRef<(HTMLDivElement | null)[]>([]);
```

### 5. **Navigation Dots** 🔘
- ✅ Dots indicator dưới blog
- ✅ Click dot để jump đến blog
- ✅ Active dot expand (width: 30px)
- ✅ Smooth transitions

---

## 🔧 TECHNICAL IMPLEMENTATION

### **Component Structure:**
```tsx
BlogSection
  └── scrollContainer (horizontal scroll)
      └── blogGrid (flex row)
          └── blogCard × 6
              ├── Image/Placeholder
              └── Content
                  ├── Date
                  ├── Title
                  ├── Excerpt
                  └── "Đọc thêm" button
  └── dotsContainer
      └── dot × 6
```

### **State Management:**
```tsx
const [activeIndex, setActiveIndex] = useState<number>(0);
```
- Lưu index của blog đang active
- Default: 0 (blog đầu tiên)

### **Refs Management:**
```tsx
const scrollContainerRef = useRef<HTMLDivElement>(null);
const blogRefs = useRef<(HTMLDivElement | null)[]>([]);
```
- `scrollContainerRef`: Container cho scrolling
- `blogRefs`: Array of refs cho từng blog card

### **Click Handler:**
```tsx
const handleBlogClick = (index: number) => {
  // 1. Update active index
  setActiveIndex(index);

  // 2. Scroll to center
  const blogElement = blogRefs.current[index];
  if (blogElement) {
    blogElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center', // ← KEY: Scroll vào chính giữa!
    });
  }
};
```

### **Ref Assignment:**
```tsx
ref={(el) => { blogRefs.current[index] = el; }}
```
- Callback ref để lưu element vào array
- TypeScript-safe (void return)

---

## 🎨 STYLING DETAILS

### **Active State CSS:**
```css
.blogCard.active {
  transform: scale(1.05);    /* Phóng to 5% */
  opacity: 1;                /* Full opacity */
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.2),
    0 0 0 3px var(--color-primary);  /* Pink border */
  z-index: 10;               /* Nổi lên */
}
```

### **Inactive State CSS:**
```css
.blogCard {
  opacity: 0.6;              /* Mờ đi */
  transform: scale(1);       /* Normal size */
  box-shadow: var(--shadow-md);
}
```

### **Scroll Container:**
```css
.scrollContainer {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;     /* Hide scrollbar */
}

.scrollContainer::-webkit-scrollbar {
  display: none;             /* Chrome/Safari */
}
```

### **Horizontal Layout:**
```css
.blogGrid {
  display: flex;             /* Horizontal layout */
  gap: var(--spacing-lg);    /* 2rem gap */
  width: max-content;        /* Extend beyond viewport */
}
```

---

## 📊 BLOG CARD STRUCTURE

### **Content:**
```tsx
<div className="blogCard">
  {/* Image or placeholder */}
  <div className="blogPlaceholder">Blog {id}</div>
  
  {/* Content */}
  <div className="blogContent">
    <div className="blogMeta">
      <span className="blogDate">15/01/2026</span>
    </div>
    <h3 className="blogTitle">Lợi ích của phân bón sinh học</h3>
    <p className="blogExcerpt">Khám phá những ưu điểm vượt trội...</p>
    <button className="readMore">Đọc thêm →</button>
  </div>
</div>
```

### **Data Interface:**
```tsx
interface BlogPost {
  id: number;
  imageSrc?: string;
  title: string;
  excerpt?: string;
  date?: string;
}
```

---

## 🎯 USER INTERACTION FLOW

### **Scenario 1: Click on blog card**
```
User clicks card → handleBlogClick fired
                 ↓
setActiveIndex(index) → Re-render with new active state
                      ↓
scrollIntoView({inline: 'center'}) → Smooth scroll to center
                                   ↓
Card scales up + opacity 1 + shadow dark
Inactive cards become opacity 0.6
```

### **Scenario 2: Click on dot**
```
User clicks dot → handleBlogClick(index)
               ↓
Same flow as scenario 1
```

### **Scenario 3: Scroll manually**
```
User scrolls container → No state change
Cards remain at current active state
(Can add scroll listener to auto-update activeIndex)
```

---

## 💡 ADVANCED FEATURES

### **Auto-update active on scroll:**
```tsx
useEffect(() => {
  const handleScroll = () => {
    // Find center card
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const centerX = container.scrollLeft + container.offsetWidth / 2;
    
    // Find which card is at center
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    blogRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - centerX);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    setActiveIndex(closestIndex);
  };
  
  const container = scrollContainerRef.current;
  container?.addEventListener('scroll', handleScroll);
  return () => container?.removeEventListener('scroll', handleScroll);
}, []);
```

### **Keyboard navigation:**
```tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
      handleBlogClick(activeIndex - 1);
    }
    if (e.key === 'ArrowRight' && activeIndex < blogPosts.length - 1) {
      handleBlogClick(activeIndex + 1);
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [activeIndex]);
```

---

## 📱 RESPONSIVE BEHAVIOR

| Screen Size | Card Width | Gap | Layout |
|-------------|------------|-----|--------|
| Desktop     | 380px      | 2rem| Horizontal |
| Tablet      | 340px      | 2rem| Horizontal |
| Mobile      | 300px      | 1.5rem| Horizontal |
| Small       | 280px      | 1.5rem| Horizontal |

**All sizes:** Maintain horizontal scroll

---

## ✅ CHECKLIST

Implementation complete:
- [x] Horizontal scroll layout
- [x] Click-to-center (scrollIntoView)
- [x] Active state scale(1.05)
- [x] Inactive opacity 0.6
- [x] Shadow đậm cho active
- [x] useState activeIndex
- [x] useRef scroll management
- [x] Navigation dots
- [x] Smooth scrolling
- [x] Hidden scrollbar
- [x] Responsive design
- [x] TypeScript type-safe
- [x] Clean, maintainable code

---

## 🎉 RESULT

**Blog component với:**
- ✨ Horizontal scrollable layout
- ✨ Click-to-center smooth scroll
- ✨ Premium elevate effect
- ✨ Active/inactive states
- ✨ Navigation dots
- ✨ Clean code structure
- ✨ Production-ready

**Demo:** http://localhost:5173/#blog

**Test:**
1. Click vào bất kỳ blog card nào
2. Xem card tự động scroll về center
3. Card active phóng to + rõ nét
4. Cards khác mờ đi
5. Click dots để jump
6. Scroll manually với mouse/touch

---

**Perfect horizontal blog carousel! 📚✨**

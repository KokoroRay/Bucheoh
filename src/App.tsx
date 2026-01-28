import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts';
import { Hero, AboutSection, ProductGallery, BlogSection, LoadingSpinner, NotFound } from './components';
import { useState, useEffect } from 'react';

// Import images from assets
import logoImage from './assets/logos/fpt-logo.png';
import heroImage from './assets/images/hero/hero-image.png';
import aboutImage1 from './assets/images/about/about-1.png';
import aboutImage2 from './assets/images/about/about-2.png';

// Homepage Component
const HomePage = () => (
  <>
    <Hero imageSrc={heroImage} />
    <AboutSection leftImageSrc={aboutImage1} bottomImageSrc={aboutImage2} />
    <ProductGallery />
    <BlogSection />
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds demo loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner 
        overlay={true} 
        size="large" 
        text="Đang tải BUCHAOH..." 
      />
    );
  }

  return (
    <Router>
      <MainLayout logoSrc={logoImage}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Bucheoh" element={<HomePage />} />
          <Route path="/about" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Về BUCHAOH</h1><p>Coming soon...</p></div>} />
          <Route path="/products" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Sản phẩm BUCHAOH</h1><p>Coming soon...</p></div>} />
          <Route path="/contact" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Liên hệ</h1><p>Coming soon...</p></div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

import { MainLayout } from './layouts';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductGallery } from './components/ProductGallery';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

// Import images from assets
import logoImage from './assets/logos/fpt-logo.png';
import heroImage from './assets/images/hero/hero-image.png';
import aboutImage1 from './assets/images/about/about-1.png';
import aboutImage2 from './assets/images/about/about-2.png';

function App() {
  return (
    <MainLayout logoSrc={logoImage}>
      <Hero imageSrc={heroImage} />
      <AboutSection leftImageSrc={aboutImage1} bottomImageSrc={aboutImage2} />
      <ProductGallery />
      <BlogSection />
      <Footer />
    </MainLayout>
  );
}

export default App;

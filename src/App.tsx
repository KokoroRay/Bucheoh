import { MainLayout } from './layouts';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductGallery } from './components/ProductGallery';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

// Import images
import logoImage from '../Logo_Trường_Đại_học_FPT.svg 1.png';
// Sử dụng images từ folder Desktop
import image1 from './pages/Desktop/image-1.png';
import image2 from './pages/Desktop/image-2.png';
import image3 from './pages/Desktop/image-3.png';

function App() {
  return (
    <MainLayout logoSrc={logoImage}>
      <Hero imageSrc={image1} />
      <AboutSection leftImageSrc={image2} bottomImageSrc={image3} />
      <ProductGallery />
      <BlogSection />
      <Footer />
    </MainLayout>
  );
}

export default App;

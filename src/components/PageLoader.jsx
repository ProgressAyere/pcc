import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animationFile from '../assets/animations/your-animation-transparent.lottie';

const PageLoader = () => {
  return (
    <div style={{
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',      // ← vertical center
  justifyContent: 'center',  // ← horizontal center
  zIndex: 9999,
}}>
  <div style={{
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }}>
    <DotLottieReact
      src={animationFile}
      autoplay
      style={{
        width: 400,
        height: 400,
        flexShrink: 0,
      }}
    />
  </div>
</div>
  );
};

export default PageLoader;
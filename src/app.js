import './styles.css';
import './services/boomio';

// Vite HMR - Force full page reload for widget changes
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

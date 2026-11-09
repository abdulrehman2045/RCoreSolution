import logo from '../assets/logo.jpg';

export default function Loader({ show }) {
  return (
    <div className={`loader ${show ? 'on' : ''}`} role="status" aria-live="polite" aria-hidden={!show}>
      <img src={logo} alt="RCore Solutions" width="200" height="200" />
      <div className="loader-bar"><i /></div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__social">
          <a href="#" className="social-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394a.799.799 0 0 1-.57.23l.213-3.05 5.56-5.02c.24-.213-.054-.333-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.656-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
          </a>
          <a href="#" className="social-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,44H40A12,12,0,0,0,28,56V200a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44Zm-40.86,134.17c-7.16,6.31-15.93,10.59-25.41,12.76a91.75,91.75,0,0,1-10.73,2.59,76.81,76.81,0,0,1-24.89.17,82.24,82.24,0,0,1-25.71-9.3,4,4,0,0,1,3.5-7.14,72.58,72.58,0,0,0,22.7,8.38,68.84,68.84,0,0,0,22.41-.16,85.76,85.76,0,0,0,21.07-7.18c6.8-3.27,12.88-7.71,17.66-12.79a4,4,0,0,1,5.62-.39,4,4,0,0,1,.4,5.66ZM88,140a12,12,0,1,1,12,12A12,12,0,0,1,88,140Zm80,0a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z" />
            </svg>
          </a>
          <a href="#" className="social-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
            </svg>
          </a>
        </div>
        <p className="footer__copyright">
          ©2025 Wine not. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import { ErrorMessageProps } from './ErrorMessage.types';
import './ErrorMessage.styles.scss';

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <div className="ErrorMessage">
      <svg
        className="ErrorMessage_icon"
        height="48"
        width="48"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <circle cx="16" cy="16" id="BG" r="16" />
          <path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" />
        </g>
      </svg>
      <span className="ErrorMessage_text">{text}</span>
    </div>
  );
}

export default ErrorMessage;

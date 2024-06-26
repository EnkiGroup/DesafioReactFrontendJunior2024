import { ToastContainer, ButtonContainer, MessageContainer } from "./styled";

type ToasProps = {
  toastMessage?: string;
  toastButtons?: JSX.Element[];
  icon?: JSX.Element;
};
const Toast = ({ toastMessage, toastButtons, icon }: ToasProps) => {
  return (
    <ToastContainer>
      {icon && icon}
      <ButtonContainer>
        {toastMessage && <p>{toastMessage}</p>}
        <MessageContainer>
          {Array.isArray(toastButtons) && toastButtons?.map((item) => item)}
        </MessageContainer>
      </ButtonContainer>
    </ToastContainer>
  );
};

export default Toast;

import { ToastContainer, ButtonContainer } from "./styled";

type ToasProps = {
  toastMessage?: string;
  toastButtons: JSX.Element[];
};
const Toast = ({ toastMessage, toastButtons }: ToasProps) => {
  return (
    <ToastContainer>
      {toastMessage && <p>{toastMessage}</p>}
      <ButtonContainer>
        {toastButtons?.map((item) => item)}
      </ButtonContainer>
    </ToastContainer>
  );
};

export default Toast;

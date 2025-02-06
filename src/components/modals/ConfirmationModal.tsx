import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";

interface IConfirmationModalProps {
  onConfirm: () => void;
}

export const ConfirmationModal = ({ onConfirm }: IConfirmationModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className=" hover:bg-red-300 bg-red-400 text-white ">
          Удалить
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" fixed inset-0 backdrop-blur-[3px] bg-black/20" />
        <Dialog.Content className="fixed top-[40%] left-[50%]  -translate-[50%] rounded-2xl p-4 w-full max-w-[700px] bg-gray-200">
          <Dialog.Title className="text-2xl text-center mb-10">
            Удаление !
          </Dialog.Title>
          <Dialog.Description className="text-xl text-left mb-5">
            Уверны что хотите удалить семинар?
          </Dialog.Description>
          <div className="flex justify-between mt-5">
            <Button
              onClick={onConfirm}
              className="hover:bg-green-500 hover:text-white ">
              подтвердить
            </Button>
            <Dialog.Close asChild>
              <Button
                className="hover:bg-red-500 hover:text-white "
                aria-label="Close">
                закрыть
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inical é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdit } =
    useDashboard();

  const {
    handleSubmit: hookFormsubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdit?.color,
      name: accountBeingEdit?.name,
      type: accountBeingEdit?.type,
      initialBalance: accountBeingEdit?.initialBalance,
    },
  });

  function closeAndResetNewAccountModal() {
    closeEditAccountModal();
  }

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountService.update
  );

  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation(bankAccountService.remove);

  const handleSubmit = hookFormsubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdit!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta atualizada com sucesso!");
      closeAndResetNewAccountModal();
    } catch {
      toast.error("Erro ao salvar as alterações!");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdit!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("Conta deletada com sucesso!");
      closeAndResetNewAccountModal();
    } catch {
      toast.error("Erro ao deletar a conta!");
    }
  }

  return {
    isEditAccountModalOpen,
    closeAndResetNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  };
}

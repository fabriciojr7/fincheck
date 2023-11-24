import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inical é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController(){
  const {
    isNewAccountModalOpen,
    closeNewAccountModal
  } = useDashboard()

  const {
    handleSubmit: hookFormsubmit,
    register,
    formState: {errors},
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  function closeAndResetNewAccountModal(){
    closeNewAccountModal()
    reset()
  }

  const queryClient = useQueryClient()
  const {isLoading, mutateAsync} = useMutation(bankAccountService.create)

  const handleSubmit = hookFormsubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance)
      })

      queryClient.invalidateQueries({queryKey: ['bankAccounts']})
      toast.success('Conta cadastrada com sucesso!')
      closeAndResetNewAccountModal()
    } catch  {
      toast.error('Erro ao cadastrar a conta!')
    }
  })

  return {
    isNewAccountModalOpen,
    closeAndResetNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  }
}

import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { ColorsDropdownInput } from "../../../../../components/ColorsDropdownInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal(){
  const {
    isNewAccountModalOpen,
    closeAndResetNewAccountModal,
    handleSubmit,
    errors,
    control,
    register,
    isLoading
  } = useNewAccountModalController()

  return (
    <Modal title="Nova Conta" open={isNewAccountModalOpen} onClose={closeAndResetNewAccountModal}>


      <form onSubmit={handleSubmit}>
          <div className="">
            <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo inicial</span>

            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
              <Controller
                control={control}
                name="initialBalance"
                defaultValue="0"
                render={({field: {onChange, value}}) => (
                  <InputCurrency
                    error={errors.initialBalance?.message}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-10 mb-6 flex flex-col gap-4">
            <Input
              placeholder="Nome da Conta"
              error={errors.name?.message}
              {...register('name')}
            />

            <Controller
              control={control}
              name="type"
              defaultValue="CHECKING"
              render={({field: {onChange, value}}) => (
                <Select
                  placeholder="Tipo"
                  onChange={onChange}
                  value={value}
                  options={[
                    {
                      value: 'CHECKING',
                      label: 'Conta Corrente'
                    },
                    {
                      value: 'INVESTMENT',
                      label: 'Investimentos'
                    },
                    {
                      value: 'CASH',
                      label: 'Dinheiro Físico'
                    }
                  ]}
                  error={errors.type?.message}
                />
              )}
            />

              <Controller
                control={control}
                name="color"
                defaultValue=""
                render={({field: {onChange, value}}) => (
                  <ColorsDropdownInput
                    onChange={onChange}
                    value={value}
                    error={errors.color?.message}
                  />
                )}
              />
          </div>

          <Button className="w-full" isLoading={isLoading}>
            Criar
          </Button>
      </form>
    </Modal>
  )
}

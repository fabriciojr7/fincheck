import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropDownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useDashboard } from "../DashboardContext/useDashboard";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function Fab(){
  const {openNewAccountModal, openNewTransactionModal} = useDashboard()

  return (
    <div className="fixed right-4 bottom-4 z-50">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button
              className="w-12 h-12 bg-teal-900 rounded-full text-white flex items-center justify-center"
            >
              <PlusIcon className="w-6 h-6"/>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="m-4">
            <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal("EXPENSE")}>
              <CategoryIcon type="expense"/>
              Nova Despesa
            </DropdownMenu.Item>

            <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal("INCOME")}>
              <CategoryIcon type="income"/>
              Nova Receita
            </DropdownMenu.Item>

            <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
              <BankAccountIcon/>
              Nova Conta
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
  )
}

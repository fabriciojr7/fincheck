import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue{
  areValuesVisible: boolean
  toggleValuesVisiblity(): void
  isNewAccountModalOpen: boolean
  openNewAccountModal(): void
  closeNewAccountModal(): void
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void
  closeNewTransactionModal(): void,
  isEditAccountModalOpen: boolean
  accountBeingEdit: BankAccount | null,
  openEditAccountModal(bankAccount: BankAccount): void,
  closeEditAccountModal(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboarProvider({children}: {children: React.ReactNode}){
  const [areValuesVisible, setAreValuesVisible] = useState(true)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [accountBeingEdit, setAccountBeingEdit] = useState<BankAccount | null>(null)
  const toggleValuesVisiblity = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdit(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdit(null)
    setIsEditAccountModalOpen(false)
  }, [])

  return(
    <DashboardContext.Provider value={{
      areValuesVisible,
      toggleValuesVisiblity,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
      isNewTransactionModalOpen,
      newTransactionType,
      openNewTransactionModal,
      closeNewTransactionModal,
      isEditAccountModalOpen,
      accountBeingEdit,
      openEditAccountModal,
      closeEditAccountModal

    }}>
      {children}
    </DashboardContext.Provider>
  )
}

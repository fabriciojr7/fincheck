import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import { DashboarProvider, DashboardContext } from "./components/DashboardContext";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions";
import { EditAccountModal } from "./components/modals/EditAccountModal";
import { NewAccountModal } from "./components/modals/NewAccountModal";
import { NewTransactionModal } from "./components/modals/NewTransactionModal";

export function Dashboard(){


  return(
    <DashboarProvider>
      <DashboardContext.Consumer>
        {({accountBeingEdit}) => (
          <div className="flex flex-col w-full h-full p-4 md:px-8 md:pb-8 md:pt-6 gap-4">
            <header className="h-12 flex items-center justify-between">
              <Logo className="h-6 text-teal-900"/>
              <UserMenu/>
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts/>
              </div>
              <div className="w-full md:w-1/2">
                <Transactions/>
              </div>
            </main>

            <Fab/>

            <NewAccountModal/>
            <NewTransactionModal/>
            {accountBeingEdit && <EditAccountModal/>}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboarProvider>
  )
}

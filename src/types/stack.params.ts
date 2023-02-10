import { Orcamento } from "../models/from-api/orcamento.model"

export type StackParams = {
    SignIn: undefined
    SignUp: undefined
    PasswordRecovery: undefined
    Home: undefined
    Discount: {
        _budget: string,
        _branch: string,
        _discountValue?: number
    }
    DiscountConfirmation: {
        _budget: string,
        _branch: string,
        _budgetObject: Orcamento,
        _discountValue: number
    }
}
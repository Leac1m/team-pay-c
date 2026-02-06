export type DropUpVariant = 'handle' | 'back-arrow' | 'plain'; // ← added 'plain' for swap confirmation
export type DropUpDynamicValue = { currency: string, deposit:number, fromUser : string} // ← added 'plain' for swap confirmation
export  type DropUpContentType =
    | 'add-money'
    | 'send-money'
    | 'loading-send-money'
    | 'bank-transfer'
    | 'bank-transfer-success'
    | 'phone-card-illustration'
    | 'select-currency'
    | 'enter-amount'
    | 'confirm-pin'
    | 'swap-confirmation'
    | 'enter-amount-airdrop'
    | 'enter-amount-card'
    | null;

export interface dropUpInterface   {
    openDropUp:(
        DropUpContentType: DropUpContentType,
        variant: DropUpVariant,
        dynamicValue?: DropUpDynamicValue,
        next? :() => void
    ) => void
}

export type  openDropUpType = (type: DropUpContentType, variant?: DropUpVariant, dynamicValue?: DropUpDynamicValue, next?: () => void) => void

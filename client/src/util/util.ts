export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export const currencyFormat = (amount: number) => {
    return `$${amount.toFixed(2)}`
}
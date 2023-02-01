namespace NumberUtil {
    export function commaFormat(n: number): string {
        const [i, j, unaryMinus, intn, decimal] = tostring(n).find("([-]?)(%d+)([.]?%d*)");
        const int = (<string>intn).reverse().gsub("(%d%d%d)", "%1,")[0];
        return unaryMinus + int.reverse().gsub("^,", "")[0] + decimal
    }
}

export = NumberUtil

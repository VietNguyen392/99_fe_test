
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Added this property
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const blockchainPriority: { [key: string]: number } = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
    };

    const getPriority = (blockchain: string): number => {
        return blockchainPriority[blockchain] ?? -99;
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
            .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances, prices]);

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.amount.toFixed()}
            />
        );
    });

    return <div {...rest}>{rows}</div>;
};

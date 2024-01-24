"use client"
import { getFirstTxBlockNumber, getCurrentBlock } from "@/lib/parseRecentTx";
import AdvanceStepButton from "../../components/ui/AdvanceStepButton"
import LoadingAnimation from "../../components/ui/LoadingAnimation";
import { Constants } from "@/shared/constants";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default async function CheckAge() {
    const [firstTransaction, setFirstTransaction] = useState<any | undefined | null>(null); // [blockNumber, txIdx]
    const [currentBlock, setCurrentBlock] = useState<any | undefined | null>(null); //  
    const { address, isConnected } = useAccount();

    // const firstTransaction = await getFirstTxBlockNumber(props.address);
    useEffect(() => {
        const getCurrentBlockWrapper = async () => {
            const currentBlock = await getCurrentBlock();
            console.log("currentBlock updated to:", currentBlock);
            setCurrentBlock(currentBlock);
        }
        getCurrentBlockWrapper();
    }, []);

    useEffect(() => {
        const findTx = async () => {
            if (!address || !isConnected || firstTransaction) {
                return;
            }
            const firstTransaction2 = await getFirstTxBlockNumber(address);
            if (firstTransaction2) {
                setFirstTransaction(firstTransaction2);
                console.log("firstTransaction updated to:", firstTransaction2);
                console.log("address is ", address);
            }

        }
        findTx();
    }, [address, isConnected, firstTransaction]);

    if (firstTransaction === undefined || currentBlock === undefined) {
        return (
            <div className="flex flex-row items-center font-mono gap-2">
                {"Finding account age"} <LoadingAnimation />
            </div>
        );
    } else if (firstTransaction === null || currentBlock === null) {
        return (
            <>
                <div className="text-center">
                    {"Sorry, we couldn't figure out when this account was created in Sepolia."}
                </div>
                <AdvanceStepButton
                    label="Go back"
                    href="/"
                />
            </>
        );
    } else {
        return (
            <div className="flex flex-col items-center font-mono gap-2">
                <div>
                    Data found
                </div>
                <div className="pb-2">
                    {JSON.stringify(currentBlock, null, 2)}
                </div>
                <div className="pb-2">
                    {JSON.stringify(firstTransaction, null, 2)}
                </div>
                {currentBlock - Constants.AGE_THRESHOLD > firstTransaction.blockNumber ? (<AdvanceStepButton
                    label="Build Axiom proof params"
                    href={"/prove?" + new URLSearchParams({
                        blockNumber: firstTransaction.blockNumber.toString(),
                        txIdx: firstTransaction.txIdx.toString(),
                    })}
                />) : (<div>Unfortunately, your account is not old enough to receive the Airdrop</div>)}
            </div>
        )
    }
}
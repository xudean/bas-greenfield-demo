"use client";
import {encodeAddrToBucketName, useBAS} from "./usehooks/useBAS";
import {useEffect, useState} from "react";
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
import {bscTestnet} from "wagmi/chains";
import {useAccount, useConnect} from "wagmi";
import {GRPC_URL} from "@/app/app.env";


export default function Home() {
    const {
        getNewSignature,
        initClient,
        attestOffChainWithGreenFieldWithFixValue,
        createBASBuckect,
        createBASBuckectDefault,
        listBASBuckect
    } = useBAS();
    const {isConnected} = useAccount({
        onConnect: (data) => console.log("connected", data),
        onDisconnect: () => console.log("disconnected"),
    });
    const {connect} = useConnect();
    const [schemaUID, setSchemaUID] = useState<null | string>(null);
    const [attestationUID, setAttestationUID] = useState<null | string>(null);
    const [offchainAttestationUID, setOffchainAttestationUID] = useState<
        null | string
    >(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const {connector, address} = useAccount();


    useEffect(() => {
        if (!isConnected || isProcessing) {
            return;
        }
    }, [isConnected, isProcessing]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <button></button>
                <button
                    onClick={() => {
                        connect({
                            connector: new MetaMaskConnector({chains: [bscTestnet]}),
                        });
                    }}
                    color="primary"
                >
                    Connect
                </button>
            </div>
            {isProcessing && <div>Processing...</div>}
            {isConnected && !isProcessing && (
                <div className="flex justify-around w-[100%]">

                    <button
                        className="bg-[#FFA163] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            try {
                                let provider = await connector?.getProvider({chainId: 5600});
                                await initClient(address,"5600",GRPC_URL)
                                setIsProcessing(true);
                                const {eip712MessageRawDataWithSignature, schemaUid} = await getNewSignature()
                                debugger
                                const objectInfo = await attestOffChainWithGreenFieldWithFixValue(address,provider,eip712MessageRawDataWithSignature, schemaUid);
                                console.log(objectInfo);

                                setIsProcessing(false);
                                // @ts-ignore
                                if (objectInfo !== "notfound" && attestation.uid) {
                                    // @ts-ignore
                                    setOffchainAttestationUID(attestation.uid);
                                }
                            } catch (e) {
                                setIsProcessing(false);
                            }
                        }}
                    >
                        Make an Offline Attestation With Fix value
                    </button>

                    <button
                        className="bg-[#FFA163] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"

                        onClick={async () => {
                            let provider = await connector?.getProvider({chainId: 5600});
                            debugger
                            try {
                                await listBASBuckect(provider,address);
                                setIsProcessing(false);
                            } catch (e) {
                                console.log(e)
                                setIsProcessing(false);
                            }
                        }}
                    >
                        ListBuckets
                    </button>

                    <button
                        className="bg-[#FFA163] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"

                        onClick={async () => {
                            let provider = await connector?.getProvider({chainId: 5600});

                            try {
                                setIsProcessing(true);
                                debugger
                                const res = await createBASBuckectDefault(provider,address);
                                console.log(res);
                                setIsProcessing(false);
                            } catch (e) {
                                console.log(e)
                                setIsProcessing(false);
                            }
                        }}
                    >
                        Create Bucket
                    </button>


                    <button
                        className="bg-[#FFA163] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"

                        onClick={async () => {
                            const res = await getNewSignature()
                            console.log(JSON.stringify(res.data.result.eip712MessageRawDataWithSignature))
                            console.log(JSON.stringify(res.data.result.schemaStr))
                            localStorage.setItem("attestation", res.data.result)
                        }}
                    >
                        Get New Signature
                    </button>
                </div>
            )}
        </main>
    );
}

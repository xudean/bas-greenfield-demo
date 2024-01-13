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
                                await initClient(address,"0x620e84546d71A775A82491e1e527292e94a7165A","5600",GRPC_URL,"https://gnfd-testnet-sp1.bnbchain.org")
                                setIsProcessing(true);
                                const resp1 = await getNewSignature("{\"rawParam\":{\"requestid\":\"eda20d37-3adb-4932-95a2-a2205a907e9d\",\"version\":null,\"credVersion\":\"0.2.11\",\"source\":\"GOOGLE\",\"baseName\":null,\"holdingToken\":null,\"baseUrl\":null,\"padoUrl\":null,\"proxyUrl\":null,\"cipher\":null,\"getDataTime\":\"1704419840652\",\"exchange\":null,\"sigFormat\":\"EAS-Ethereum\",\"schemaType\":\"GOOGLE_ACCOUNT_OWNER\",\"schema\":null,\"user\":{\"userid\":\"1724627312097361920\",\"address\":\"0x024e45d7f868c41f3723b13fd7ae03aa5a181362\",\"token\":null},\"baseValue\":null,\"greaterThanBaseValue\":null,\"sourceUseridHash\":\"25deb5f92761aa19e8f8b872f11a9e08b6b8d9bf58aef0365a0ccde9bb92eab9\",\"ext\":null,\"issuer\":null,\"did\":null},\"greaterThanBaseValue\":true,\"signature\":\"0x422d31e0517c5de6e73710537f0834c0b1336e6e1868527624ade50675da7b912a1208e2a0cf57c49198aacd368286a781a768170ed4d82567bebf6ee9f55eac1b\",\"newSigFormat\":\"BAS-BSC-Testnet\",\"sourceUseridHash\":\"25deb5f92761aa19e8f8b872f11a9e08b6b8d9bf58aef0365a0ccde9bb92eab9\"}")
                                const resp2 = await getNewSignature("{\"rawParam\":{\"requestid\":\"1704351426159\",\"version\":\"1.1.0\",\"source\":\"tiktok\",\"address\":\"0x024e45d7f868c41f3723b13fd7ae03aa5a181362\",\"baseValue\":\"0\",\"balanceGreaterThanBaseValue\":\"true\",\"getDataTime\":\"1704351444973\",\"signature\":\"0x16d4ead8a3e5f455e24623bbb07ef805e533f406061d00712028e87d33afa74f352d4bfe335d621c9d797ed50170612d4560fcce5e481fe715dafa44d7068bfd1c\",\"encodedData\":\"0x00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c0b2e80791570aec0779f1ba8af0d6ce0901364dc50fdf732c646c0836620c130b00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000018cd3432fed8fc677e1cd95db805d6784c88c20ba812d254657777ee80828f49bf8670d15ae00000000000000000000000000000000000000000000000000000000000000084964656e74697479000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000674696b746f6b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000114163636f756e74204f776e65727368697000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000085665726966696564000000000000000000000000000000000000000000000000\",\"authUseridHash\":\"0x8fc677e1cd95db805d6784c88c20ba812d254657777ee80828f49bf8670d15ae\",\"sourceUseridHash\":\"b2e80791570aec0779f1ba8af0d6ce0901364dc50fdf732c646c0836620c130b\",\"extraData\":\"\",\"data\":\"\",\"type\":\"IDENTIFICATION_PROOF\",\"label\":null,\"exUserId\":null,\"padoUrl\":\"wss://api-dev.padolabs.org/algorithm\",\"proxyUrl\":\"wss://api-dev.padolabs.org/algoproxy\",\"cipher\":\"ECDHE-ECDSA-AES128-GCM-SHA256\",\"getdatatime\":\"1704351426159\",\"credVersion\":\"1.0.3\",\"sigFormat\":\"EAS-Ethereum\",\"schemaType\":\"TIKTOK_ACCOUNT_OWNER#1\",\"user\":{\"userid\":\"1724627312097361920\",\"address\":\"0x024e45d7f868c41f3723b13fd7ae03aa5a181362\",\"token\":\"eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJwYWRvbGFicy5vcmciLCJzdWIiOiIweGMxYTdGNmYzOTdkNUM3OTNhNzg2MTNDZjM2NGEwNjkxNDZkZDcxZjciLCJleHAiOjQ4NTM2MTgxNjcsInVzZXItaWQiOjE3MjQ2MjczMTIwOTczNjE5MjAsInNjb3BlIjoiYXV0aCJ9.MHRWNwh1v4PFrLrvkZrRJDmXdkVcIuKxf9Onu7UKLgHZcdSlWq6m8IV3Eq-wJjVwbBpv5zHh9jCh8uQG7GAFacVvwuUNAcquWS8xmK669ANQvSMerq6G0L2kv7iUWz6KEimq0M1btdphZuwIPDa3epHeTHRZJlDCo35gGRSV2qcoPgdoyidUKOMhSCdvPqs-df3r7Is32Xtrn3AvFPWAiQWwcW2rSnbv-5KCEMIGS7jcIXlwDIpm3-HfXsynwnbOfsLQ0WOExiXseObZHaAdTGu925Cv0c6L4TzXj9NmWPB201wgwg_KxqXFHcChCMBUbHW0ChN9xc1VqlkgfBjROg\"},\"setHostName\":\"true\",\"ext\":null,\"reqType\":\"web\",\"host\":\"www.tiktok.com\",\"requests\":[{\"name\":\"first\",\"url\":\"https://www.tiktok.com/cloudpush/app_notice_status/\"},{\"name\":\"uid-owner\",\"url\":\"https://www.tiktok.com/passport/web/account/info/?WebIdLastTime=1703473687&aid=1459&app_language=zh-Hans&app_name=tiktok_web&browser_language=zh-CN&browser_name=Mozilla&browser_online=true&browser_platform=MacIntel&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F120.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7316361722519586305&device_platform=web_pc&focus_state=true&from_page=fyp&history_len=1&is_fullscreen=false&is_page_visible=true&os=mac&priority_region=&referer=&region=US&screen_height=1117&screen_width=1728&tz_name=Asia%2FShanghai&verifyFp=verify_lqkc81bf_WqRDH56i_z1b9_4C34_8fSC_gWSpewSpyXde&webcast_language=zh-Hans\",\"method\":\"GET\",\"headers\":{\"User-Agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\"},\"cookies\":{\"sessionid\":\"370da61922bb71191e181853f135ab59\",\"tt-target-idc\":\"useast8\"}}],\"responses\":[{},{\"conditions\":{\"type\":\"CONDITION_EXPANSION\",\"op\":\"BOOLEAN_AND\",\"subconditions\":[{\"type\":\"FIELD_VALUE\",\"field\":\"$.data.user_id_str\",\"op\":\"SHA256\"},{\"type\":\"FIELD_RANGE\",\"field\":\"$.data.create_time\",\"op\":\">\",\"value\":\"978278400\"}]}}],\"uiTemplate\":{\"title\":\"Identity\",\"proofContent\":\"Account Ownership\",\"subProofContent\":\"\",\"condition\":\"Verified\"},\"templateId\":\"6\"},\"greaterThanBaseValue\":true,\"signature\":\"0x16d4ead8a3e5f455e24623bbb07ef805e533f406061d00712028e87d33afa74f352d4bfe335d621c9d797ed50170612d4560fcce5e481fe715dafa44d7068bfd1c\",\"newSigFormat\":\"BAS-BSC-Testnet\",\"sourceUseridHash\":\"b2e80791570aec0779f1ba8af0d6ce0901364dc50fdf732c646c0836620c130b\"}")
                                const allResp = [resp2,resp1]
                                const objectInfo = await attestOffChainWithGreenFieldWithFixValue(address,provider,allResp);
                                console.log(objectInfo);

                                setIsProcessing(false);
                                // @ts-ignore
                                if (objectInfo !== "notfound") {
                                    // @ts-ignore
                                    setOffchainAttestationUID(objectInfo);
                                }
                            } catch (e) {
                                console.log(e)
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

                </div>
            )}
        </main>
    );
}
